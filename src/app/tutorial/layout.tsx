import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function TutorialLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-w-0 flex-1 px-4 pb-8 pt-16 sm:px-6 lg:p-6">
        {children}
      </div>
    </div>
  );
}
