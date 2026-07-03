import Link from "next/link";

const topics = [
  {
    title: "Getting Started",
    lessons: [
      { title: "Welcome to CodeNest", slug: "welcome" },
      { title: "Setting Up Your Environment", slug: "setup" },
    ],
  },
  {
    title: "JavaScript Fundamentals",
    lessons: [
      { title: "Variables & Data Types", slug: "variables" },
      { title: "Functions & Scope", slug: "functions" },
    ],
  },
  {
    title: "React",
    lessons: [
      { title: "Components & Props", slug: "components" },
      { title: "State & Hooks", slug: "state-hooks" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside>
      <nav>
        <p>Curriculum</p>
        <ul>
          {topics.map((topic) => (
            <li key={topic.title}>
              <p>{topic.title}</p>
              <ul>
                {topic.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link href={`/lessons/${lesson.slug}`}>
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
