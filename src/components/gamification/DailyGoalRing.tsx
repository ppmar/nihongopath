"use client";

import { useGamificationStore } from "@/lib/stores/useGamificationStore";
import { ProgressRing } from "@/components/common/ProgressRing";
import { Target } from "lucide-react";

export function DailyGoalRing() {
  const { dailyGoal, dailyCompleted, isDailyGoalMet } = useGamificationStore();
  const percent = Math.min(100, (dailyCompleted / dailyGoal) * 100);
  const met = isDailyGoalMet();

  return (
    <div className="flex flex-col items-center gap-3">
      <ProgressRing
        percent={percent}
        size={120}
        strokeWidth={8}
        color={met ? "stroke-amber-400" : "stroke-violet-500"}
      >
        <div className="flex flex-col items-center">
          {met ? (
            <Target className="h-6 w-6 text-amber-400" />
          ) : (
            <span className="text-2xl font-bold">{dailyCompleted}</span>
          )}
          <span className="text-xs text-muted-foreground">
            {met ? "Atteint !" : `/ ${dailyGoal}`}
          </span>
        </div>
      </ProgressRing>
      <span className="text-sm font-medium text-muted-foreground">
        Objectif quotidien
      </span>
    </div>
  );
}
