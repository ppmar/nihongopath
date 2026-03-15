"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Languages, BookOpen, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Accueil", icon: Home },
  { href: "/kana", label: "Kana", icon: Languages },
  { href: "/n5", label: "N5", icon: BookOpen },
  { href: "/profile", label: "Stats", icon: BarChart3 },
  { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item, idx) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={`${item.href}-${idx}`}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] py-1 px-2 rounded-lg transition-all duration-200",
                isActive
                  ? "text-violet-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-1 h-0.5 w-6 rounded-full bg-violet-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
