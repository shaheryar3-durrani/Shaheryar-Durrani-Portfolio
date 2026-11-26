import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import Reveal from "@/components/animations/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import CopyEmail from "@/components/ui/CopyEmail";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section on-rust overflow-hidden bg-rust">
      <div aria-hidden className="pointer-events-none absolute -top-1/3 -right-1/4 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(242,236,229,0.14),transparent)]" />
      <div className="shell relative grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <h2 id="contact-title" className="display text-[length:clamp(var(--text-step-4),7vw,var(--text-step-6))]">
              Have a project <span className="serif-accent">in mind?</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-linen">
              Let&apos;s turn your ideas into something meaningful through thoughtful design and modern development.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 space-y-5 border-t border-linen/25 pt-8">
              <li className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Mail size={18} aria-hidden />
                <a href={`mailto:${profile.email}`} className="text-lg underline-offset-4 hover:underline break-all">
                  {profile.email}
                </a>
                <CopyEmail email={profile.email} />
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} aria-hidden />
                <a href={profile.phoneHref} className="text-lg underline-offset-4 hover:underline">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin size={18} aria-hidden />
                <span className="text-lg">{profile.location}</span>
              </li>
              {profile.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-lg underline-offset-4 hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="md:col-span-6">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
