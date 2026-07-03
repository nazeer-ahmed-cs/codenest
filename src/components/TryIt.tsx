"use client";

import { useState, useCallback, lazy, Suspense } from "react";

const SandpackEditor = lazy(() => import("@/components/SandpackEditor"));

type Props = {
  html?: string;
  css?: string;
  js?: string;
};

function buildFiles(html: string, css: string, js: string) {
  const files: Record<string, string> = {
    "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Playground</title>
  ${css ? '<link rel="stylesheet" href="/styles.css" />' : ""}
</head>
<body>
${html}
  ${js ? '<script src="/script.js"></script>' : ""}
</body>
</html>`,
  };

  if (css) files["/styles.css"] = css;
  if (js) files["/script.js"] = js;

  return files;
}

function TryItHeader({
  onReset,
  files,
}: {
  onReset: () => void;
  files: Record<string, string>;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const allCode = Object.entries(files)
      .map(([name, code]) => `// ${name}\n${code}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(allCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [files]);

  return (
    <div className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-2">
      <span className="text-xs font-medium text-gray-500">
        Try it yourself
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="rounded-md px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <button
          onClick={onReset}
          className="rounded-md px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
        >
          Reset Code
        </button>
      </div>
    </div>
  );
}

export default function TryIt({ html = "", css = "", js = "" }: Props) {
  const [resetKey, setResetKey] = useState(0);
  const files = buildFiles(html, css, js);
  const visibleFiles = Object.keys(files);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="not-prose my-6 rounded-xl border border-gray-200">
      <TryItHeader onReset={handleReset} files={files} />
      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center rounded-b-xl bg-gray-50 text-sm text-gray-400">
            Loading editor…
          </div>
        }
      >
        <SandpackEditor
          key={resetKey}
          files={files}
          visibleFiles={visibleFiles}
          activeFile="/index.html"
        />
      </Suspense>
    </div>
  );
}
