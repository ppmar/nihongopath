"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type KanaItem = {
  kana: string;
  romaji: string;
  row: string;
  type: string;
};

type KanaGridProps = {
  data: KanaItem[];
  title: string;
};

const TYPE_LABELS: Record<string, string> = {
  gojuon: "Base",
  dakuten: "Dakuten",
  handakuten: "Handakuten",
  combo: "Combinaisons",
};

export function KanaGrid({ data, title }: KanaGridProps) {
  const [selected, setSelected] = useState<KanaItem | null>(null);
  const [filter, setFilter] = useState("gojuon");

  const types = useMemo(() => {
    const set = new Set(data.map((k) => k.type));
    return Array.from(set);
  }, [data]);

  const filtered = useMemo(
    () => data.filter((k) => k.type === filter),
    [data, filter]
  );

  const rows = useMemo(() => {
    const map = new Map<string, KanaItem[]>();
    for (const k of filtered) {
      const arr = map.get(k.row) || [];
      arr.push(k);
      map.set(k.row, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <span className="text-sm text-muted-foreground">
          {data.length} caractères
        </span>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          {types.map((t) => (
            <TabsTrigger key={t} value={t}>
              {TYPE_LABELS[t] || t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {rows.map(([row, items]) => (
          <div key={row} className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {row}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <motion.button
                  key={item.kana}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelected(selected?.kana === item.kana ? null : item)}
                  className={cn(
                    "relative h-16 w-16 sm:h-18 sm:w-18 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-200",
                    selected?.kana === item.kana
                      ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                      : "border-border bg-card hover:border-violet-500/30"
                  )}
                >
                  <span className="text-xl sm:text-2xl font-jp font-medium">
                    {item.kana}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.romaji}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail overlay */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 lg:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:w-80 z-50"
        >
          <div className="p-6 rounded-xl border border-violet-500/20 bg-card/95 backdrop-blur-xl shadow-xl">
            <div className="text-center space-y-2">
              <span className="text-5xl font-jp">{selected.kana}</span>
              <p className="text-2xl font-semibold">{selected.romaji}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {TYPE_LABELS[selected.type]} · Rangée {selected.row}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
