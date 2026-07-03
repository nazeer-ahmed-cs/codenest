"use client";

import { useState, useCallback } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

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

export default function TryIt({ html = "", css = "", js = "" }: Props) {
  const [resetKey, setResetKey] = useState(0);
  const files = buildFiles(html, css, js);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="not-prose my-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-2">
        <span className="text-xs font-medium text-gray-500">
          Try it yourself
        </span>
        <button
          onClick={handleReset}
          className="rounded-md px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
        >
          Reset Code
        </button>
      </div>
      <SandpackProvider
        key={resetKey}
        template="static"
        files={files}
        options={{
          visibleFiles: Object.keys(files),
          activeFile: "/index.html",
          classes: {
            "sp-layout": "!rounded-none !border-0 !min-h-[400px]",
            "sp-tabs": "!border-b !border-gray-200",
          },
          initMode: "immediate",
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showTabs
            showLineNumbers
            showInlineErrors
            wrapContent
            closableTabs={false}
          />
          <SandpackPreview
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
