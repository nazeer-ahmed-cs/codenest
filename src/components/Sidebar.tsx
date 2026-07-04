"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { topics } from "@/lib/curriculum";

export default function Sidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();
  const { data: session } = useSession();

  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!session?.user) {
      setCompleted(new Set());
      setBookmarked(new Set());
      return;
    }
    fetch("/api/progress/complete")
      .then((r) => r.json())
      .then((data) => {
        setCompleted(new Set(data.completedLessons ?? []));
        setBookmarked(new Set(data.bookmarkedLessons ?? []));
      })
      .catch(() => {});
  }, [session, pathname]);

  const activeTopic = topics.find((t) =>
    t.lessons.some((l) => l.slug === currentSlug)
  );

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (activeTopic) return new Set([activeTopic.title]);
    return new Set(topics.map((t) => t.title));
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (activeTopic) {
      setExpanded((prev) => {
        if (prev.has(activeTopic.title)) return prev;
        return new Set([...Array.from(prev), activeTopic.title]);
      });
    }
  }, [activeTopic]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggle = (title: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const sidebarContent = (
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
                  } ${
                    isActiveTopic ? "text-blue-500" : "text-gray-400"
                  }`}
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
                          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                            isActive
                              ? "bg-blue-50 font-medium text-blue-700"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {completed.has(lesson.slug) && (
                            <svg className="size-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {bookmarked.has(lesson.slug) && (
                            <svg className="size-3.5 shrink-0 text-yellow-500" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          )}
                          <span className="flex-1">{lesson.title}</span>
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
  );

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-16 z-20 rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-colors hover:bg-gray-50 lg:hidden"
        aria-label="Open sidebar"
      >
        <svg className="size-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-gray-200 bg-white shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-gray-200 lg:bg-white">
        {sidebarContent}
      </aside>
    </>
  );
}
