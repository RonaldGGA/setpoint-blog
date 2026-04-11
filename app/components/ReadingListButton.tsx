"use client";
import { useTransition } from "react";
import { Bookmark } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toggleReadingList } from "@/lib/actions/reading-list";
import { useRouter } from "next/navigation";
import { useReadingList } from "./ReadingListProvider";

interface ReadingListButtonProps {
  articleSlug: string;
}

export default function ReadingListButton({
  articleSlug,
}: ReadingListButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { savedSlugs, toggle } = useReadingList();
  const [isPending, startTransition] = useTransition();

  const saved = savedSlugs.has(articleSlug);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!session) {
      router.push("/login");
      return;
    }

    const optimistic = !saved;
    toggle(articleSlug, optimistic);

    startTransition(async () => {
      const result = await toggleReadingList(articleSlug);
      if (result.error) {
        toggle(articleSlug, saved);
        return;
      }
      toggle(articleSlug, result.saved);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={saved ? "Remove from reading list" : "Save to reading list"}
      title={saved ? "Remove from reading list" : "Save to reading list"}
      className={`
        cursor-pointer pointer-events-auto
        group flex items-center justify-center rounded-full p-2
        transition-all duration-200
        hover:bg-surface
        disabled:opacity-50 disabled:cursor-not-allowed
        ${saved ? "text-primary" : "text-text-muted hover:text-primary"}
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
