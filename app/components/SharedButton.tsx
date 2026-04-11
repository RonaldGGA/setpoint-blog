"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { FaLink, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        setOpen((prev) => !prev);
      }
      return;
    }
    setOpen((prev) => !prev);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <Share2 size={14} />
        Share
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-border bg-surface p-1 shadow-lg">
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
            >
              {copied ? (
                <Check size={14} className="text-primary" />
              ) : (
                <FaLink size={14} />
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
            >
              <FaTwitter />
              Share on X
            </Link>

            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-border/40 hover:text-text-primary"
            >
              <FaLinkedin />
              Share on LinkedIn
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
