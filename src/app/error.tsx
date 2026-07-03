"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <p className="mb-2 text-6xl font-bold text-gray-200">!</p>
      <h1 className="mb-2 text-xl font-semibold">Something went wrong</h1>
      <p className="mb-8 text-sm text-gray-500">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Try again
      </button>
    </div>
  );
}
