import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { topics, searchIndex } from "@/lib/curriculum";
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

export const metadata: Metadata = {
  title: "CodeNest",
  description: "An interactive learning platform",
};

const topicLabels: Record<string, string> = {
  "Getting Started": "Getting Started",
  "HTML Basics": "HTML",
  CSS: "CSS",
  "JavaScript Fundamentals": "JavaScript",
  React: "React",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar searchItems={searchIndex} topicNavItems={topicNavItems} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
