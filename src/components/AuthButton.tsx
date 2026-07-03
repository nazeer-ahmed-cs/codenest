"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
      >
        Sign out
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="shrink-0 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
    >
      Sign in
    </Link>
  );
}
