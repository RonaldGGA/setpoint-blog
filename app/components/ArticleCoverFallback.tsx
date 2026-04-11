type Props = {
  accentColor: string;
  tagName?: string;
};

export default function ArticleCoverFallback({ accentColor, tagName }: Props) {
  const a10 = `${accentColor}10`;
  const a20 = `${accentColor}20`;
  const a40 = `${accentColor}40`;

  return (
    <div className="relative h-64 w-full overflow-hidden bg-surface sm:h-80 md:h-96">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${a20} 1px, transparent 1px), linear-gradient(90deg, ${a20} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div
        className="absolute -top-16 left-1/2 h-72 w-150 -translate-x-1/2 rounded-full opacity-15"
        style={{ background: accentColor, filter: "blur(80px)" }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-10"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <line
          x1="96"
          y1="57"
          x2="224"
          y2="102"
          stroke={accentColor}
          strokeWidth="0.8"
        />
        <line
          x1="224"
          y1="102"
          x2="440"
          y2="44"
          stroke={accentColor}
          strokeWidth="0.8"
        />
        <line
          x1="440"
          y1="44"
          x2="560"
          y2="144"
          stroke={accentColor}
          strokeWidth="0.8"
        />
        <line
          x1="560"
          y1="144"
          x2="680"
          y2="70"
          stroke={accentColor}
          strokeWidth="0.8"
        />
      </svg>

      {[
        { top: "18%", left: "12%", size: 3 },
        { top: "32%", left: "28%", size: 2 },
        { top: "14%", left: "55%", size: 4 },
        { top: "45%", left: "70%", size: 2 },
        { top: "22%", left: "85%", size: 3 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-50"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: accentColor,
          }}
        />
      ))}

      <span
        className="absolute right-8 top-6 z-10 text-xs font-semibold uppercase tracking-widest opacity-60"
        style={{ color: accentColor }}
      >
        Setpoint
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-background via-background/80 to-transparent px-12 pb-8 pt-16">
        {tagName && (
          <div
            className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: accentColor,
              background: a10,
              border: `1px solid ${a40}`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accentColor }}
            />
            {tagName}
          </div>
        )}
        <p className="text-xs tracking-widest text-text-muted">
          Industry 4.0 × Software
        </p>
      </div>
    </div>
  );
}
