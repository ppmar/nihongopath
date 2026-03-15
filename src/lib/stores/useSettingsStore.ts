import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsState = {
  showFurigana: boolean;
  showRomaji: boolean;
  dailyGoal: 10 | 20 | 30 | 50;
  soundEnabled: boolean;
  animationsEnabled: boolean;

  toggleFurigana: () => void;
  toggleRomaji: () => void;
  setDailyGoal: (goal: 10 | 20 | 30 | 50) => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      showFurigana: true,
      showRomaji: true,
      dailyGoal: 20,
      soundEnabled: true,
      animationsEnabled: true,

      toggleFurigana: () => set((s) => ({ showFurigana: !s.showFurigana })),
      toggleRomaji: () => set((s) => ({ showRomaji: !s.showRomaji })),
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleAnimations: () => set((s) => ({ animationsEnabled: !s.animationsEnabled })),
    }),
    { name: "nihongo-settings" }
  )
);
