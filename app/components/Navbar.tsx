import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[var(--color-text-primary)] transition-opacity hover:opacity-80"
        >
          <span className="text-[var(--color-primary)]">▸</span>
          Setpoint
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <Link
            href="/articles"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            Articles
          </Link>
          <Link
            href="/series"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            Series
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            About
          </Link>
          <Link
            href="/newsletter"
            className="rounded-md border border-[var(--color-primary)] px-3 py-1.5 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]"
          >
            Newsletter
          </Link>
        </div>
      </nav>
    </header>
  );
}
