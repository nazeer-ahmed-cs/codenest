"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TopicNavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

export default function TopicSwitcher({
  topics,
}: {
  topics: TopicNavItem[];
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTopic = topics.find(
    (t) => !t.disabled && pathname.startsWith("/tutorial/html/") && pathname.includes(t.href.split("/").pop()!)
  );

  const activeLabel = currentTopic?.label ?? "Select Topic";

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

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {activeLabel}
        <svg
          className={`size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {topics.map((topic) => (
            <div key={topic.label}>
              {topic.disabled ? (
                <span className="flex cursor-not-allowed items-center justify-between px-3 py-2 text-sm text-gray-400">
                  {topic.label}
                  <span className="text-[10px] uppercase tracking-wider text-gray-300">
                    Soon
                  </span>
                </span>
              ) : (
                <Link
                  href={topic.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    currentTopic?.label === topic.label
                      ? "bg-blue-50 font-medium text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {topic.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
