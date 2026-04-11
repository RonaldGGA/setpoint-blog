"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getReadingListSlugs } from "@/lib/actions/reading-list";

type ReadingListContextType = {
  savedSlugs: Set<string>;
  toggle: (slug: string, saved: boolean) => void;
};

const ReadingListContext = createContext<ReadingListContextType>({
  savedSlugs: new Set(),
  toggle: () => {},
});

export function ReadingListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    getReadingListSlugs().then((slugs) => setSavedSlugs(new Set(slugs)));
  }, []);

  function toggle(slug: string, saved: boolean) {
    setSavedSlugs((prev) => {
      const next = new Set(prev);
      if (saved) next.add(slug);
      else next.delete(slug);
      return next;
    });
  }

  return (
    <ReadingListContext.Provider value={{ savedSlugs, toggle }}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  return useContext(ReadingListContext);
}
