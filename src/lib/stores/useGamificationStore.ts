import { create } from "zustand";
import { persist } from "zustand/middleware";
import { levelFromXp, xpProgressInLevel, getLevelTitle, calculateStreakBonus, XP_REWARDS } from "@/lib/gamification/xp";
import { updateStreak, isStreakActive, getStreakTier, type StreakTier } from "@/lib/gamification/streaks";

type GamificationState = {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  totalReviews: number;
  totalCorrect: number;
  kanjiMastered: number;
  vocabMastered: number;
  grammarLearned: number;
  combo: number;
  dailyGoal: number;
  dailyCompleted: number;
  unlockedAchievements: string[];

  // Computed-like
  getLevelTitle: () => string;
  getXpProgress: () => { current: number; required: number; percent: number };
  getStreakTier: () => StreakTier;
  isStreakActive: () => boolean;
  isDailyGoalMet: () => boolean;

  // Actions
  addXp: (amount: number) => { leveledUp: boolean; newLevel: number };
  recordCorrectAnswer: () => void;
  recordIncorrectAnswer: () => void;
  recordActivity: () => void;
  incrementDaily: () => void;
  setDailyGoal: (goal: number) => void;
  setKanjiMastered: (count: number) => void;
  setVocabMastered: (count: number) => void;
  setGrammarLearned: (count: number) => void;
  unlockAchievement: (id: string) => void;
  resetCombo: () => void;
  reset: () => void;
};

const initialState = {
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null as string | null,
  totalReviews: 0,
  totalCorrect: 0,
  kanjiMastered: 0,
  vocabMastered: 0,
  grammarLearned: 0,
  combo: 0,
  dailyGoal: 20,
  dailyCompleted: 0,
  unlockedAchievements: [] as string[],
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      getLevelTitle: () => getLevelTitle(get().level),
      getXpProgress: () => xpProgressInLevel(get().xp),
      getStreakTier: () => getStreakTier(get().currentStreak),
      isStreakActive: () => isStreakActive(get().lastActivityDate),
      isDailyGoalMet: () => get().dailyCompleted >= get().dailyGoal,

      addXp: (amount: number) => {
        const state = get();
        const newXp = state.xp + amount;
        const newLevel = levelFromXp(newXp);
        const leveledUp = newLevel > state.level;
        set({ xp: newXp, level: newLevel });
        return { leveledUp, newLevel };
      },

      recordCorrectAnswer: () => {
        const state = get();
        const newCombo = state.combo + 1;
        let bonusXp = 0;
        if (newCombo === 5) bonusXp = XP_REWARDS.COMBO_5;
        if (newCombo === 10) bonusXp = XP_REWARDS.COMBO_10;
        set({
          totalReviews: state.totalReviews + 1,
          totalCorrect: state.totalCorrect + 1,
          combo: newCombo,
        });
        if (bonusXp > 0) get().addXp(bonusXp);
      },

      recordIncorrectAnswer: () => {
        set((s) => ({
          totalReviews: s.totalReviews + 1,
          combo: 0,
        }));
      },

      recordActivity: () => {
        const state = get();
        const streakResult = updateStreak(
          state.currentStreak,
          state.longestStreak,
          state.lastActivityDate
        );
        const streakBonus = calculateStreakBonus(streakResult.currentStreak);
        set({ ...streakResult });
        if (streakBonus > 0 && streakResult.currentStreak > state.currentStreak) {
          get().addXp(streakBonus);
        }
      },

      incrementDaily: () => {
        const state = get();
        const newCompleted = state.dailyCompleted + 1;
        set({ dailyCompleted: newCompleted });
        if (newCompleted === state.dailyGoal) {
          get().addXp(XP_REWARDS.DAILY_GOAL);
        }
      },

      setDailyGoal: (goal: number) => set({ dailyGoal: goal }),
      setKanjiMastered: (count: number) => set({ kanjiMastered: count }),
      setVocabMastered: (count: number) => set({ vocabMastered: count }),
      setGrammarLearned: (count: number) => set({ grammarLearned: count }),

      unlockAchievement: (id: string) => {
        set((s) => ({
          unlockedAchievements: s.unlockedAchievements.includes(id)
            ? s.unlockedAchievements
            : [...s.unlockedAchievements, id],
        }));
      },

      resetCombo: () => set({ combo: 0 }),

      reset: () => set(initialState),
    }),
    { name: "nihongo-gamification" }
  )
);
