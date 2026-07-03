import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-8">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to CodeNest</h1>
        <p className="text-lg mb-8">
          An interactive learning platform to build your coding skills,
          one lesson at a time.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/lessons"
            className="rounded-full border border-solid border-transparent bg-foreground text-background px-6 py-3 font-medium"
          >
            Browse Lessons
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-solid border-foreground px-6 py-3 font-medium"
          >
            About CodeNest
          </Link>
        </div>
      </section>
    </div>
  );
}
