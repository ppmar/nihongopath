"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type GrammarData = {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: { jp: string; reading: string; fr: string }[];
  notes?: string;
  related?: string[];
};

type GrammarPointProps = {
  data: GrammarData;
};

export function GrammarPoint({ data }: GrammarPointProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        expanded ? "border-violet-500/30 bg-card" : "border-border bg-card hover:border-violet-500/20"
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <span className="font-jp text-lg font-semibold">{data.pattern}</span>
          <span className="text-sm text-muted-foreground ml-3">{data.meaning}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              <p className="text-sm text-muted-foreground">{data.explanation}</p>

              <div className="space-y-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Exemples
                </span>
                {data.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-muted/50 space-y-1"
                  >
                    <p className="font-jp text-base">{ex.jp}</p>
                    <p className="font-jp text-sm text-muted-foreground">{ex.reading}</p>
                    <p className="text-sm text-violet-400">{ex.fr}</p>
                  </div>
                ))}
              </div>

              {data.notes && (
                <p className="text-xs text-muted-foreground italic">
                  Note : {data.notes}
                </p>
              )}

              {data.related && data.related.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">Voir aussi :</span>
                  {data.related.map((r) => (
                    <Badge key={r} variant="outline" className="text-xs font-jp">
                      {r}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
