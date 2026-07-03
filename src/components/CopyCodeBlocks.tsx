"use client";

import { useEffect, useRef } from "react";

export default function CopyCodeBlocks({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const pres = containerRef.current.querySelectorAll<HTMLPreElement>("pre");

    const buttons: HTMLButtonElement[] = [];

    pres.forEach((pre) => {
      if (pre.querySelector('[data-copy-btn]')) return;

      pre.classList.add("group");
      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.dataset.copyBtn = "";
      btn.className =
        "copy-btn invisible group-hover:visible absolute top-2 right-2 z-10 rounded-md px-2 py-1 text-xs font-medium text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-600/80 transition-colors";
      btn.textContent = "Copy";

      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const code = pre.querySelector("code")?.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 2000);
        } catch {
          btn.textContent = "Failed";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 2000);
        }
      });

      pre.appendChild(btn);
      buttons.push(btn);
    });

    return () => {
      buttons.forEach((btn) => btn.remove());
    };
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
}
