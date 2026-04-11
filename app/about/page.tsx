"use client";

import { motion } from "framer-motion";
import { Mail, Globe, GraduationCap, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const skills = [
  {
    label: "Frontend",
    items: "React, Next.js, TypeScript, Tailwind CSS, shadcn/ui",
  },
  {
    label: "Backend",
    items: "Node.js, REST APIs, tRPC, RBAC, Better Auth, Express.js",
  },
  {
    label: "Databases",
    items: "PostgreSQL, Prisma ORM, Neon, Redis (Upstash)",
  },
  {
    label: "AI / LLM",
    items: "OpenAI SDK, OpenRouter, Gemini API, prompt engineering",
  },
  { label: "GraphQL", items: "Apollo Client, schema design, Contentful CMS" },
  { label: "DevOps", items: "Docker, Git/GitHub, Vercel, CI/CD, Linux" },
];

const certifications = [
  {
    title: "B.Eng. Automation Engineering",
    subtitle: "CUJAE, Havana · 2025 – Present",
    note: "Control Systems · Industrial Networks · Digital Logic",
    icon: GraduationCap,
  },
  {
    title: "Cambridge C1 Advanced (CAE)",
    subtitle: "Score: 193/210 — Grade B",
    note: "Professional working proficiency in English",
    icon: BadgeCheck,
  },
  {
    title: "CS50 — Harvard University",
    subtitle: "Verified Certificate",
    note: "C, Python, SQL, Algorithms, Data Structures",
    icon: BadgeCheck,
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <motion.div {...fadeUp(0)} className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            About
          </span>
        </div>
        <h1 className="font-display text-4xl font-bold text-text-primary">
          Ronald González de Armas
        </h1>
        <p className="mt-2 text-lg text-secondary">
          Full-Stack Developer · Automation Engineering Student
        </p>
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        className="mb-12 space-y-4 leading-relaxed text-text-muted"
      >
        <p>
          Self-taught Full-Stack Developer with 2+ years of daily project-based
          practice. I build and deploy production applications integrating LLM
          APIs, real-time data pipelines, and role-based auth systems.
        </p>
        <p>
          Currently studying Automation Engineering at CUJAE, Havana — which
          gives me a foundation in the industrial world that most software
          developers don&apos;t have. Setpoint exists at exactly that
          intersection: modern software thinking applied to Industry 4.0.
        </p>
        <p>
          C1 English (Cambridge CAE 193/210). Native Spanish speaker. Open to
          remote work globally.
        </p>
      </motion.div>

      <motion.hr {...fadeUp(0.15)} className="mb-12 border-border" />

      <motion.div {...fadeUp(0.2)} className="mb-12">
        <h2 className="font-display mb-6 text-xl font-semibold text-text-primary">
          Technical Stack
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                {skill.label}
              </p>
              <p className="text-sm text-text-muted">{skill.items}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="mb-12">
        <h2 className="font-display mb-6 text-xl font-semibold text-text-primary">
          Education & Certifications
        </h2>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="flex gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40"
            >
              <cert.icon size={18} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-text-primary">{cert.title}</p>
                <p className="text-sm text-secondary">{cert.subtitle}</p>
                <p className="mt-0.5 text-xs text-text-muted">{cert.note}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.4)}>
        <h2 className="font-display mb-6 text-xl font-semibold text-text-primary">
          Get in touch
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="mailto:ronald.dearmass@gmail.com"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
          >
            <Mail size={15} />
            ronald.dearmass@gmail.com
          </Link>
          <Link
            href="https://github.com/RonaldGGA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
          >
            <FaGithub size={15} />
            RonaldGGA
          </Link>
          <Link
            href="https://portfolio-ronalddearmas.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
          >
            <Globe size={15} />
            Portfolio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
