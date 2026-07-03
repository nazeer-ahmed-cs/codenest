"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

type Props = {
  files: Record<string, string>;
  visibleFiles: string[];
  activeFile: string;
};

export default function SandpackEditor({ files, visibleFiles, activeFile }: Props) {
  return (
    <SandpackProvider
      template="static"
      files={files}
      options={{
        visibleFiles,
        activeFile,
        classes: {
          "sp-layout": "!rounded-none !border-0 !min-h-[400px] !flex-col lg:!flex-row",
          "sp-tabs": "!border-b !border-gray-200",
          "sp-tab-button": "!text-sm",
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
  );
}
