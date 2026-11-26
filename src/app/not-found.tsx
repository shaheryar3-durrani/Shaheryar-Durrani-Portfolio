import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="shell grid min-h-svh place-content-center gap-8 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display text-[clamp(3rem,10vw,9rem)]">
        Lost <span className="serif-accent text-rust-bright">beyond</span> the interface
      </h1>
      <div>
        <Button href="/">Back home</Button>
      </div>
    </section>
  );
}
