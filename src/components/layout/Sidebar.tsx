"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Languages,
  PenTool,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { XPBar } from "./XPBar";
import { StreakIndicator } from "./StreakIndicator";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Accueil", icon: Home },
  { href: "/kana", label: "Kana", icon: Languages },
  { href: "/n5", label: "JLPT N5", icon: BookOpen },
  { href: "/n4", label: "JLPT N4", icon: BookOpen },
  { href: "/n3", label: "JLPT N3", icon: GraduationCap },
  { href: "/n2", label: "JLPT N2", icon: GraduationCap },
  { href: "/n1", label: "JLPT N1", icon: GraduationCap },
  { href: "/profile", label: "Profil", icon: User },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Link href="/dashboard">
                <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  NihongoPath
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* XP + Streak */}
      {!collapsed && (
        <div className="px-4 pb-4 space-y-2">
          <XPBar />
          <StreakIndicator />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-violet-500/15 text-violet-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-violet-400")} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <PenTool className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Révisions : 0 en attente
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
