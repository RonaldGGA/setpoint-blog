"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false); // ← nuevo

  useEffect(() => {
    const renderclient = () => {
      setMounted(true); // ← cliente listo
    };
    renderclient();
    const stored = localStorage.getItem("theme");
    const dark = stored !== "light";

    const changeToDark = () => {
      setIsDark(dark);
    };
    changeToDark();
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
    >
      {/* Solo renderiza el ícono cuando ya estamos en el cliente */}
      {mounted &&
        (isDark ? (
          <Sun size={18} strokeWidth={1.75} />
        ) : (
          <Moon size={18} strokeWidth={1.75} />
        ))}
    </button>
  );
}
