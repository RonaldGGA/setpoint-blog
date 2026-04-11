"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import {
  User,
  LogOut,
  Bookmark,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    role: string;
  } | null;
}

export default function NavbarUser({ user }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOutUser = async () => {
    await signOut();
    router.refresh();
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Sign in
      </Link>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
          {initials}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-surface p-1 shadow-lg">
          <div className="border-b border-border px-3 py-2 mb-1">
            <p className="text-xs font-medium text-text-primary truncate">
              {user.name ?? user.email}
            </p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>

          <Link
            href="/reading-list"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
          >
            <Bookmark size={14} />
            Reading list
          </Link>
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
            >
              <LayoutDashboard size={14} />
              Admin
            </Link>
          )}

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
          >
            <User size={14} />
            Profile
          </Link>

          <button
            onClick={() => logOutUser()}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
