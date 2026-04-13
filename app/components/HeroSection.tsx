"use client";
export default function HeroSection() {
  return (
    <div className="mb-10 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-px w-8 bg-primary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Industry 4.0 × Software
        </span>
      </div>

      <h1 className="font-display text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
        Where industrial automation
        <br />
        <span className="text-text-muted font-normal">
          meets modern software.
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-text-muted leading-relaxed">
        Technical deep-dives on SCADA, PLCs, IIoT, OPC-UA — written by a
        developer who builds both sides.
      </p>
    </div>
  );
}
