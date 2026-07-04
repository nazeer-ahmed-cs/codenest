"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  slug: string;
};

export default function MarkCompleteButton({ slug }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }
    fetch("/api/progress/complete")
      .then((r) => r.json())
      .then((data) => {
        setCompleted(data.completedLessons?.includes(slug) ?? false);
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
      const res = await fetch("/api/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        setCompleted(true);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={completed}
      className={
        "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors " +
        (completed
          ? "cursor-default bg-green-100 text-green-700"
          : "bg-gray-900 text-white hover:bg-gray-700")
      }
    >
      {completed ? "Completed ✓" : "Mark as Complete"}
    </button>
  );
}
