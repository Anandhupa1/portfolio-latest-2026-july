import MagneticButton from "./MagneticButton";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28"
    >
      <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paperDimmer">
        Open for new work
      </p>
      <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl lg:text-5xl">
        Got a system that needs building — or fixing?
      </h2>
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-paperDim">
        If reliability, performance, or multi-locale commerce is on the critical
        path, let&apos;s talk.
      </p>
      <div className="mt-8 flex justify-center">
        <MagneticButton
          href="https://github.com/Anandhupa1"
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch
        </MagneticButton>
      </div>
    </section>
  );
}
