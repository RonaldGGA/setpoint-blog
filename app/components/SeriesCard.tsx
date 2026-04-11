import Link from "next/link";
import { SeriesWithCount } from "@/types/contentful";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function SeriesCard({
  series,
  index,
  accentColor = "#F59E0B",
}: {
  series: SeriesWithCount;
  index: number;
  accentColor?: string;
}) {
  const articleCount = series.linkedFrom.articleCollection.total;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-surface overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
      style={{
        animation: "fadeInUp 0.4s ease-out both",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {series.coverImage ? (
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={series.coverImage.url}
            alt={series.coverImage.description ?? series.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />
        </div>
      ) : (
        <div className="relative h-36 w-full overflow-hidden bg-surface">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${accentColor}15 1px, transparent 1px), linear-gradient(90deg, ${accentColor}15 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 90% 90% at 50% 0%, black 20%, transparent 100%)",
            }}
          />
          <div
            className="absolute -top-10 left-1/2 h-36 w-72 -translate-x-1/2 rounded-full opacity-15"
            style={{ background: accentColor, filter: "blur(50px)" }}
          />
          <svg
            className="absolute inset-0 h-full w-full opacity-10"
            viewBox="0 0 400 140"
            preserveAspectRatio="xMidYMid slice"
          >
            <line
              x1="40"
              y1="30"
              x2="160"
              y2="80"
              stroke={accentColor}
              strokeWidth="0.8"
            />
            <line
              x1="160"
              y1="80"
              x2="280"
              y2="40"
              stroke={accentColor}
              strokeWidth="0.8"
            />
            <line
              x1="280"
              y1="40"
              x2="380"
              y2="90"
              stroke={accentColor}
              strokeWidth="0.8"
            />
          </svg>
          {[
            { top: "21%", left: "10%", size: 3 },
            { top: "57%", left: "40%", size: 2 },
            { top: "28%", left: "70%", size: 4 },
            { top: "64%", left: "95%", size: 2 },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-50"
              style={{
                top: d.top,
                left: d.left,
                width: d.size,
                height: d.size,
                background: accentColor,
              }}
            />
          ))}
          <span
            className="absolute right-3.5 top-3.5 text-[9px] font-semibold uppercase tracking-widest opacity-50"
            style={{ color: accentColor }}
          >
            Setpoint
          </span>
          <div
            className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              color: accentColor,
              background: `${accentColor}0D`,
              border: `1px solid ${accentColor}40`,
            }}
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: accentColor }}
            />
            Series
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-base font-semibold leading-snug text-text-primary transition-colors duration-200 group-hover:text-primary">
            {series.title}
          </h2>
          <ChevronRight
            size={15}
            className="mt-0.5 shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>

        {series.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
            {series.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {articleCount} article{articleCount === 1 ? "" : "s"}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            Series
          </span>
        </div>
      </div>
    </Link>
  );
}
