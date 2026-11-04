// Trajni zapis upita: jedan JSON red po upitu u UTF-8 fajlu na Railway Volume-u.
// Fajl nema javnu rutu za čitanje. Upis ide prvi, pa tek onda mejl.
import { appendFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export type LeadInput = {
  stranica: string;
  ime: string;
  firma: string;
  telefon: string;
  email: string;
  poruka: string;
  izvor: string;
};

const dir = () => process.env.LEADS_DIR?.trim() || "/data";
const file = () => join(dir(), "leads.jsonl");

async function writeLine(record: Record<string, unknown>) {
  await mkdir(dir(), { recursive: true });
  await appendFile(file(), JSON.stringify(record) + "\n", { encoding: "utf8", mode: 0o600 });
}

// Vraća id upita; ako upis padne, vraća saved: false (poziv tada nastavlja sa mejlom).
export async function saveLead(input: LeadInput) {
  const id = randomUUID();
  const record = { id, vreme: new Date().toISOString(), ...input, status_mejla: "cekanje", greska: "" };
  try {
    await writeLine(record);
    return { id, saved: true as const };
  } catch (error) {
    console.error("Upis upita nije uspeo:", error instanceof Error ? error.message : error);
    // Poslednja rezerva: ceo upit ide u log, da se ne izgubi.
    console.error("UPIT_REZERVA " + JSON.stringify(record));
    return { id, saved: false as const };
  }
}

// Dopisuje ishod slanja mejla uz isti id (fajl se samo dopunjuje, nikad ne prepisuje).
export async function markMail(id: string, ok: boolean, greska = "") {
  try {
    await writeLine({ id, azuriranje: true, vreme: new Date().toISOString(), status_mejla: ok ? "ok" : "greska", greska: greska.slice(0, 500) });
  } catch (error) {
    console.error("Upis ishoda mejla nije uspeo:", error instanceof Error ? error.message : error);
  }
}
