import Content, { title } from "@/lessons/hello-world.mdx";

export default function LessonPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <article className="prose prose-neutral dark:prose-invert">
        <Content />
      </article>
    </main>
  );
}
