import media from "./media.generated.json";

// Projects with `company` come from the resume. The rest are design work from the supplied
// Figma / portal / website material, described only by what their screens show.
export const filters = ["All", "Websites", "eCommerce", "Dashboards & SaaS", "Mobile app UI", "Wireframes"] as const;
export type Filter = (typeof filters)[number];

export type Project = {
  slug: keyof typeof media;
  title: string;
  category: string;
  filters: Exclude<Filter, "All">[];
  summary: string;
  company?: string;
  role?: string;
  stack: string[];
  features?: string[];
  contributions?: string[];
  metric?: { value: string; label: string };
  live?: string;
  featured?: boolean;
  /** Other parts of the same product (portal, app, website), each with its own case study. */
  companions?: (keyof typeof media)[];
};

export const projects: Project[] = [
  {
    slug: "khudii",
    title: "Khudii",
    category: "Donation platform for NGOs",
    filters: ["Websites", "Mobile app UI"],
    summary:
      "A donation management platform connecting people with verified NGOs and charitable foundations, with dynamic cause listings and offline bank-transfer workflows.",
    company: "Green Origin",
    role: "Frontend and Core PHP developer",
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Core PHP", "Figma"],
    features: [
      "NGOs publish donation causes; users browse and contribute",
      "Offline payment workflows through IBAN and bank transfers",
      "Batch loading of organisation and donation data",
      "Mobile app flows: causes, NGO profiles, top-up, PIN-confirmed donations, history and map navigation",
    ],
    contributions: [
      "Designed and developed the complete responsive front-end interface",
      "Implemented backend functionality in Core PHP for data management and user interactions",
      "Optimised database queries with eager loading to fetch data in batches",
      "Reduced page rendering time by approximately 60%",
    ],
    metric: { value: "~60%", label: "faster page rendering" },
    live: "https://www.khudii.com",
    featured: true,
  },
  {
    slug: "climate-iq",
    title: "Climate IQ",
    category: "Smart home AC management",
    filters: ["Dashboards & SaaS", "Mobile app UI"],
    summary:
      "A platform for monitoring and controlling smart air conditioning systems across buildings, departments and devices, with schedules, modes, timers and network setup.",
    company: "HoboeTech",
    role: "Frontend developer",
    stack: ["Vue.js 3", "Composition API", "Vuetify", "REST APIs", "JavaScript"],
    features: [
      "Interactive dashboards and device control interfaces",
      "Buildings, departments, gateways and device management",
      "Schedules, timers, fan speed and mode controls",
      "Gateway network configuration with static IP and DNS options",
    ],
    contributions: [
      "Designed and developed the frontend in Vue.js 3 and Vuetify",
      "Built a scalable component architecture with the Composition API",
      "Integrated RESTful APIs for real-time device communication",
      "Focused on reusable components, efficient state management and responsive layouts",
    ],
    featured: true,
  },
  {
    slug: "b-rap-portal",
    title: "B-RAP Portal",
    category: "Bulk Resource Allocation Platform · Web portal",
    filters: ["Dashboards & SaaS"],
    summary:
      "A web platform built from scratch to manage and allocate resources in bulk, with a workflow that turns complex allocation into clear, structured steps.",
    company: "HoboeTech",
    role: "Designer and frontend developer",
    stack: ["Vue.js 3", "Composition API", "JavaScript", "Figma"],
    features: [
      "Dashboard overview of resources and usage",
      "Resource management and allocation workflow",
      "Card-based layouts and data listings for large datasets",
      "Reusable UI components across the platform",
    ],
    contributions: [
      "Designed and developed the platform from scratch",
      "Built a modular Vue 3 frontend architecture with the Composition API",
      "Designed a workflow that simplifies complex allocation processes",
      "Developed optimised rendering for large datasets",
    ],
    featured: true,
    companions: ["b-rap-app"],
  },
  {
    slug: "ucas",
    title: "UCAS",
    category: "Unified Communication Access System",
    filters: ["Dashboards & SaaS"],
    summary:
      "A multi-channel telecom SaaS platform that brings several communication and service portals into one centralised dashboard.",
    company: "HoboeTech",
    role: "Frontend architect and UI designer",
    stack: ["HTML5", "CSS3", "SCSS", "Bootstrap", "Materialize UI"],
    features: [
      "One dashboard for CMT Jazz, PBX Telenor, Video Conferencing, Omni Chat, Ticketing and Call Center",
      "Navigation designed for switching between platforms",
      "Modular layouts for managing several portals in one place",
    ],
    contributions: [
      "Designed and developed the complete frontend architecture and interface",
      "Applied minimal design principles to simplify complex telecom workflows",
      "Built modular components and a scalable UI architecture for future integrations",
      "Collaborated with cross-functional teams on system architecture and SaaS requirements",
    ],
    metric: { value: "6", label: "telecom systems in one dashboard" },
    featured: true,
  },
  {
    slug: "orinas-portal",
    title: "Orinas Portal",
    category: "Corporate web platform, Japan",
    filters: ["Dashboards & SaaS"],
    summary:
      "The portal of Orinas, a Japan-based corporate web platform delivered end to end: a dashboard, sales figures and customers per team, affiliates, reports, a music library, news, FAQs, a user guide, and domestic and global sign-up.",
    company: "HoboeTech",
    role: "UI/UX designer and frontend developer",
    stack: ["Figma", "Photoshop", "HTML5", "CSS3", "Bootstrap", "JavaScript", "WordPress"],
    features: [
      "Dashboard and reports for teams and admins",
      "Sales figures and customer lists per team",
      "Affiliate programme pages and a music library",
      "Domestic and global sign-up flows, news, FAQs and a user guide",
    ],
    contributions: [
      "Gathered requirements with stakeholders to define scope and structure",
      "Created low and high fidelity wireframes in Figma",
      "Designed PSD mockups in Photoshop for the final visual direction",
      "Built the responsive front end with HTML5, CSS3, Bootstrap and JavaScript",
    ],
    featured: true,
    companions: ["orinas-wireframe"],
  },
  {
    slug: "orinas-wireframe",
    title: "Orinas Wireframes",
    category: "Website wireframes",
    filters: ["Wireframes", "Websites"],
    summary:
      "Figma wireframes for the Orinas corporate website: home, about, services and service details, blogs and blog details, and contact. They set the layout and user flow before the PSD mockups, HTML prototype and WordPress build.",
    company: "HoboeTech",
    role: "UI/UX designer",
    stack: ["Figma"],
    contributions: [
      "Created low and high fidelity wireframes to define layout, user flow and UI structure",
      "Used the approved wireframes as the base for Photoshop mockups",
      "Carried the structure through to the HTML prototype and the WordPress site",
    ],
    companions: ["orinas-portal"],
  },
  {
    slug: "polarcream",
    title: "PolarCream",
    category: "WooCommerce eCommerce",
    filters: ["eCommerce", "Websites"],
    summary:
      "An online store for ice cream products, with product management, promotions, discount deals and campaign management on WooCommerce.",
    company: "HoboeTech",
    role: "UI/UX designer and WordPress developer",
    stack: ["WordPress", "WooCommerce", "HTML5", "CSS3", "Bootstrap", "JavaScript"],
    features: [
      "Product catalogue, order processing and checkout",
      "Promotions, discount deals and campaign management",
      "Custom post types for structured product content",
    ],
    contributions: [
      "Designed the complete website UI/UX",
      "Configured WooCommerce and extended it with plugins",
      "Optimised product data rendering and page performance",
      "Reduced page load time by up to 50%",
    ],
    metric: { value: "50%", label: "lower page load time" },
    featured: true,
  },
  {
    slug: "green-origin",
    title: "Green Origin",
    category: "Corporate website",
    filters: ["Websites"],
    summary:
      "A fully responsive corporate website presenting Green Origin's services, project portfolio and capabilities.",
    company: "Green Origin",
    role: "Designer and WordPress developer",
    stack: ["WordPress", "JavaScript", "CSS3", "HTML5", "Photoshop", "SEO"],
    contributions: [
      "Designed, developed and deployed the site on WordPress",
      "Created high-fidelity mockups in Photoshop and translated them into templates",
      "Engineered client-side rendering for a 60% improvement in page load speed",
      "Implemented SEO structure, meta tags and internal linking",
    ],
    metric: { value: "60%", label: "faster page loads" },
    live: "http://greenorigin.pk/",
  },
  {
    slug: "tanzeem",
    title: "Tanzeem.org",
    category: "Islamic books and digital content",
    filters: ["Websites"],
    summary:
      "A digital platform for Islamic literature, lectures and educational resources, with books in PDF and audio recordings.",
    company: "Green Origin",
    role: "Designer and WordPress developer",
    stack: ["WordPress", "Photoshop", "Database design"],
    contributions: [
      "Designed UI mockups and visual assets for books in Photoshop",
      "Created the database schema and content structure for books, lectures and media",
      "Built the site on WordPress with plugins for content and media handling",
      "Structured categorisation to make resources easier to find",
    ],
    live: "https://tanzeem.org",
  },
  {
    slug: "stockkonnect",
    title: "StockKonnect",
    category: "Inventory SaaS website",
    filters: ["Websites"],
    summary:
      "The marketing website for StockKonnect, an inventory tool that keeps stock in sync to stop overselling on Amazon, eBay and Shopify.",
    stack: ["WordPress"],
    companions: ["stockkonnect-portal"],
  },
  {
    slug: "stockkonnect-portal",
    title: "StockKonnect Portal",
    category: "Multichannel inventory portal",
    filters: ["Dashboards & SaaS"],
    summary:
      "The StockKonnect portal designed in Figma: inventory management, warehouse list, shipping settings and eBay configuration for selling across marketplaces.",
    stack: ["Figma"],
    companions: ["stockkonnect"],
  },
  {
    slug: "izmir-portal",
    title: "Izmir Portal",
    category: "Housing society admin portal",
    filters: ["Dashboards & SaaS"],
    summary:
      "The admin portal for a housing community: residents, properties, staff and security, vehicle and servant registration, complaints, announcements, and billing and collections.",
    stack: ["Dashboard"],
    companions: ["izmir-app"],
  },
  {
    slug: "izmir-app",
    title: "Izmir App",
    category: "Resident mobile app",
    filters: ["Mobile app UI"],
    summary:
      "The resident app for the same community: announcements, complaints and maintenance, electricity and bill details, vehicle and servant registration, graveyard services and a matrimonial marketplace with step-by-step profiles.",
    stack: ["Figma"],
    companions: ["izmir-portal"],
  },
  {
    slug: "b-rap-app",
    title: "B-RAP App",
    category: "Resource allocation mobile app",
    filters: ["Mobile app UI"],
    summary:
      "The mobile side of B-RAP for Jazz Business: sign up with OTP verification, plan selection and secure payment, adding team members manually or by CSV, and allocating and reviewing resources.",
    company: "HoboeTech",
    stack: ["Figma"],
    features: [
      "Sign up, sign in and OTP verification",
      "Plan selection, payment method and secure payment",
      "Add team members manually or by bulk CSV upload",
      "Manage numbers, allocate resources and review the allocation",
    ],
    companions: ["b-rap-portal"],
  },
  {
    slug: "soil",
    title: "Soil & Water Filtration",
    category: "Field operations dashboard",
    filters: ["Dashboards & SaaS"],
    summary:
      "A live operations dashboard for soil and water work in the field: visits, farmers, samples, staff attendance, vehicles and geofence alerts on a map, filterable by district and date.",
    stack: ["Dashboard"],
  },
  {
    slug: "medikva",
    title: "MedikVA",
    category: "Healthcare AI website",
    filters: ["Websites"],
    summary: "A marketing website for an AI virtual voice assistant and 24/7 clinical call triage service.",
    stack: ["Website"],
  },
  {
    slug: "merc-1122",
    title: "MERC 1122",
    category: "Emergency services website",
    filters: ["Websites"],
    summary: "A website for a 24/7 national emergency helpline and rescue service.",
    stack: ["Website"],
  },
  {
    slug: "kaba-travels",
    title: "Kaba Travels",
    category: "Travel website",
    filters: ["Websites"],
    summary: "A travel agency website for Hajj, Umrah and holiday packages.",
    stack: ["WordPress"],
  },
  {
    slug: "mnd-homes",
    title: "MND Homes",
    category: "Charity website",
    filters: ["Websites"],
    summary: "A charity website supporting orphans and homeless people, with donation and volunteer calls to action.",
    stack: ["WordPress"],
  },
  {
    slug: "cutting-edge",
    title: "Cutting Edge Projects",
    category: "Technology services website",
    filters: ["Websites"],
    summary: "A corporate website for a technology services company, presenting services, case studies and partners.",
    stack: ["WordPress"],
  },
  {
    slug: "job-board",
    title: "Job Board",
    category: "Website design",
    filters: ["Websites"],
    summary: "A job board homepage design with search, popular job categories and featured listings.",
    stack: ["Figma"],
  },
  {
    slug: "dha-consumer",
    title: "DHA Consumer App",
    category: "Resident services app",
    filters: ["Mobile app UI"],
    summary:
      "A resident app for a housing authority: emergencies and dispatch, complaints, utility bills, properties, sub-accounts, servant registration and surveillance.",
    stack: ["Figma"],
  },
  {
    slug: "custom-tracking",
    title: "Customs Trip Tracking",
    category: "Logistics app",
    filters: ["Mobile app UI"],
    summary: "A trip tracking app for customs: QR codes to start and end trips, trip details, an end-of-trip form and review.",
    stack: ["Figma"],
  },
  {
    slug: "omnichat",
    title: "Omnichat",
    category: "Customer messaging app",
    filters: ["Mobile app UI"],
    summary: "A customer messaging and ticketing app with WhatsApp chats, filters, chat status and restrictions, and ticket tracking.",
    stack: ["Figma"],
  },
  {
    slug: "mezochat",
    title: "Mezochat",
    category: "Chat and calling app",
    filters: ["Mobile app UI"],
    summary: "A messaging app with one-to-one and group chats, polls, contacts, voice and video calls.",
    stack: ["Figma"],
  },
  {
    slug: "naemun",
    title: "Naemun",
    category: "Barbershop booking app",
    filters: ["Mobile app UI"],
    summary: "A booking and shop management app for barbershops: bookings, shop profile, working hours, social links and gallery.",
    stack: ["Figma"],
  },
  {
    slug: "recording",
    title: "Recording",
    category: "Audio recording app",
    filters: ["Mobile app UI"],
    summary: "A voice recording app with a recordings library, categories and recording details.",
    stack: ["Figma"],
  },
  {
    slug: "ruba-digital",
    title: "Ruba Digital",
    category: "Field sales app wireframes",
    filters: ["Mobile app UI", "Wireframes"],
    summary:
      "Wireframes for a field sales app: customers, employees and branches, a stepped sale flow, cash and instalment invoices, and recovery tracking.",
    stack: ["Figma"],
  },
  {
    slug: "sand-portal",
    title: "SAND Portal",
    category: "AI diagnostics web portal",
    filters: ["Dashboards & SaaS"],
    summary:
      "The web portal of SAND (Surveillance, Analysis & Networked Diagnostics), an AI-powered diagnostic ecosystem for public health: submission dashboards, test reports and case review, bulk upload with auto-crop, persons, RDT kits, facilities, users, roles and exports, with a dark mode.",
    stack: ["Dashboard"],
    features: [
      "Dashboard with package usage, submissions, positive cases and positivity rate",
      "Case review with manual verification, alerts for reactive cases and referral actions",
      "Bulk upload of test images with automatic cropping",
      "RDT kit, hospital and facility, user and role management",
      "Report exports, notifications and a full dark theme",
    ],
    companions: ["sand-app", "sand-website"],
  },
  {
    slug: "sand-app",
    title: "SAND App",
    category: "AI diagnostics mobile app",
    filters: ["Mobile app UI"],
    summary:
      "The SAND field app: health workers capture rapid diagnostic tests (RDTs), get AI-read reactive or non-reactive results with confidence scores, run sequential testing and keep working offline.",
    stack: ["Figma"],
    features: [
      "Onboarding covering RDT capture, AI analysis, sequential testing and offline use",
      "Home dashboard with tests in process and results by infection",
      "Infection detail and test history with reactive filters",
      "Submission detail, second-picture requests and new test entry",
      "Notifications and profile",
    ],
    companions: ["sand-portal", "sand-website"],
  },
  {
    slug: "sand-website",
    title: "SAND Website",
    category: "Healthcare AI website",
    filters: ["Websites"],
    summary:
      "The public website for SAND, presenting the AI-powered diagnostic ecosystem: how it works, solutions, impact, the portal, about, resources and contact.",
    stack: ["Website"],
    companions: ["sand-portal", "sand-app"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
type Img = { src: string; w: number; h: number };
export type Media = { cover: Img; thumb: Img; full?: Img; screens: (Img & { label: string; mobile: boolean })[] };
export const getMedia = (slug: Project["slug"]) => (media as Record<string, Media>)[slug];
