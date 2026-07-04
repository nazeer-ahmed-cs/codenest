import Link from "next/link";
import Container from "@/components/Container";
import { topics, allSlugs } from "@/lib/curriculum";
import { quizzes } from "@/lib/quizzes";

const siteUrl = "https://codenest-pink.vercel.app";

const totalLessons = allSlugs.filter((s) => s !== "hello-world").length;
const totalQuizzes = quizzes.reduce((sum, q) => sum + q.questions.length, 0);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CodeNest",
  url: siteUrl,
  description: "An interactive learning platform to build your coding skills, one lesson at a time.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const topicInfo: Record<string, { description: string; color: string }> = {
  "Getting Started": {
    description: "Set up your environment and learn the fundamentals of web development.",
    color: "from-gray-500 to-gray-600",
  },
  "HTML Basics": {
    description: "Structure web pages with semantic HTML — headings, forms, tables, multimedia, and more.",
    color: "from-orange-500 to-orange-600",
  },
  CSS: {
    description: "Style your sites with layouts, colors, animations, and responsive design.",
    color: "from-blue-500 to-blue-600",
  },
  "JavaScript Fundamentals": {
    description: "Bring pages to life with variables, functions, DOM manipulation, events, and more.",
    color: "from-yellow-500 to-yellow-600",
  },
  React: {
    description: "Build modern UIs with components, state, hooks, and the React ecosystem.",
    color: "from-cyan-500 to-cyan-600",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <Container className="relative px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Learn Web Development,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                One Lesson at a Time
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
              Interactive HTML, CSS, JavaScript, and React tutorials with live code editors,
              topic quizzes, and a certification exam — all free and open source.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tutorial"
                prefetch={false}
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
              >
                Start Learning
              </Link>
              <Link
                href="/quiz/JavaScript"
                prefetch={false}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                Take a JavaScript Quiz
              </Link>
              <Link
                href="/reference"
                prefetch={false}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                Reference
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white">
        <Container className="py-8">
          <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900 sm:text-3xl">{totalLessons}</p>
              <p className="mt-1 text-sm text-gray-500">Lessons</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 sm:text-3xl">{topics.length}</p>
              <p className="mt-1 text-sm text-gray-500">Topics</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 sm:text-3xl">{totalQuizzes}</p>
              <p className="mt-1 text-sm text-gray-500">Quiz Questions</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Topic Cards */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            What You&apos;ll Learn
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
            A structured path from zero to building real web projects.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics
              .filter((t) => t.title !== "Getting Started")
              .map((topic) => {
                const info = topicInfo[topic.title];
                const first = topic.lessons[0];
                return (
                  <Link
                    key={topic.title}
                    href={first ? `/tutorial/html/${first.slug}` : "/tutorial"}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${info?.color ?? "from-gray-400 to-gray-500"}`}
                    />
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {info?.description}
                    </p>
                    <p className="mt-4 text-xs font-medium text-gray-400">
                      {topic.lessons.length} lesson{topic.lessons.length !== 1 ? "s" : ""}
                    </p>
                  </Link>
                );
              })}
          </div>
        </Container>
      </section>

      {/* Why CodeNest */}
      <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Why CodeNest?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-lg">
                &#9000;
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Interactive to the Core</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Every lesson includes a live code editor powered by Sandpack. Edit code and see results instantly — no setup required.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-100 text-lg">
                &#128736;
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Structured Path</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                A curated curriculum that builds on itself. Start with HTML, move to CSS, then JavaScript and React — each lesson prepares you for the next.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-purple-100 text-lg">
                &#127942;
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Earn a Certificate</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Pass the 30-minute certification exam with 70% or higher to earn a verifiable certificate you can share with employers.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100 text-lg">
                &#128214;
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Learn by Doing</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Each topic ends with a quiz to reinforce your knowledge. Hands-on exercises and real code examples, not just theory.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Ready to Start Coding?
            </h2>
            <p className="mt-3 text-gray-500">
              Jump straight into the first lesson — no account needed.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tutorial/html/welcome"
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
              >
                Start with Lesson 1
              </Link>
              <Link
                href="/tutorial"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                Browse All Lessons
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
