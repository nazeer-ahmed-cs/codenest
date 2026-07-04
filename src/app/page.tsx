import Link from "next/link";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <section className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to CodeNest
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          An interactive learning platform to build your coding skills,
          one lesson at a time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/tutorial"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Browse Lessons
          </Link>
          <Link
            href="/reference"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
          >
            Reference
          </Link>
        </div>
      </section>
    </Container>
  );
}
