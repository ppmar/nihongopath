"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type KanjiData = {
  kanji: string;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  examples: { word: string; reading: string; meaning: string }[];
  radical: string;
  mnemonique: string;
};

type KanjiCardProps = {
  data: KanjiData;
  showReadings?: boolean;
};

export function KanjiCard({ data, showReadings = true }: KanjiCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective-1000"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={cn(
            "p-6 rounded-xl border border-border bg-card hover:border-violet-500/30 transition-colors",
            flipped && "invisible"
          )}
        >
          <div className="text-center space-y-3">
            <span className="text-6xl font-jp">{data.kanji}</span>
            <p className="text-lg font-semibold">{data.meanings.join(", ")}</p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>{data.strokes} traits</span>
              <span>Radical : {data.radical}</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 p-6 rounded-xl border border-violet-500/20 bg-card",
            !flipped && "invisible"
          )}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-jp">{data.kanji}</span>
            </div>

            {showReadings && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Onyomi</span>
                  <span className="font-jp">{data.onyomi.join("、")}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Kunyomi</span>
                  <span className="font-jp">{data.kunyomi.join("、")}</span>
                </div>
              </div>
            )}

            <div>
              <span className="text-xs text-muted-foreground block mb-2">Exemples</span>
              <div className="space-y-2">
                {data.examples.map((ex) => (
                  <div key={ex.word} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-jp font-medium">{ex.word}</span>
                      <span className="text-muted-foreground ml-2 font-jp text-xs">{ex.reading}</span>
                    </div>
                    <span className="text-muted-foreground">{ex.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">{data.mnemonique}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
