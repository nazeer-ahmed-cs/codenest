import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/tutorial"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Tutorial
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/nazeer-ahmed-cs/codenest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CodeNest
        </p>
      </div>
    </footer>
  );
}
