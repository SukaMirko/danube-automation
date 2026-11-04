export type Service = {
  slug: string;
  short: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  intro: string;
  card: string;
  includes: { title: string; text: string }[];
  examples: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "odoo-community-implementation",
    short: "Implementation",
    title: "Odoo Community implementation",
    metaTitle: "Odoo Community Implementation for Small and Mid-Sized Companies",
    metaDescription:
      "Odoo Community implementation in fixed-price phases: process mapping, configuration, data migration, training and support. No per-user license fees.",
    kicker: "Implementation",
    h1: "Odoo Community implementation, one phase at a time",
    intro:
      "We start with the process that costs you the most hours today, usually orders, stock or invoicing, and put it into Odoo first. Each phase has a written scope and a fixed price, and you test it on your own data before anyone goes live.",
    card: "Sales, inventory, purchasing, manufacturing and invoicing set up around your process, with your data migrated and your team trained.",
    includes: [
      { title: "Process mapping", text: "We follow one order from the first message to the paid invoice and write down every step, every spreadsheet and every person who touches it." },
      { title: "Configuration", text: "Products, price lists, warehouses, routes, bills of materials, taxes and user rights, set up in Odoo 19 Community." },
      { title: "Data migration", text: "Customers, products, open orders and stock levels imported from Excel, QuickBooks, an older Odoo or another ERP, with a check list you sign off." },
      { title: "Hosting", text: "Odoo installed on your own cloud server or on-premise, with daily backups and a staging copy for testing changes." },
      { title: "Training", text: "Short sessions per role, recorded, so a new warehouse worker can learn the same way next year." },
      { title: "Support plan", text: "After go-live: a ticket queue, agreed response times and a monthly block of hours. Optional." },
    ],
    examples: [
      "Moving a distributor from spreadsheets and email to Odoo Sales, Inventory and Invoicing",
      "Manufacturing with bills of materials, work orders and a tablet kiosk on the shop floor",
      "Taking over an existing Odoo installation that nobody maintains any more",
      "Upgrading from an older Odoo version to Odoo 19",
    ],
    faq: [
      { q: "Why Community and not Enterprise?", a: "Community has no per-user license fee, and its source code is yours to change. Some apps are Enterprise-only. We fill those gaps with modules from the Odoo Community Association or our own, and if Enterprise would cost you less overall, we say so before you sign anything." },
      { q: "How long does the first phase take?", a: "It depends on the scope we agree on. We keep phase one small on purpose, so you see a working result in weeks, not quarters." },
      { q: "Can you take over an Odoo system someone else built?", a: "Yes. We start with a paid audit: what is installed, what is customised, what breaks on upgrade. Then you decide what to keep." },
    ],
  },
  {
    slug: "odoo-integrations",
    short: "Integrations",
    title: "Odoo integrations",
    metaTitle: "Odoo Integration Services: Shopify, Banks, Couriers, Machines and APIs",
    metaDescription:
      "Connect Odoo Community to Shopify, couriers, banks, e-invoicing, label printers, scales and any REST API. Data entered once, everywhere it is needed.",
    kicker: "Integrations",
    h1: "Connect Odoo to everything that still needs retyping",
    intro:
      "If someone in your company copies numbers from one screen into another, that is an integration we can build. We connect Odoo to your webshop, couriers, bank, tax authority, printers and machines, and log every exchange so you can see what moved and when.",
    card: "Shopify, couriers, banks, e-invoicing, label printers and machines talking to Odoo, so data is entered once.",
    includes: [
      { title: "Webshops and marketplaces", text: "Orders, products, prices and stock synchronised between Odoo and Shopify. Other platforms through their APIs." },
      { title: "Couriers", text: "Shipping labels and tracking numbers created from the sales order. We have built carrier integrations from scratch and can do the same for yours." },
      { title: "Banks and payments", text: "Bank statement import and matching to invoices, QR codes for payment on invoices." },
      { title: "E-invoicing and fiscal devices", text: "We built e-invoicing and fiscal receipt connections for Serbia's national systems, so national e-invoicing networks in other countries are familiar ground." },
      { title: "Printers, scales and kiosks", text: "Labels printed where the box is packed, weights read from the scale, touch screens on the shop floor." },
      { title: "Any REST or SOAP API", text: "Your CRM, your supplier's portal, your BI tool. With retries, error logs and alerts when something fails." },
    ],
    examples: [
      "Shopify orders arriving in Odoo as sales orders with stock reserved",
      "Courier label printed in the warehouse with one tap on a touch screen",
      "Supplier invoices from the national e-invoicing system imported without manual entry",
      "Bank statements matched to open invoices every morning",
    ],
    faq: [
      { q: "Do you use middleware like Zapier or Make?", a: "When it is the cheaper and more maintainable option, yes. For anything that touches stock or money we usually write an Odoo module, so the logic lives next to the data and survives upgrades." },
      { q: "What happens when the other system is down?", a: "Messages wait in a queue and retry. Failures appear in Odoo as activities for a named person, so nothing disappears silently." },
      { q: "Can you integrate with a system that has no API?", a: "Often yes: file exports, email parsing, database views or, as a last resort, browser automation. We tell you how fragile each option is." },
    ],
  },
  {
    slug: "custom-odoo-modules",
    short: "Custom modules",
    title: "Custom Odoo module development",
    metaTitle: "Custom Odoo Module Development for Odoo Community",
    metaDescription:
      "Custom Odoo modules for Community: shop-floor kiosks, label printing, B2B portals, reports, dashboards and the features Enterprise-only apps would give you. You own the code.",
    kicker: "Custom modules",
    h1: "Custom Odoo modules, written for upgrades",
    intro:
      "When standard Odoo and the Community Association's modules don't cover your process, we write a module. It inherits from Odoo instead of overwriting it, has tests, lives in your Git repository, and comes with a note on what to check at the next upgrade.",
    card: "Modules for what Odoo doesn't do out of the box: kiosks, labels, portals, reports, dashboards. Your code, in your repo.",
    includes: [
      { title: "Shop-floor and warehouse screens", text: "Touch kiosks where workers log what they produced, clock in, or create a shipment with one tap." },
      { title: "Documents and labels", text: "Delivery slips, invoices and labels in any size, laid out the way your customers and carriers need them." },
      { title: "Portals", text: "A B2B portal where wholesale customers see their prices and place orders without calling." },
      { title: "Reports and dashboards", text: "Dashboards built from Odoo data, private for management or public for a screen in the hall." },
      { title: "Rules and automation", text: "Notes, checks and approvals that apply themselves: export clauses on invoices, credit limits, minimum margins." },
      { title: "Community gap modules", text: "Replacements for Enterprise-only features when an OCA module is missing or doesn't fit." },
    ],
    examples: [
      "Production kiosk: workers report finished quantities on a tablet",
      "Attendance kiosk with face recognition at the entrance",
      "Product catalogue that pages like a book, generated from Odoo products",
      "Route planner that schedules customer visits for field sales reps",
    ],
    faq: [
      { q: "Who owns the code?", a: "You do. Modules are delivered under LGPL-3 in your Git repository, with documentation. You can hire anyone to maintain them later." },
      { q: "Will the module survive an Odoo upgrade?", a: "We write modules that extend Odoo through its inheritance system and keep a test suite, which makes upgrades a planned piece of work instead of a rewrite. We quote upgrades in advance." },
      { q: "Can you publish a module on the Odoo Apps store?", a: "Yes, if it is general enough. Some of our own modules started as client work." },
    ],
  },
  {
    slug: "ai-agents-for-odoo",
    short: "AI agents",
    title: "AI agents for Odoo",
    metaTitle: "AI Agents for Odoo: Orders from WhatsApp, Email and Voice Notes",
    metaDescription:
      "AI agents that read WhatsApp messages, emails and voice notes, match them to your Odoo customers and products, and prepare draft orders for approval.",
    kicker: "AI agents",
    h1: "AI agents that prepare the work in Odoo and wait for your approval",
    intro:
      "Customers order by WhatsApp, email and voice notes. Someone in your office reads each message, finds the customer, looks up product codes and types an order. An agent can do the reading and the lookup, and leave a draft order in Odoo for a person to check and confirm.",
    card: "Agents that turn WhatsApp messages, emails and voice notes into draft orders in Odoo, waiting for a person to approve.",
    includes: [
      { title: "Orders from messages", text: "WhatsApp, Telegram, Viber or email: the agent reads the message, matches customer and products to your Odoo data and creates a draft sales order." },
      { title: "Voice notes", text: "A sales rep records an order in the car. It arrives in Odoo as text and as a draft order." },
      { title: "Documents in, data out", text: "Supplier invoices, delivery notes and price lists read from PDF or photo and turned into Odoo records for review." },
      { title: "Ask Odoo in plain language", text: "An agent connected through MCP answers questions such as which customers stopped ordering, with the access rights of the person asking." },
      { title: "Sales coaching", text: "Suggestions for reps based on a customer's order history: what they usually buy, what they stopped buying." },
      { title: "Your choice of model", text: "Anthropic Claude, Google Gemini or a model on your own hardware. Only the data a task needs leaves your server." },
    ],
    examples: [
      "WhatsApp order from a retailer becomes a draft sales order with the right product codes",
      "Purchase invoice photographed on a phone becomes a draft vendor bill",
      "Manager asks which products are below minimum stock and gets a list with links",
      "Rep's voice note after a visit becomes a CRM note and a follow-up activity",
    ],
    faq: [
      { q: "Will the agent confirm orders on its own?", a: "Not unless you decide it should. By default every order, bill or change waits as a draft for a person. You can loosen that per customer or per amount later." },
      { q: "What if it misreads a message?", a: "The draft shows the original message next to the order, and anything the agent wasn't sure about is highlighted. Corrections are logged so we can improve the matching." },
      { q: "Do we need Odoo already?", a: "The agent needs a system to write into. If you don't have Odoo yet, we set up the base first, usually just sales and inventory, and add the agent in the next phase." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
