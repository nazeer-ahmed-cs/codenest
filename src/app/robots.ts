import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/lessons"],
      },
    ],
    sitemap: "https://codenest-pink.vercel.app/sitemap.xml",
  };
}
