import { MetadataRoute } from "next";
import { allSlugs } from "@/lib/curriculum";
import { quizMap } from "@/lib/quizzes";

const siteUrl = "https://codenest-pink.vercel.app";

const staticPages: { path: string; priority?: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/tutorial", priority: 0.9 },
  { path: "/certificate", priority: 0.8 },
  { path: "/reference", priority: 0.7 },
  { path: "/playground", priority: 0.6 },
  { path: "/login" },
  { path: "/signup" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.path === "" ? "weekly" as const : "monthly" as const,
    priority: p.priority ?? 0.5,
  }));

  const lessonEntries: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${siteUrl}/tutorial/html/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const quizEntries: MetadataRoute.Sitemap = Object.keys(quizMap).map((topicId) => ({
    url: `${siteUrl}/quiz/${encodeURIComponent(topicId)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...lessonEntries, ...quizEntries];
}
