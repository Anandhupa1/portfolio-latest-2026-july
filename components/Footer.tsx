export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 font-mono text-xs tracking-wide text-paperDimmer sm:flex-row sm:items-center sm:px-8">
        <p>© {new Date().getFullYear()} Anandhu</p>
        <a
          href="https://www.linkedin.com/in/anandhu-developer/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-paperDim transition-colors hover:text-paper"
        >
          linkedin.com/in/anandhu-developer
        </a>
        <p>Kochi, Kerala, IN</p>
      </div>
    </footer>
  );
}
