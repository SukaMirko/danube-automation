export const site = {
  name: "Danube Automation",
  url: "https://danubeautomation.com",
  email: "mirko@danubeautomation.com",
  phone: "+381607452220",
  phoneDisplay: "+381 60 745 2220",
  whatsapp: "https://wa.me/381607452220",
  linkedin: "https://www.linkedin.com/in/sukamirko",
  person: "Mirko Šuka",
  legal: "ATAR Agtek d.o.o.",
  address: "Avrama Mrazovića 1, 21000 Novi Sad, Serbia",
  vat: "112262193",
  regNo: "21637742",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avrama Mrazovića 1",
    addressLocality: "Novi Sad",
    postalCode: "21000",
    addressCountry: "RS",
  },
  areaServed: ["Europe", "United States", "United Kingdom"],
  knowsAbout: ["Odoo", "Odoo Community", "ERP implementation", "Odoo module development", "AI agents", "System integration"],
  parentOrganization: { "@type": "Organization", name: site.legal },
  founder: { "@type": "Person", name: site.person, sameAs: site.linkedin },
};
