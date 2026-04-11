import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="text-primary text-sm">▸</span>
          <span>Setpoint · Ronald González de Armas</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/RonaldGGA"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-primary"
          >
            GitHub
          </Link>
          <Link
            href="https://portfolio-ronalddearmas.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-primary"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-text-primary"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
