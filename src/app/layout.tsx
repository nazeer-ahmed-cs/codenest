import type { Metadata } from "next";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { topics, searchIndex } from "@/lib/curriculum";
import { authOptions } from "@/lib/auth";
import type { TopicNavItem } from "@/components/TopicSwitcher";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://codenest-pink.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "CodeNest",
    template: "%s | CodeNest",
  },
  description: "An interactive learning platform for web development — HTML, CSS, JavaScript, and React.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "CodeNest",
    description: "An interactive learning platform for web development — HTML, CSS, JavaScript, and React.",
    url: siteUrl,
    siteName: "CodeNest",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNest",
    description: "An interactive learning platform for web development — HTML, CSS, JavaScript, and React.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },
};

const topicLabels: Record<string, string> = {
  "Getting Started": "Getting Started",
  "HTML Basics": "HTML",
  CSS: "CSS",
  "JavaScript Fundamentals": "JavaScript",
  React: "React",
  Python: "Python",
  SQL: "SQL",
};

const topicNavItems: TopicNavItem[] = topics
  .filter((t) => t.title !== "Getting Started")
  .map((t) => {
    const first = t.lessons[0];
    return {
      label: topicLabels[t.title] ?? t.title,
      href: first ? `/tutorial/html/${first.slug}` : "/tutorial",
      disabled: !first,
    };
  });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isAdmin =
    !!session?.user?.email && session.user.email === ADMIN_EMAIL;

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Skip to content
            </a>
            <Navbar searchItems={searchIndex} topicNavItems={topicNavItems} isAdmin={isAdmin} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
