import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">CodeNest</Link>
        <div>
          <Link href="/lessons">Lessons</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
