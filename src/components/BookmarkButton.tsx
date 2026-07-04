"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  slug: string;
};

export default function BookmarkButton({ slug }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }
    fetch("/api/progress/complete")
      .then((r) => r.json())
      .then((data) => {
        setBookmarked(data.bookmarkedLessons?.includes(slug) ?? false);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session, slug]);

  async function handleClick() {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/progress/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        const data = await res.json();
        setBookmarked(data.bookmarked);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-lg p-2.5 transition-colors hover:bg-gray-100 disabled:opacity-50"
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this lesson"}
    >
      <svg
        className={`size-5 ${bookmarked ? "text-yellow-500" : "text-gray-400"}`}
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
