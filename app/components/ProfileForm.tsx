"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/user";
import { signOut } from "@/lib/auth-client";
import { User, LogOut, Save, Loader2 } from "lucide-react";
import Image from "next/image";

type Props = {
  initialName: string;
  initialImage: string | null;
  email: string;
};

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

  const avatarSrc = image.trim() || null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-border)] flex items-center justify-center shrink-0">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={name} fill className="object-cover" />
          ) : (
            <User size={24} className="text-[var(--color-text-muted)]" />
          )}
        </div>
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">
            {name || "—"}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">{email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">
            Display name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 rounded-lg text-sm
                       bg-[var(--color-surface)] border border-[var(--color-border)]
                       text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                       focus:outline-none focus:border-[var(--color-primary)]
                       transition-colors duration-200"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">
            Avatar URL
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg text-sm font-mono
                       bg-[var(--color-surface)] border border-[var(--color-border)]
                       text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                       focus:outline-none focus:border-[var(--color-primary)]
                       transition-colors duration-200"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                     bg-[var(--color-primary)] text-black
                     hover:bg-[var(--color-primary-hover)] transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "saving" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {status === "saving"
            ? "Saving..."
            : status === "success"
              ? "Saved!"
              : "Save changes"}
        </button>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                     text-[var(--color-text-muted)] border border-[var(--color-border)]
                     hover:text-red-500 hover:border-red-500/40
                     transition-colors duration-200"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );
}
