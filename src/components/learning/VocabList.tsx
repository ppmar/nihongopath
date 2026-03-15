"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

type VocabItem = {
  word: string;
  reading: string;
  meaning: string;
  pos: string;
  jlpt: string;
  tags?: string[];
};

type VocabListProps = {
  data: VocabItem[];
  showFurigana?: boolean;
};

const POS_LABELS: Record<string, string> = {
  noun: "Nom",
  "verb-godan": "V. Godan",
  "verb-ichidan": "V. Ichidan",
  "verb-irregular": "V. Irrég.",
  "i-adjective": "Adj-i",
  "na-adjective": "Adj-na",
  adverb: "Adv.",
  particle: "Part.",
  counter: "Compteur",
  expression: "Expr.",
  pronoun: "Pron.",
  conjunction: "Conj.",
};

export function VocabList({ data, showFurigana = true }: VocabListProps) {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState<string | null>(null);

  const posTypes = useMemo(() => {
    const set = new Set(data.map((v) => v.pos));
    return Array.from(set);
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((v) => {
      const matchSearch =
        !search ||
        v.word.includes(search) ||
        v.reading.includes(search) ||
        v.meaning.toLowerCase().includes(search.toLowerCase());
      const matchPos = !posFilter || v.pos === posFilter;
      return matchSearch && matchPos;
    });
  }, [data, search, posFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un mot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={posFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setPosFilter(null)}
          >
            Tous ({data.length})
          </Badge>
          {posTypes.map((pos) => (
            <Badge
              key={pos}
              variant={posFilter === pos ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setPosFilter(posFilter === pos ? null : pos)}
            >
              {POS_LABELS[pos] || pos}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
      </div>

      <div className="space-y-1">
        {filtered.slice(0, 100).map((vocab, idx) => (
          <div
            key={`${vocab.word}-${idx}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="min-w-[80px]">
              <span className="text-lg font-jp font-medium">{vocab.word}</span>
            </div>
            {showFurigana && vocab.reading !== vocab.word && (
              <span className="text-sm font-jp text-muted-foreground min-w-[80px]">
                {vocab.reading}
              </span>
            )}
            <span className="flex-1 text-sm">{vocab.meaning}</span>
            <Badge variant="outline" className="text-xs shrink-0">
              {POS_LABELS[vocab.pos] || vocab.pos}
            </Badge>
          </div>
        ))}
        {filtered.length > 100 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            ... et {filtered.length - 100} autres résultats
          </p>
        )}
      </div>
    </div>
  );
}
