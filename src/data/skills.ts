// Skills grouped from the resume's skills list and project descriptions. No proficiency levels on purpose.
export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  skills: { name: string; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Semantic, responsive interfaces that hold up across devices and browsers.",
    skills: [
      { name: "HTML5", note: "Semantic markup on every build, from prototypes to production." },
      { name: "CSS3", note: "Responsive layouts and cross-browser styling." },
      { name: "SCSS", note: "Modular styling for the UCAS telecom dashboard." },
      { name: "JavaScript", note: "Client-side logic, interactivity and dynamic data handling." },
      { name: "Bootstrap", note: "Grid and components across corporate and NGO sites." },
      { name: "Tailwind CSS", note: "Utility-first styling, at a basic level." },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    blurb: "Component architecture for dashboards and data-heavy applications.",
    skills: [
      { name: "Vue.js 3", note: "Frontends for Climate IQ and B-RAP." },
      { name: "Composition API", note: "Scalable, modular component logic in Vue 3." },
      { name: "Vuetify", note: "Material components for the Climate IQ interface." },
      { name: "Materialize UI", note: "Design system layer for UCAS." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Enough server-side depth to ship complete features and fix slow ones.",
    skills: [
      { name: "Core PHP", note: "Khudii's backend: data management and user interactions." },
      { name: "REST APIs", note: "Real-time device data in Climate IQ." },
      { name: "Database design", note: "Schemas for Jazz Bizz Marketplace and Tanzeem.org." },
      { name: "Query optimisation", note: "Eager loading that cut Khudii's rendering time by about 60%." },
    ],
  },
  {
    id: "design",
    label: "UI/UX & Design",
    blurb: "Wireframes and mockups first, so development starts from a clear structure.",
    skills: [
      { name: "Figma", note: "Low and high fidelity wireframes and app UI design." },
      { name: "Figma Make", note: "Rapid interactive prototyping." },
      { name: "Photoshop", note: "PSD mockups and visual design before development." },
      { name: "Illustrator", note: "Vector assets and brand elements." },
      { name: "Canva", note: "Quick marketing and content visuals." },
    ],
  },
  {
    id: "cms",
    label: "CMS & eCommerce",
    blurb: "Custom WordPress builds that clients can manage themselves.",
    skills: [
      { name: "WordPress", note: "Custom themes, widgets and plugin configuration." },
      { name: "WooCommerce", note: "PolarCream's products, orders and promotions." },
      { name: "Custom post types", note: "Structured product and content data in the CMS." },
      { name: "SEO", note: "Meta tags, internal linking and search-friendly structure." },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    blurb: "How the work gets delivered.",
    skills: [
      { name: "Performance optimisation", note: "Client-side rendering and data loading tuned for speed." },
      { name: "Responsive design", note: "Desktop, tablet and mobile from the start." },
      { name: "Agile collaboration", note: "Working with cross-functional teams and stakeholders." },
      { name: "Requirement analysis", note: "Scoping user needs and site structure with stakeholders." },
    ],
  },
];
