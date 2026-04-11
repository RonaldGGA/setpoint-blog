import { prisma } from "@/lib/prisma";
import { Rss, CheckCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const [pendingCount, approvedCount, syndicationCount, recentLogs] =
    await Promise.all([
      prisma.comment.count({ where: { status: "PENDING" } }),
      prisma.comment.count({ where: { status: "APPROVED" } }),
      prisma.syndicationLog.count({ where: { status: "SUCCESS" } }),
      prisma.syndicationLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      label: "Pending comments",
      value: pendingCount,
      icon: Clock,
      href: "/admin/comments",
      urgent: pendingCount > 0,
    },
    {
      label: "Approved comments",
      value: approvedCount,
      icon: CheckCircle,
      href: "/admin/comments",
      urgent: false,
    },
    {
      label: "Syndicated articles",
      value: syndicationCount,
      icon: Rss,
      href: "/admin/syndication",
      urgent: false,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Overview of Setpoint activity.
        </p>
      </div>
      <Link
        href="https://app.contentful.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
      >
        <ExternalLink size={14} />
        Write in Contentful
      </Link>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href, urgent }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon
                size={16}
                className={urgent ? "text-primary" : "text-text-muted"}
              />
              {urgent && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Action needed
                </span>
              )}
            </div>
            <p className="font-display text-3xl font-bold text-text-primary">
              {value}
            </p>
            <p className="mt-1 text-xs text-text-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-primary">
            Recent syndication activity
          </h2>
          <Link
            href="/admin/syndication"
            className="group flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-primary"
          >
            View all
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {recentLogs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-text-muted">
            No syndication activity yet.
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface divide-y divide-border">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      log.status === "SUCCESS"
                        ? "bg-secondary"
                        : log.status === "FAILED"
                          ? "bg-red-500"
                          : "bg-text-muted"
                    }`}
                  />
                  <span className="font-mono text-xs text-text-muted">
                    {log.articleSlug}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="capitalize">{log.platform}</span>
                  <span>
                    {new Date(log.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
