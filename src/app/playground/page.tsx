"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const files = {
  "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Playground</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1>Hello, CodeNest!</h1>
  <p>Edit this code and see the result live.</p>
  <button id="clickme">Click me</button>
  <script src="/script.js"></script>
</body>
</html>`,
  "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
}

h1 {
  color: #2563eb;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #2563eb;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}`,
  "/script.js": `const btn = document.getElementById("clickme");
btn.addEventListener("click", () => {
  alert("Hello from CodeNest!");
});
`,
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-b border-gray-200 px-4 py-3 sm:px-6">
        <h1 className="text-lg font-semibold">Playground</h1>
        <p className="text-sm text-gray-500">
          Edit the HTML, CSS, and JS files — preview updates live.
        </p>
      </div>
      <div className="flex-1">
        <SandpackProvider
          template="static"
          files={files}
          options={{
            visibleFiles: ["/index.html", "/styles.css", "/script.js"],
            activeFile: "/index.html",
            classes: {
              "sp-wrapper": "h-full",
              "sp-layout": "h-full",
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
              showRunButton={false}
            />
            <SandpackPreview
              showRefreshButton={false}
              showOpenInCodeSandbox={false}
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
