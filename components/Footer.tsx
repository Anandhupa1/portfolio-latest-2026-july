export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 font-mono text-xs tracking-wide text-paperDimmer sm:flex-row sm:items-center sm:px-8">
        <p>© {new Date().getFullYear()} Anandhu</p>
        <a
          href="https://github.com/Anandhupa1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-paperDim transition-colors hover:text-paper"
        >
          github.com/Anandhupa1
        </a>
        <p>Kochi, Kerala, IN</p>
      </div>
    </footer>
  );
}
