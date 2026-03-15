"use client";

import { toast } from "sonner";
import { getAchievement, RARITY_COLORS } from "@/lib/gamification/achievements";

export function showAchievementToast(achievementId: string) {
  const achievement = getAchievement(achievementId);
  if (!achievement) return;

  const rarityClass = RARITY_COLORS[achievement.rarity];

  toast.custom(
    () => (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl bg-card/90 ${rarityClass}`}
      >
        <span className="text-2xl">{achievement.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{achievement.name}</p>
          <p className="text-xs text-muted-foreground font-jp">
            {achievement.nameJp}
          </p>
        </div>
        <span className="text-xs font-medium capitalize opacity-70">
          {achievement.rarity}
        </span>
      </div>
    ),
    { duration: 4000 }
  );
}
