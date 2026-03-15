export type SRSCard = {
  ease_factor: number;
  interval_days: number;
  review_count: number;
  next_review: Date;
};

export type SRSQuality = 0 | 1 | 2 | 3 | 4 | 5;

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function updateSRS(
  card: Pick<SRSCard, "ease_factor" | "interval_days" | "review_count">,
  quality: SRSQuality
): SRSCard {
  const newEase = Math.max(
    1.3,
    card.ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  let newInterval: number;
  if (quality < 3) {
    newInterval = 1;
  } else if (card.review_count === 0) {
    newInterval = 1;
  } else if (card.review_count === 1) {
    newInterval = 3;
  } else {
    newInterval = Math.round(card.interval_days * newEase);
  }

  return {
    ease_factor: newEase,
    interval_days: newInterval,
    review_count: quality >= 3 ? card.review_count + 1 : 0,
    next_review: addDays(new Date(), newInterval),
  };
}

export function qualityFromCorrectness(correct: boolean, timeMs: number): SRSQuality {
  if (!correct) return 1;
  if (timeMs < 2000) return 5;
  if (timeMs < 5000) return 4;
  return 3;
}
