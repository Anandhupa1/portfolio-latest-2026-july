import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col justify-center">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paperDimmer">
            Open for new work
          </p>
          <h2 className="max-w-lg font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Got a system that needs building — or fixing?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paperDim">
            If reliability, performance, or multi-locale commerce is on the
            critical path, tell me a bit about it — I usually reply within
            24–48 hours.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" aria-hidden />
              <span className="ml-3 font-mono text-[11px] tracking-wide text-paperDimmer">
                contact_channel.log
              </span>
            </div>
            <ul className="divide-y divide-line font-mono text-xs">
              <li className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span className="text-paperDimmer">status</span>
                <span className="inline-flex items-center gap-2 text-teal">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
                  </span>
                  available
                </span>
              </li>
              <li className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span className="text-paperDimmer">location</span>
                <span className="text-paper">Kochi, Kerala, IN</span>
              </li>
              <li className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span className="text-paperDimmer">reply_window</span>
                <span className="text-paper">24–48 hours</span>
              </li>
              <li className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span className="text-paperDimmer">channel</span>
                <span className="text-signal">secure form → inbox</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-surface p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
