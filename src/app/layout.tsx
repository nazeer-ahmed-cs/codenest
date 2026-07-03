import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const topicNavItems: TopicNavItem[] = [
  {
    label: "HTML",
    href: `/tutorial/html/${topics.find((t) => t.title === "HTML Basics")?.lessons[0]?.slug ?? ""}`,
  },
  {
    label: "CSS",
    href: `/tutorial/html/${topics.find((t) => t.title === "CSS")?.lessons[0]?.slug ?? ""}`,
  },
  { label: "JavaScript Fundamentals", href: "/tutorial", disabled: true },
  { label: "React", href: "/tutorial", disabled: true },
];

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
        <div className="flex min-h-screen flex-col">
          <Navbar searchItems={searchIndex} topicNavItems={topicNavItems} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
