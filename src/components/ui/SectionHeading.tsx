import Reveal from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  id?: string;
};

export default function SectionHeading({ title, lead, className, id }: Props) {
  return (
    <div className={cn("max-w-5xl", className)}>
      <Reveal>
        <h2 id={id} className="display-lg">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.08}>
          <p className="lead mt-6 max-w-2xl">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
