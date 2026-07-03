export default function Loading() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-4 size-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-400" />
      <p className="text-sm text-gray-500">Loading…</p>
    </div>
  );
}
