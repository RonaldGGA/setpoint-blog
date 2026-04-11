import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            404
          </span>
          <span className="h-px w-6 bg-primary" />
        </div>

        <h1 className="font-display text-5xl font-bold text-text-primary sm:text-7xl">
          Not found
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
          This page doesn&apos;t exist or was moved. The content you&apos;re
          looking for might be in the articles section.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <span className="text-border">·</span>
          <Link
            href="/articles"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Browse articles
          </Link>
        </div>
      </div>
    </main>
  );
}
