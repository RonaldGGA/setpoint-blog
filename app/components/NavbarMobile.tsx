"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Bookmark, User, LogOut, LayoutDashboard } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";

interface Props {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role: string;
  } | null;
}

export default function NavbarMobile({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const changeIsMounted = () => {
      setMounted(true);
    };
    changeIsMounted();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  async function handleSignOut() {
    await signOut();
    close();
    router.refresh();
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email[0].toUpperCase();

  const drawer = (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={close}
      />

      <div className="fixed right-0 top-14 z-50 h-[calc(100dvh-56px)] w-72 border-l border-border bg-surface flex flex-col overflow-y-auto">
        <div className="flex flex-col p-4 gap-1 border-b border-border">
          <Link
            href="/articles"
            onClick={close}
            className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
          >
            Articles
          </Link>
          <Link
            href="/series"
            onClick={close}
            className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
          >
            Series
          </Link>
          <Link
            href="/about"
            onClick={close}
            className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
          >
            About
          </Link>
        </div>

        <div className="flex flex-col p-4 gap-1 flex-1">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary shrink-0">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">
                    {user.name ?? user.email}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/reading-list"
                onClick={close}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
              >
                <Bookmark size={15} />
                Reading list
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={close}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
                >
                  <LayoutDashboard size={15} />
                  Admin
                </Link>
              )}

              <Link
                href="/profile"
                onClick={close}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
              >
                <User size={15} />
                Profile
              </Link>

              <div className="mt-auto pt-4 border-t border-border">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-red-400"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              onClick={close}
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex md:hidden items-center gap-2">
      <SearchButton />
      <ThemeToggle />

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center rounded-md p-2 text-text-muted transition-colors hover:text-text-primary"
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mounted && open && createPortal(drawer, document.body)}
    </div>
  );
}
