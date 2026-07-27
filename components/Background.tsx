export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-ink" />
      <div className="hero-glow absolute inset-0" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
