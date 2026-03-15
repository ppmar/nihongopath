export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type LearningProgress = {
  id: string;
  user_id: string;
  item_type: "hiragana" | "katakana" | "kanji" | "vocabulary" | "grammar";
  item_id: string;
  jlpt_level: "kana" | "n5" | "n4" | "n3" | "n2" | "n1";
  status: "new" | "learning" | "reviewing" | "mastered";
  ease_factor: number;
  interval_days: number;
  next_review: string | null;
  review_count: number;
  correct_count: number;
  last_reviewed: string | null;
  created_at: string;
};

export type UserStats = {
  user_id: string;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  total_reviews: number;
  total_correct: number;
  total_time_seconds: number;
  kanji_mastered: number;
  vocab_mastered: number;
  grammar_learned: number;
  updated_at: string;
};

export type UserAchievement = {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
};

export type StudySession = {
  id: string;
  user_id: string;
  session_type: "learn" | "review" | "quiz";
  jlpt_level: string;
  item_type: string;
  items_studied: number;
  items_correct: number;
  xp_earned: number;
  duration_seconds: number;
  created_at: string;
};

export type DailyGoal = {
  id: string;
  user_id: string;
  date: string;
  goal_items: number;
  completed_items: number;
  goal_met: boolean;
};
