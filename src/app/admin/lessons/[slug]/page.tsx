"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TOPICS = [
  "Getting Started",
  "HTML Basics",
  "CSS",
  "JavaScript Fundamentals",
  "React",
];

type LessonData = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  content: string;
  isPublished: boolean;
  order: number;
};

export default function LessonEditorPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const isNew = params.slug === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState<LessonData>({
    slug: "",
    title: "",
    description: "",
    topic: "HTML Basics",
    content: "",
    isPublished: false,
    order: 0,
  });

  useEffect(() => {
    if (isNew) return;

    async function load() {
      try {
        const res = await fetch(`/api/admin/lessons/${params.slug}`);
        if (!res.ok) throw new Error("Failed to load lesson");
        const data: LessonData = await res.json();
        setForm(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load lesson");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.slug, isNew]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setSaving(true);

      try {
        const url = isNew ? "/api/admin/lessons" : `/api/admin/lessons/${params.slug}`;
        const method = isNew ? "POST" : "PUT";

        const body: Record<string, unknown> = { ...form };
        if (isNew) {
          delete (body as Record<string, unknown>).order;
          delete (body as Record<string, unknown>).isPublished;
        }

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to save lesson");
        }

        setSuccess("Lesson saved successfully!");

        if (isNew) {
          const data = await res.json();
          router.push(`/admin/lessons/${data.slug}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save lesson");
      } finally {
        setSaving(false);
      }
    },
    [form, isNew, params.slug, router]
  );

  const handleDelete = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this lesson? This cannot be undone.")) {
      return;
    }

    setError("");
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/lessons/${params.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete lesson");
      }

      router.push("/admin/lessons");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete lesson");
    } finally {
      setDeleting(false);
    }
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-gray-400">Loading lesson…</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/lessons"
            className="mb-1 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to lessons
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {isNew ? "New Lesson" : `Edit: ${form.title}`}
          </h1>
        </div>

        {!isNew && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Introduction to HTML"
              />
            </div>

            <div>
              <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-gray-700">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                value={form.slug}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="intro-to-html"
                disabled={!isNew}
              />
              {!isNew && (
                <p className="mt-1 text-xs text-gray-400">
                  Slug cannot be changed after creation.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Learn the basics of HTML markup"
            />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-gray-700">
                Topic *
              </label>
              <select
                id="topic"
                name="topic"
                required
                value={form.topic}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Published
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-gray-700">
            Lesson Content (Markdown)
          </label>
          <p className="mb-3 text-xs text-gray-400">
            Write the lesson content in Markdown. This will be rendered as the lesson body.
          </p>
          <textarea
            id="content"
            name="content"
            rows={20}
            value={form.content}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="# Lesson Title

Write your lesson content here in Markdown..."
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">
            {!isNew && (
              <span>
                Order: <strong className="text-gray-700">{form.order}</strong>
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/lessons"
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : isNew ? "Create Lesson" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
