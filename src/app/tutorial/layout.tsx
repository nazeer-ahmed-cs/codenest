import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function TutorialLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
