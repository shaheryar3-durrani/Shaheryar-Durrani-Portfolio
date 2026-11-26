import { skillGroups } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillConstellation from "@/components/sections/SkillConstellation";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-t border-linen/10 bg-plum-950/60">
      <div className="shell">
        <SectionHeading
          id="skills-title"
          title={
            <>
              A toolkit shaped <span className="serif-accent text-rust-bright">by real projects</span>
            </>
          }
          lead="Grouped from the work itself. Pick a group, then hover or tap a skill to see where it was used."
        />
        <SkillConstellation groups={skillGroups} />
      </div>
    </section>
  );
}
