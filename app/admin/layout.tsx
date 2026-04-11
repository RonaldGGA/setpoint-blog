import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, MessageSquare, Rss } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/syndication", label: "Syndication", icon: Rss },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={14} />
          Back to site
        </Link>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />

          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Admin
          </span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm text-text-muted transition-colors hover:border-border hover:bg-surface hover:text-text-primary"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 h-px bg-border" />
      </div>
      {children}
    </div>
  );
}
