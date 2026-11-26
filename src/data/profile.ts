// Single source for personal details. Everything here comes from the supplied resume.
const email = "shaheryardurrani5413@gmail.com";

export const profile = {
  name: "Shahzada Muhammad Shaheryar Durrani",
  firstName: "Shaheryar",
  initials: "SMSD",
  title: "Frontend Developer",
  discipline: "UI/UX Designer",
  tagline: "Beyond the Interface",
  location: "Lahore, Pakistan",
  email,
  // Gmail web compose (opens in the browser instead of a desktop mail app).
  gmailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent("Project inquiry")}`,
  phone: "+92 310 5962019",
  phoneHref: "tel:+923105962019",
  resume: "/resume/Shahzada-Shaheryar-Durrani-Resume.pdf",
  // First full-time role (Green Origin, Feb 2022). Years of experience are derived from this.
  careerStart: "2022-02-01",
  resumeYears: 4, // "4+ years" as stated in the resume; shown before the live value is computed

  intro:
    "I design and build responsive, high-performance web interfaces, taking products from Figma wireframes to Vue.js 3 applications and custom WordPress builds for NGOs, telecom platforms and corporate clients.",
  summary:
    "Results-oriented web designer bridging sophisticated UI/UX design and robust engineering. I specialise in high-performance applications built with Vue.js 3, PHP and WordPress, and in translating Figma and Photoshop prototypes into pixel-perfect, responsive interfaces.",
  languages: ["English", "Urdu", "Persian"],
  // Add LinkedIn / GitHub here when available; the contact section and footer render whatever is listed.
  socials: [] as { label: string; href: string }[],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
