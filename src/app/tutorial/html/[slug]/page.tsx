import { notFound } from "next/navigation";
import WelcomeMdx from "@/lessons/welcome.mdx";
import SetupMdx from "@/lessons/setup.mdx";
import VariablesMdx from "@/lessons/variables.mdx";
import FunctionsMdx from "@/lessons/functions.mdx";
import ComponentsMdx from "@/lessons/components.mdx";
import StateHooksMdx from "@/lessons/state-hooks.mdx";

type Props = {
  params: { slug: string };
};

const lessons: Record<
  string,
  {
    title: string;
    Content: typeof WelcomeMdx;
  }
> = {
  welcome: { title: "Welcome to CodeNest", Content: WelcomeMdx },
  setup: { title: "Setting Up Your Environment", Content: SetupMdx },
  "variables": { title: "Variables & Data Types", Content: VariablesMdx },
  "functions": { title: "Functions & Scope", Content: FunctionsMdx },
  "components": { title: "Components & Props", Content: ComponentsMdx },
  "state-hooks": { title: "State & Hooks", Content: StateHooksMdx },
};

export function generateStaticParams() {
  return Object.keys(lessons).map((slug) => ({ slug }));
}

export default function TutorialLessonPage({ params }: Props) {
  const lesson = lessons[params.slug];

  if (!lesson) {
    notFound();
  }

  return (
    <article>
      <h1>{lesson.title}</h1>
      <lesson.Content />
    </article>
  );
}
