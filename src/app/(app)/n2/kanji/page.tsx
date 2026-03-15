"use client";
import { useState } from "react";
import { KanjiCard } from "@/components/learning/KanjiCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import kanjiData from "@/data/n2/kanji.json";

export default function N2KanjiPage() {
  const [search, setSearch] = useState("");
  const filtered = kanjiData.filter((k) => !search || k.kanji.includes(search) || k.meanings.some((m: string) => m.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kanji N2 <span className="text-muted-foreground font-normal text-lg">漢字</span></h1>
          <p className="text-sm text-muted-foreground mt-1">{kanjiData.length} kanji</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Chercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((kanji) => (<KanjiCard key={kanji.kanji} data={kanji} />))}
      </div>
    </div>
  );
}
