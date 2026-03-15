"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Languages, BookOpen, PenTool, GraduationCap, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchItem = {
  label: string;
  labelJp?: string;
  href: string;
  icon: typeof Search;
  category: string;
};

const SEARCH_ITEMS: SearchItem[] = [
  { label: "Accueil", href: "/dashboard", icon: Home, category: "Navigation" },
  { label: "Profil", href: "/profile", icon: User, category: "Navigation" },
  { label: "Hiragana", labelJp: "ひらがな", href: "/kana/hiragana", icon: Languages, category: "Kana" },
  { label: "Katakana", labelJp: "カタカナ", href: "/kana/katakana", icon: Languages, category: "Kana" },
  { label: "Kanji N5", labelJp: "漢字", href: "/n5/kanji", icon: BookOpen, category: "JLPT N5" },
  { label: "Vocabulaire N5", labelJp: "語彙", href: "/n5/vocabulary", icon: BookOpen, category: "JLPT N5" },
  { label: "Grammaire N5", labelJp: "文法", href: "/n5/grammar", icon: PenTool, category: "JLPT N5" },
  { label: "Quiz N5", labelJp: "練習", href: "/n5/practice", icon: GraduationCap, category: "JLPT N5" },
  { label: "Kanji N4", href: "/n4/kanji", icon: BookOpen, category: "JLPT N4" },
  { label: "Vocabulaire N4", href: "/n4/vocabulary", icon: BookOpen, category: "JLPT N4" },
  { label: "Grammaire N4", href: "/n4/grammar", icon: PenTool, category: "JLPT N4" },
  { label: "Quiz N4", href: "/n4/practice", icon: GraduationCap, category: "JLPT N4" },
  { label: "Kanji N3", href: "/n3/kanji", icon: BookOpen, category: "JLPT N3" },
  { label: "Vocabulaire N3", href: "/n3/vocabulary", icon: BookOpen, category: "JLPT N3" },
  { label: "Grammaire N3", href: "/n3/grammar", icon: PenTool, category: "JLPT N3" },
  { label: "Kanji N2", href: "/n2/kanji", icon: BookOpen, category: "JLPT N2" },
  { label: "Vocabulaire N2", href: "/n2/vocabulary", icon: BookOpen, category: "JLPT N2" },
  { label: "Kanji N1", href: "/n1/kanji", icon: BookOpen, category: "JLPT N1" },
  { label: "Vocabulaire N1", href: "/n1/vocabulary", icon: BookOpen, category: "JLPT N1" },
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return SEARCH_ITEMS;
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.labelJp?.includes(query) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of filtered) {
      const arr = map.get(item.category) || [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].href);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 border-border bg-card/95 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Rechercher..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 px-0 h-12"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucun résultat
            </p>
          ) : (
            grouped.map(([category, items]) => (
              <div key={category}>
                <p className="px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  {category}
                </p>
                {items.map((item) => {
                  const globalIdx = filtered.indexOf(item);
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                        globalIdx === selectedIndex
                          ? "bg-violet-500/10 text-violet-400"
                          : "text-foreground hover:bg-accent/50"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.labelJp && (
                        <span className="text-xs text-muted-foreground font-jp">
                          {item.labelJp}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
