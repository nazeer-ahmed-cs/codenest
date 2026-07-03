"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { topics } from "@/lib/curriculum";

export default function Sidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  const activeTopic = topics.find((t) =>
    t.lessons.some((l) => l.slug === currentSlug)
  );

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (activeTopic) return new Set([activeTopic.title]);
    return new Set(topics.map((t) => t.title));
  });

  useEffect(() => {
    if (activeTopic) {
      setExpanded((prev) => {
        if (prev.has(activeTopic.title)) return prev;
        return new Set([...Array.from(prev), activeTopic.title]);
      });
    }
  }, [activeTopic]);

  const toggle = (title: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
      <nav className="p-4">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Curriculum
        </p>
        <ul className="space-y-1">
          {topics.map((topic) => {
            const isOpen = expanded.has(topic.title);
            const isActiveTopic = activeTopic?.title === topic.title;
            return (
              <li key={topic.title}>
                <button
                  onClick={() => toggle(topic.title)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors ${
                    isActiveTopic
                      ? "text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <svg
                    className={`size-3 shrink-0 transition-transform ${
                      isOpen ? "rotate-90" : ""
                    } ${isActiveTopic ? "text-blue-500" : "text-gray-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="flex-1">{topic.title}</span>
                  <span className="text-xs text-gray-400">
                    {topic.lessons.length}
                  </span>
                </button>
                {isOpen && (
                  <ul className="mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-4">
                    {topic.lessons.map((lesson) => {
                      const isActive = currentSlug === lesson.slug;
                      return (
                        <li key={lesson.slug}>
                          <Link
                            href={`/tutorial/html/${lesson.slug}`}
                            className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                              isActive
                                ? "bg-blue-50 font-medium text-blue-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {lesson.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
