"use client";

import { useGamificationStore } from "@/lib/stores/useGamificationStore";
import { motion } from "framer-motion";

export function XPBar() {
  const { level, getXpProgress, getLevelTitle } = useGamificationStore();
  const { current, required, percent } = getXpProgress();

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Nv.{level}
        </span>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {getLevelTitle()}
        </span>
      </div>
      <div className="flex-1 min-w-[80px] max-w-[200px]">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ boxShadow: "0 0 8px rgba(139, 92, 246, 0.4)" }}
          />
        </div>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">
        {current}/{required} XP
      </span>
    </div>
  );
}
