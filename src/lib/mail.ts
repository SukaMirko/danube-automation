import net from "node:net";
import tls from "node:tls";

type Mail = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

function encodeSubject(value: string) {
  if (/^[\x20-\x7e]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

async function sendWithResend(mail: Mail, key: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from: mail.from, to: [mail.to], subject: mail.subject, text: mail.text }),
  });
  if (!response.ok) throw new Error(`RESEND_${response.status}: ${await response.text()}`);
}

export async function sendLeadMail(mail: Mail) {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    await sendWithResend(mail, resendKey);
    return;
  }
  const user = process.env.MAIL_USER?.trim();
  const pass = process.env.MAIL_PASS?.trim();
  const host = process.env.MAIL_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT || 587);
  if (!user || !pass) throw new Error("NO_MAIL");

  const text = mail.text.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
  const data = [
    `From: ${mail.from}`,
    `To: ${mail.to}`,
    `Subject: ${encodeSubject(mail.subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text,
    "",
  ].join("\r\n");

  await speak(host, port, user, pass, mail.from, mail.to, data);
}

function speak(host: string, port: number, user: string, pass: string, from: string, to: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    let stream: net.Socket = net.connect(port, host);
    let buffer = "";
    let step = 0;
    const commands = [
      "EHLO danubeautomation.com",
      "STARTTLS",
      "EHLO danubeautomation.com",
      "AUTH LOGIN",
      Buffer.from(user).toString("base64"),
      Buffer.from(pass).toString("base64"),
      `MAIL FROM:<${from}>`,
      `RCPT TO:<${to}>`,
      "DATA",
      data + "\r\n.",
      "QUIT",
    ];

    const fail = (error: Error) => {
      stream.destroy();
      reject(error);
    };

    const writeNext = () => {
      const command = commands[step];
      step += 1;
      stream.write(command + "\r\n");
    };

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const parts = buffer.split(/\r?\n/);
      buffer = parts.pop() || "";
      const reply = [...parts].reverse().find((line) => /^\d{3}[ ].*/.test(line));
      if (!reply) return;
      const code = Number(reply.slice(0, 3));
      if (code >= 400) {
        fail(new Error(reply));
        return;
      }
      if (step === 2) {
        stream.removeListener("data", onData);
        const plain = stream;
        const secure = tls.connect({ socket: plain, servername: host });
        stream = secure;
        secure.on("error", (error) => fail(error));
        secure.on("timeout", () => fail(new Error("TIMEOUT")));
        secure.setTimeout(12000);
        buffer = "";
        secure.on("data", onData);
        secure.once("secureConnect", () => writeNext());
        return;
      }
      if (step >= commands.length) {
        stream.end();
        resolve();
        return;
      }
      writeNext();
    };

    stream.setTimeout(12000);
    stream.on("data", onData);
    stream.on("error", (error) => reject(error));
    stream.on("timeout", () => fail(new Error("TIMEOUT")));
  });
}
