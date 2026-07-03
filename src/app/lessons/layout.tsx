import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function LessonsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
