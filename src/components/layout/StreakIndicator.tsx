"use client";

import { useGamificationStore } from "@/lib/stores/useGamificationStore";
import { STREAK_COLORS } from "@/lib/gamification/streaks";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function StreakIndicator() {
  const { currentStreak, getStreakTier, isStreakActive } = useGamificationStore();
  const tier = getStreakTier();
  const active = isStreakActive();

  if (currentStreak === 0 && !active) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Flame className="h-4 w-4" />
        <span className="text-xs font-medium">0</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`flex items-center gap-1.5 ${STREAK_COLORS[tier]}`}
      animate={
        active
          ? {
              scale: [1, 1.1, 1],
            }
          : {}
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Flame className="h-4 w-4" />
      <span className="text-xs font-bold">{currentStreak}</span>
    </motion.div>
  );
}
