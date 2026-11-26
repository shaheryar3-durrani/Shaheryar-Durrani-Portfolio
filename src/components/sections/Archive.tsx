import { archiveProjects, getMedia } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ArchiveGrid from "@/components/sections/ArchiveGrid";

export default function Archive() {
  const items = archiveProjects.map((p) => {
    const m = getMedia(p.slug);
    return { ...p, thumb: m.thumb, full: m.full, screens: m.screens.length };
  });
  return (
    <section id="archive" aria-labelledby="archive-title" className="section border-t border-linen/10 bg-plum-950/60">
      <div className="shell">
        <SectionHeading
          id="archive-title"
          title={
            <>
              Everything else <span className="serif-accent text-rust-bright">on the desk</span>
            </>
          }
          lead="Websites, dashboards, portals and mobile app designs from the wider body of work. Filter by type."
        />
        <ArchiveGrid items={items} />
      </div>
    </section>
  );
}
