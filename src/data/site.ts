export const site = {
  name: "Danube Automation",
  url: "https://danubeautomation.com",
  email: "hello@danubeautomation.com",
  phone: "+381607452220",
  phoneDisplay: "+381 60 745 2220",
  whatsapp: "https://wa.me/381607452220",
  linkedin: "https://www.linkedin.com/in/sukamirko",
  person: "Mirko Šuka",
  city: "Novi Sad, Serbia",
};

export const nav = [
  { href: "/services/odoo-community-implementation", label: "Implementation" },
  { href: "/services/odoo-integrations", label: "Integrations" },
  { href: "/services/custom-odoo-modules", label: "Custom modules" },
  { href: "/services/ai-agents-for-odoo", label: "AI agents" },
  { href: "/for-odoo-partners", label: "For partners" },
];

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  image: `${site.url}/og.png`,
  email: site.email,
  telephone: site.phone,
  description:
    "Odoo Community implementation, integrations, custom module development and AI agents for small and mid-sized companies.",
  address: { "@type": "PostalAddress", addressLocality: "Novi Sad", addressCountry: "RS" },
  areaServed: ["Europe", "United States", "United Kingdom"],
  knowsAbout: ["Odoo", "Odoo Community", "ERP implementation", "Odoo module development", "AI agents", "System integration"],
};
