"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { htmlTags } from "@/data/html-tags";
import { cssProperties } from "@/data/css-properties";

type Tab = "html" | "css";

const htmlCategories = Array.from(new Set(htmlTags.map((t) => t.category)));
const cssCategories = Array.from(new Set(cssProperties.map((t) => t.category)));

function CssPreview({ css }: { css: string }) {
  return (
    <div className="pointer-events-none absolute -top-2 left-1/2 z-50 w-64 -translate-x-1/2 -translate-y-full">
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
        <div className="mb-2 rounded-md bg-gray-50 p-2">
          <code className="block whitespace-pre-wrap text-[11px] leading-relaxed text-gray-600">
            {css}
          </code>
        </div>
        <div className="flex items-center justify-center" style={{ minHeight: 60 }}>
          <div style={{ all: "initial" }}>
            <div style={{ ...Object.fromEntries(css.split(";").filter(Boolean).map((s) => {
              const [prop, ...rest] = s.trim().split(":");
              return [prop.trim(), rest.join(":").trim()];
            })), fontFamily: "system-ui, sans-serif", fontSize: "14px" }}>
              Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReferencePage() {
  const [tab, setTab] = useState<Tab>("html");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [hoveredProp, setHoveredProp] = useState<string | null>(null);

  const filteredHtml = useMemo(() => {
    const q = search.toLowerCase().trim();
    return htmlTags.filter((t) => {
      const matchesSearch =
        !q ||
        t.tag.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchesCategory = !category || t.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const filteredCss = useMemo(() => {
    const q = search.toLowerCase().trim();
    return cssProperties.filter((t) => {
      const matchesSearch =
        !q ||
        t.property.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchesCategory = !category || t.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const currentCategories = tab === "html" ? htmlCategories : cssCategories;
  const filtered = tab === "html" ? filteredHtml : filteredCss;
  const total = tab === "html" ? htmlTags.length : cssProperties.length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Reference</h1>
      <p className="mb-8 text-gray-500">
        A searchable reference of HTML elements and CSS properties.
        <span className="ml-2 text-sm text-gray-400">
          {filtered.length} of {total} shown
        </span>
      </p>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1 sm:inline-flex">
        <button
          onClick={() => { setTab("html"); setCategory(""); setSearch(""); }}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "html"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          HTML Tags
        </button>
        <button
          onClick={() => { setTab("css"); setCategory(""); setSearch(""); }}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "css"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          CSS Properties
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            placeholder={tab === "html" ? "Search tags..." : "Search properties..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategory("")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !category
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {currentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        {tab === "html" ? (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Tag</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Category</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Attributes</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHtml.map((t) => (
                <tr key={t.tag + t.category} className="transition-colors hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-semibold text-blue-700">
                      &lt;{t.tag}&gt;
                    </code>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{t.description}</td>
                  <td className="hidden whitespace-nowrap px-4 py-3 md:table-cell">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{t.category}</span>
                  </td>
                  <td className="hidden max-w-[200px] truncate px-4 py-3 text-gray-500 lg:table-cell">
                    {t.attributes || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {t.lesson ? (
                      <Link href={`/tutorial/html/${t.lesson}`} className="text-xs font-medium text-blue-600 hover:text-blue-800">
                        Lesson &rarr;
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Property</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Category</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Values</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCss.map((p) => (
                <tr
                  key={p.property + p.category}
                  className="relative transition-colors hover:bg-gray-50"
                  onMouseEnter={() => setHoveredProp(p.preview ? p.property : null)}
                  onMouseLeave={() => setHoveredProp(null)}
                >
                  <td className="whitespace-nowrap px-4 py-3">
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-semibold text-purple-700">
                      {p.property}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{p.description}</td>
                  <td className="hidden whitespace-nowrap px-4 py-3 md:table-cell">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{p.category}</span>
                  </td>
                  <td className="hidden max-w-[240px] truncate px-4 py-3 text-gray-500 lg:table-cell">
                    {p.values || p.syntax || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {p.preview && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-purple-400">
                          Hover
                        </span>
                      )}
                      {p.lesson ? (
                        <Link href={`/tutorial/html/${p.lesson}`} className="text-xs font-medium text-blue-600 hover:text-blue-800">
                          Lesson &rarr;
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </div>
                  </td>
                  {p.preview && hoveredProp === p.property && (
                    <td colSpan={5} className="absolute inset-x-0 top-0 z-40 px-4">
                      <CssPreview css={p.preview} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">No results match your search.</p>
            <button
              onClick={() => { setSearch(""); setCategory(""); }}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
