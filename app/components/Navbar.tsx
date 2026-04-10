import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ThemeToggle from "./ThemeToggle";
import NavbarUser from "./NavbarUser";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-80"
        >
          <span className="text-primary">▸</span>
          Setpoint
        </Link>

        <div className="flex items-center gap-5 text-sm text-text-muted">
          <Link
            href="/articles"
            className="transition-colors hover:text-text-primary"
          >
            Articles
          </Link>
          <Link
            href="/series"
            className="transition-colors hover:text-text-primary"
          >
            Series
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-text-primary"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NavbarUser user={session?.user ?? null} />
        </div>
      </nav>
    </header>
  );
}
