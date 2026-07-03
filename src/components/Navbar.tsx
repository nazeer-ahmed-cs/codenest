import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">CodeNest</Link>
        <ul>
          <li>
            <Link href="/tutorial">Tutorial</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
