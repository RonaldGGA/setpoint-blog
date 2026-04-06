"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toggleReadingList } from "@/lib/actions/reading-list";
import { useRouter } from "next/navigation";

interface ReadingListButtonProps {
  articleSlug: string;
  initialSaved?: boolean;
}

export default function ReadingListButton({
  articleSlug,
  initialSaved = false,
}: ReadingListButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!session) {
      router.push("/login");
      return;
    }

    setSaved((prev) => !prev);

    startTransition(async () => {
      const result = await toggleReadingList(articleSlug);

      if (result.error) {
        setSaved((prev) => !prev);
        return;
      }

      setSaved(result.saved);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={saved ? "Remove from reading list" : "Save to reading list"}
      title={saved ? "Remove from reading list" : "Save to reading list"}
      className={` cursor-pointer pointer-events-auto
        group flex items-center justify-center rounded-full p-2
        transition-all duration-200
        hover:bg-[var(--color-surface)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          saved
            ? "text-[var(--color-primary)]"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
        }
      `}
    >
      <Bookmark
        size={18}
        className="transition-transform duration-200 group-hover:scale-110"
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}
