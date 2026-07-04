"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

type Props = {
  slug: string;
};

export default function TrackVisit({ slug }: Props) {
  const { data: session } = useSession();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    if (!session?.user) return;
    fetch("/api/progress/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [session, slug]);

  return null;
}
