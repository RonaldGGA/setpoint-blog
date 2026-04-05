"use client";

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login Test</h1>
      <button
        onClick={() =>
          signIn.social({
            provider: "github",
            callbackURL: "/",
          })
        }
      >
        Sign in with GitHub
      </button>

      <button
        onClick={() =>
          signIn.social({
            provider: "google",
            callbackURL: "/",
          })
        }
        style={{ marginLeft: "1rem" }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
