import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/lessons">Lessons</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <p>&copy; {new Date().getFullYear()} CodeNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
