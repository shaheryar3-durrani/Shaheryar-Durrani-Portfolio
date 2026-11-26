import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Archive from "@/components/sections/Archive";
import Profile from "@/components/sections/Profile";
import Process from "@/components/sections/Process";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import { profile } from "@/data/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  alumniOf: "University of Abbottabad",
  worksFor: { "@type": "Organization", name: "HoboeTech" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Skills />
      <Journey />
      <FeaturedWork />
      <Archive />
      <Profile />
      <Process />
      <Achievements />
      <Contact />
    </>
  );
}
