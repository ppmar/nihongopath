"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { XPBar } from "@/components/layout/XPBar";
import { StreakIndicator } from "@/components/layout/StreakIndicator";
import { SearchBar } from "@/components/common/SearchBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-xl">
          <span className="text-base font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            NihongoPath
          </span>
          <div className="flex items-center gap-4">
            <StreakIndicator />
            <XPBar />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {children}
        </main>

        <BottomNav />
        <SearchBar />
      </div>
    </div>
  );
}
