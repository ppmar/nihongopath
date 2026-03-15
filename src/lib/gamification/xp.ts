export const XP_REWARDS = {
  NEW_KANA: 5,
  NEW_KANJI: 15,
  NEW_VOCAB: 10,
  NEW_GRAMMAR: 20,
  CORRECT_REVIEW: 5,
  CORRECT_QUIZ: 10,
  COMBO_5: 25,
  COMBO_10: 50,
  SESSION_COMPLETE: 30,
  DAILY_GOAL: 50,
  STREAK_BONUS_PER_DAY: 10,
  STREAK_BONUS_CAP: 7,
} as const;

export function xpForLevel(level: number): number {
  return (100 * level * (level + 1)) / 2;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function xpProgressInLevel(xp: number): { current: number; required: number; percent: number } {
  const level = levelFromXp(xp);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const current = xp - currentLevelXp;
  const required = nextLevelXp - currentLevelXp;
  const percent = Math.min(100, (current / required) * 100);
  return { current, required, percent };
}

export const LEVEL_TITLES: Record<number, string> = {
  1: "見習い (Apprenti)",
  5: "初心者 (Débutant)",
  10: "学生 (Étudiant)",
  15: "読者 (Lecteur)",
  20: "知識人 (Érudit)",
  25: "達人 (Maître)",
  30: "先生 (Sensei)",
  40: "仙人 (Sage)",
  50: "言語神 (Dieu des Langues)",
};

export function getLevelTitle(level: number): string {
  const thresholds = Object.keys(LEVEL_TITLES)
    .map(Number)
    .sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (level >= threshold) {
      return LEVEL_TITLES[threshold];
    }
  }
  return LEVEL_TITLES[1];
}

export function calculateStreakBonus(streak: number): number {
  return Math.min(streak, XP_REWARDS.STREAK_BONUS_CAP) * XP_REWARDS.STREAK_BONUS_PER_DAY;
}
