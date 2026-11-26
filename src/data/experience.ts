// Career history, transcribed from the resume. `projects` reference slugs in projects.ts
// (entries without visuals are listed by name only).
export type Role = {
  company: string;
  role: string;
  period: string;
  /** ISO year-month; `end` omitted while the role is current. */
  start: string;
  end?: string;
  location: string;
  summary: string;
  responsibilities: string[];
  stack: string[];
  projects: { name: string; slug?: string; note: string }[];
};

export const experience: Role[] = [
  {
    company: "HoboeTech",
    role: "Frontend Developer",
    period: "Sept 2023 – Present",
    start: "2023-09",
    location: "Lahore",
    summary:
      "Frontend and UI/UX work across corporate websites, a WooCommerce store, Vue.js 3 platforms and a multi-channel telecom SaaS dashboard.",
    responsibilities: [
      "Designed and built the frontend architecture of Vue.js 3 platforms with the Composition API, reusable components and efficient state management.",
      "Integrated RESTful APIs for real-time communication between dashboards and backend services.",
      "Created UI/UX mockups in Photoshop and low and high fidelity wireframes in Figma before development.",
      "Built custom WordPress themes, WooCommerce stores and custom post types, with SEO-friendly structure.",
      "Optimised data rendering for large datasets and product catalogues.",
    ],
    stack: ["Vue.js 3", "Vuetify", "WordPress", "WooCommerce", "SCSS", "Bootstrap", "Materialize UI", "REST APIs", "Figma", "Photoshop"],
    projects: [
      { name: "HoboeTech corporate website", note: "WordPress corporate site, designed in Photoshop first" },
      { name: "PolarCream", slug: "polarcream", note: "WooCommerce store, page load time cut by up to 50%" },
      { name: "Climate IQ", slug: "climate-iq", note: "Smart AC monitoring and control, Vue 3 + Vuetify" },
      { name: "B-RAP", slug: "b-rap-portal", note: "Bulk resource allocation platform, built from scratch" },
      { name: "Orinas", slug: "orinas-portal", note: "Japan-based corporate platform, end to end" },
      { name: "UCAS", slug: "ucas", note: "Six telecom systems unified in one dashboard" },
    ],
  },
  {
    company: "Green Origin",
    role: "PHP Developer",
    period: "Feb 2022 – Aug 2023",
    start: "2022-02",
    end: "2023-08",
    location: "Lahore",
    summary:
      "Full-stack PHP and WordPress work for NGOs and corporate clients, from database schemas to responsive frontends.",
    responsibilities: [
      "Built the Khudii donation platform frontend and its Core PHP backend.",
      "Optimised database queries with eager loading, cutting page rendering time by about 60%.",
      "Designed database schemas for a Microsoft services marketplace and an Islamic content library.",
      "Designed, developed and deployed the Green Origin corporate website on WordPress.",
      "Implemented SEO-friendly structure, meta tags and internal linking strategies.",
    ],
    stack: ["Core PHP", "WordPress", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Photoshop", "SEO"],
    projects: [
      { name: "Khudii", slug: "khudii", note: "Donation platform for NGOs, rendering time down about 60%" },
      { name: "Jazz Bizz Marketplace", note: "Database schema and service catalogue for Microsoft services" },
      { name: "Green Origin website", slug: "green-origin", note: "Corporate WordPress site, 60% faster page loads" },
      { name: "Tanzeem.org", slug: "tanzeem", note: "Islamic books, lectures and media library" },
    ],
  },
  {
    company: "NovaTech",
    role: "WordPress Designer Intern",
    period: "Jun 2021 – Dec 2021",
    start: "2021-06",
    end: "2021-12",
    location: "Abbottabad",
    summary:
      "A six-month internship focused on WordPress development and front-end web technologies.",
    responsibilities: [
      "Worked with WordPress CMS architecture: themes, plugins and dashboard management.",
      "Customised responsive pages with HTML5, CSS3 and Bootstrap, with JavaScript for interactivity.",
      "Learned core PHP fundamentals behind WordPress dynamic content.",
      "Assisted with debugging, testing and cross-browser compatibility.",
    ],
    stack: ["WordPress", "PHP", "HTML5", "CSS3", "Bootstrap", "JavaScript"],
    projects: [],
  },
];

export const education = [
  {
    degree: "BSCS, Computer Science",
    school: "University of Abbottabad",
    period: "Sept 2017 – Jun 2021",
    start: "2017-09",
    end: "2021-06",
    location: "Abbottabad",
    summary: "Bachelor of Science in Computer Science. The degree where the path into web development began, ahead of the WordPress internship at NovaTech.",
  },
];
