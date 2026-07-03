import Link from "next/link";

type Props = {
  params: { slug: string };
};

const lessonTitles: Record<string, string> = {
  welcome: "Welcome to CodeNest",
  setup: "Setting Up Your Environment",
  variables: "Variables & Data Types",
  functions: "Functions & Scope",
  components: "Components & Props",
  "state-hooks": "State & Hooks",
};

export default function LessonPage({ params }: Props) {
  const title = lessonTitles[params.slug] ?? "Lesson not found";

  return (
    <div>
      <Link href="/lessons">&larr; Back to lessons</Link>
      <h1>{title}</h1>
      <p>This lesson is under construction.</p>
    </div>
  );
}
