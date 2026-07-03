"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/lib/curriculum";

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded-sm bg-blue-100 text-gray-900">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchBar({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fuseRef = useRef<Fuse<SearchItem>>();
  const isMac =
    typeof navigator !== "undefined" && navigator.platform.includes("Mac");

  useEffect(() => {
    fuseRef.current = new Fuse(items, {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1 },
        { name: "topic", weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [items]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key === "k";
      const isSlash = e.key === "/" && e.target === document.body;
      if (isCmdK || isSlash) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const doSearch = useCallback((q: string) => {
    if (!fuseRef.current || !q.trim()) {
      setResults([]);
      return;
    }
    const fuseResults = fuseRef.current.search(q.trim());
    setResults(fuseResults.map((r) => r.item).slice(0, 8));
    setSelectedIdx(-1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 100);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = useCallback(
    (slug?: string) => {
      if (slug) {
        router.push(`/tutorial/html/${slug}`);
      }
      setIsOpen(false);
      setQuery("");
      setResults([]);
      inputRef.current?.blur();
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) {
        if (e.key === "Escape") {
          inputRef.current?.blur();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIdx((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIdx((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIdx >= 0 && results[selectedIdx]) {
            select(results[selectedIdx].slug);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, selectedIdx, select]
  );

  const showDropdown = isOpen && query.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xs">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showDropdown && hasResults}
          aria-controls="search-results"
          aria-label="Search lessons"
          placeholder="Search lessons..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-8 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 sm:inline-block">
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>
      </div>

      <div
        id="search-results"
        className={`absolute left-0 right-0 top-full mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-opacity ${
          showDropdown ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {hasResults ? (
          <ul className="py-1" role="listbox">
            {results.map((item, idx) => (
              <li
                key={item.slug}
                role="option"
                aria-selected={idx === selectedIdx}
              >
                <Link
                  href={`/tutorial/html/${item.slug}`}
                  onClick={() => select()}
                  className={`block px-3 py-2.5 transition-colors ${
                    idx === selectedIdx ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-gray-900">
                      {highlightText(item.title, query)}
                    </span>
                    <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      {item.topic}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                    {highlightText(item.description, query)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3 py-4 text-center text-xs text-gray-400">
            No lessons found
          </p>
        )}
      </div>
    </div>
  );
}
