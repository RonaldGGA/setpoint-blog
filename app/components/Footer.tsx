import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        {/* Left */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span className="text-[var(--color-primary)]">▸</span>
          <span>Setpoint — Ronald González de Armas</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <Link
            href="https://github.com/RonaldGGA"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            GitHub
          </Link>
          <Link
            href="https://portfolio-ronalddearmas.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
