import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ItemStatus = "new" | "learning" | "reviewing" | "mastered";
export type ItemType = "hiragana" | "katakana" | "kanji" | "vocabulary" | "grammar";
export type JlptLevel = "kana" | "n5" | "n4" | "n3" | "n2" | "n1";

export type ProgressItem = {
  itemType: ItemType;
  itemId: string;
  jlptLevel: JlptLevel;
  status: ItemStatus;
  easeFactor: number;
  intervalDays: number;
  nextReview: string | null;
  reviewCount: number;
  correctCount: number;
  lastReviewed: string | null;
};

type ProgressState = {
  items: Record<string, ProgressItem>;

  // Getters
  getItem: (itemType: ItemType, itemId: string) => ProgressItem | undefined;
  getItemsByType: (itemType: ItemType, jlptLevel?: JlptLevel) => ProgressItem[];
  getItemsDueForReview: () => ProgressItem[];
  getMasteredCount: (itemType: ItemType, jlptLevel?: JlptLevel) => number;
  getLearningCount: (itemType: ItemType, jlptLevel?: JlptLevel) => number;
  getTotalCount: (itemType: ItemType, jlptLevel?: JlptLevel) => number;
  getProgressPercent: (itemType: ItemType, jlptLevel: JlptLevel, totalItems: number) => number;

  // Actions
  upsertItem: (item: ProgressItem) => void;
  updateItemStatus: (itemType: ItemType, itemId: string, status: ItemStatus) => void;
  updateItemSRS: (itemType: ItemType, itemId: string, srs: Pick<ProgressItem, "easeFactor" | "intervalDays" | "nextReview" | "reviewCount" | "correctCount">) => void;
  reset: () => void;
};

function itemKey(itemType: string, itemId: string): string {
  return `${itemType}:${itemId}`;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      items: {},

      getItem: (itemType, itemId) => get().items[itemKey(itemType, itemId)],

      getItemsByType: (itemType, jlptLevel) => {
        return Object.values(get().items).filter(
          (i) => i.itemType === itemType && (!jlptLevel || i.jlptLevel === jlptLevel)
        );
      },

      getItemsDueForReview: () => {
        const now = new Date().toISOString();
        return Object.values(get().items).filter(
          (i) => i.nextReview && i.nextReview <= now && i.status !== "new"
        );
      },

      getMasteredCount: (itemType, jlptLevel) =>
        get().getItemsByType(itemType, jlptLevel).filter((i) => i.status === "mastered").length,

      getLearningCount: (itemType, jlptLevel) =>
        get().getItemsByType(itemType, jlptLevel).filter((i) => i.status !== "new").length,

      getTotalCount: (itemType, jlptLevel) =>
        get().getItemsByType(itemType, jlptLevel).length,

      getProgressPercent: (itemType, jlptLevel, totalItems) => {
        if (totalItems === 0) return 0;
        const mastered = get().getMasteredCount(itemType, jlptLevel);
        return Math.round((mastered / totalItems) * 100);
      },

      upsertItem: (item) =>
        set((s) => ({
          items: { ...s.items, [itemKey(item.itemType, item.itemId)]: item },
        })),

      updateItemStatus: (itemType, itemId, status) => {
        const key = itemKey(itemType, itemId);
        set((s) => {
          const existing = s.items[key];
          if (!existing) return s;
          return { items: { ...s.items, [key]: { ...existing, status } } };
        });
      },

      updateItemSRS: (itemType, itemId, srs) => {
        const key = itemKey(itemType, itemId);
        set((s) => {
          const existing = s.items[key];
          if (!existing) return s;
          return {
            items: {
              ...s.items,
              [key]: { ...existing, ...srs, lastReviewed: new Date().toISOString() },
            },
          };
        });
      },

      reset: () => set({ items: {} }),
    }),
    { name: "nihongo-progress" }
  )
);
