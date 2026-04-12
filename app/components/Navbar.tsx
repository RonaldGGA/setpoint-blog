import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ThemeToggle from "./ThemeToggle";
import NavbarUser from "./NavbarUser";
import SearchButton from "./SearchButton";
import NavbarMobile from "./NavbarMobile";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user ?? null;

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

        <div className="hidden md:flex items-center gap-5 text-sm text-text-muted">
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

        <div className="hidden md:flex items-center gap-3">
          <SearchButton />
          <ThemeToggle />
          <NavbarUser user={user} />
        </div>

        <NavbarMobile user={user} />
      </nav>
    </header>
  );
}
