"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/user";
import { signOut } from "@/lib/auth-client";
import { LogOut, Save, Loader2 } from "lucide-react";
import Image from "next/image";

type Props = {
  initialName: string;
  initialImage: string | null;
  email: string;
};

function AvatarFallback({ name }: { name: string }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, #F59E0B, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#F59E0B20 1px, transparent 1px), linear-gradient(90deg, #F59E0B20 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      <span className="relative z-10 font-display text-base font-semibold text-primary">
        {initials}
      </span>
    </div>
  );
}

export default function ProfileForm({
  initialName,
  initialImage,
  email,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  async function handleSave() {
    setStatus("saving");
    setError(null);
    const result = await updateProfile({ name, image });
    if (result.success) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  const avatarSrc = image.trim() && !imgError ? image.trim() : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        {avatarSrc ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border shrink-0">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <AvatarFallback name={name} />
        )}
        <div>
          <p className="font-medium text-text-primary">{name || "—"}</p>
          <p className="text-sm text-text-muted">{email}</p>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Display name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm
                       text-text-primary placeholder:text-text-muted
                       focus:outline-none focus:border-primary
                       transition-colors duration-200"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Avatar URL
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setImgError(false);
            }}
            placeholder="https://..."
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5
                       font-mono text-sm text-text-primary placeholder:text-text-muted
                       focus:outline-none focus:border-primary
                       transition-colors duration-200"
          />
          <p className="text-xs text-text-muted">
            Paste any image URL — your GitHub or Google avatar works great.
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-border pt-6">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium
                     text-background transition-opacity duration-200
                     hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "saving" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {status === "saving"
            ? "Saving..."
            : status === "success"
              ? "Saved ✓"
              : "Save changes"}
        </button>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2
                     text-sm font-medium text-text-muted
                     transition-colors duration-200
                     hover:border-red-500/40 hover:text-red-400"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );
}
