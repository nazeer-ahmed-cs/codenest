import Link from "next/link";

const topicLabels: Record<string, string> = {
  "Getting Started": "Getting Started",
  "HTML Basics": "HTML",
  CSS: "CSS",
  "JavaScript Fundamentals": "JavaScript",
  React: "React",
};

type Props = {
  topic: string;
  title: string;
};

export default function Breadcrumbs({ topic, title }: Props) {
  const label = topicLabels[topic] ?? topic;

  return (
    <nav aria-label="Breadcrumb" className="mb-2">
      <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-gray-600"
          >
            Home
          </Link>
        </li>
        <li className="text-gray-300" aria-hidden="true">
          /
        </li>
        <li>
          <Link
            href="/tutorial"
            className="transition-colors hover:text-gray-600"
          >
            {label}
          </Link>
        </li>
        <li className="text-gray-300" aria-hidden="true">
          /
        </li>
        <li className="text-gray-600" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
