function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

function daysBetween(a: string, b: string): number {
  const dateA = new Date(a + "T00:00:00");
  const dateB = new Date(b + "T00:00:00");
  return Math.round((dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24));
}

export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: string | null
): { currentStreak: number; longestStreak: number; lastActivityDate: string } {
  const today = toDateString(new Date());

  if (lastActivityDate === today) {
    return { currentStreak, longestStreak, lastActivityDate: today };
  }

  if (lastActivityDate && daysBetween(lastActivityDate, today) === 1) {
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      lastActivityDate: today,
    };
  }

  return {
    currentStreak: 1,
    longestStreak: Math.max(longestStreak, 1),
    lastActivityDate: today,
  };
}

export function isStreakActive(lastActivityDate: string | null): boolean {
  if (!lastActivityDate) return false;
  const today = toDateString(new Date());
  const diff = daysBetween(lastActivityDate, today);
  return diff <= 1;
}

export type StreakTier = "none" | "orange" | "blue" | "violet" | "gold";

export function getStreakTier(streak: number): StreakTier {
  if (streak <= 0) return "none";
  if (streak < 7) return "orange";
  if (streak < 30) return "blue";
  if (streak < 100) return "violet";
  return "gold";
}

export const STREAK_COLORS: Record<StreakTier, string> = {
  none: "text-muted-foreground",
  orange: "text-orange-500",
  blue: "text-blue-500",
  violet: "text-violet-500",
  gold: "text-amber-400",
};
