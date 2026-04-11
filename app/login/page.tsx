"use client";

import { signIn } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl text-primary">▸</span>
            <span className="font-display text-2xl font-bold text-text-primary">
              Setpoint
            </span>
          </div>
          <p className="text-sm leading-relaxed text-text-muted">
            Technical publishing for Industry 4.0.
            <br />
            Sign in to save articles and join the conversation.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/80 p-8 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <button
              onClick={() =>
                signIn.social({ provider: "github", callbackURL: "/" })
              }
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-primary/40 hover:bg-background hover:text-primary"
            >
              <FaGithub size={16} />
              Continue with GitHub
            </button>

            <button
              onClick={() =>
                signIn.social({ provider: "google", callbackURL: "/" })
              }
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-primary/40 hover:bg-background hover:text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            By signing in you agree to our{" "}
            <span className="text-primary underline underline-offset-2 cursor-pointer">
              terms
            </span>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
