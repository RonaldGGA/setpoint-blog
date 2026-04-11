"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

export default function SearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-text-muted transition-colors hover:text-text-primary"
        aria-label="Search articles"
      >
        <Search size={16} />
      </button>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
