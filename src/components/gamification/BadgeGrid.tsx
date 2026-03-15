"use client";

import { ACHIEVEMENTS, RARITY_COLORS, type Achievement } from "@/lib/gamification/achievements";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type BadgeGridProps = {
  unlockedIds: string[];
  filter?: string;
};

function BadgeCard({ achievement, unlocked }: { achievement: Achievement; unlocked: boolean }) {
  const rarityClass = RARITY_COLORS[achievement.rarity];
  return (
    <motion.div
      whileHover={unlocked ? { scale: 1.05 } : {}}
      className={cn(
        "relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
        unlocked ? rarityClass : "border-border bg-muted/30 opacity-40"
      )}
    >
      <span className={cn("text-3xl", !unlocked && "grayscale")}>{achievement.icon}</span>
      <span className="text-xs font-semibold text-center leading-tight">{achievement.name}</span>
      <span className="text-[10px] text-muted-foreground font-jp">{achievement.nameJp}</span>
      <span className={cn("text-[10px] font-medium capitalize", unlocked ? "opacity-70" : "opacity-40")}>
        {achievement.rarity}
      </span>
    </motion.div>
  );
}

export function BadgeGrid({ unlockedIds, filter }: BadgeGridProps) {
  const unlocked = new Set(unlockedIds);
  const achievements = filter
    ? ACHIEVEMENTS.filter((a) => a.id.includes(filter))
    : ACHIEVEMENTS;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {achievements.map((a) => (
        <BadgeCard key={a.id} achievement={a} unlocked={unlocked.has(a.id)} />
      ))}
    </div>
  );
}
