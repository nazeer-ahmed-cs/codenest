import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function TutorialLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
