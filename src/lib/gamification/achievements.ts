export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export type Achievement = {
  id: string;
  name: string;
  nameJp: string;
  description: string;
  rarity: AchievementRarity;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  // KANA
  { id: "hiragana_complete", name: "Hiragana Master", nameJp: "ひらがなの達人", description: "Maîtriser tous les hiragana", rarity: "common", icon: "あ" },
  { id: "katakana_complete", name: "Katakana Master", nameJp: "カタカナの達人", description: "Maîtriser tous les katakana", rarity: "common", icon: "ア" },
  { id: "kana_complete", name: "Kana Conqueror", nameJp: "仮名征服者", description: "Maîtriser hiragana et katakana", rarity: "rare", icon: "仮" },
  // KANJI
  { id: "first_kanji", name: "Premier Trait", nameJp: "一画", description: "Apprendre son premier kanji", rarity: "common", icon: "一" },
  { id: "kanji_10", name: "Dix Symboles", nameJp: "十文字", description: "Maîtriser 10 kanji", rarity: "common", icon: "十" },
  { id: "kanji_50", name: "Demi-Centurion", nameJp: "半百", description: "Maîtriser 50 kanji", rarity: "common", icon: "半" },
  { id: "kanji_100", name: "Centurion", nameJp: "百字", description: "Maîtriser 100 kanji", rarity: "rare", icon: "百" },
  { id: "kanji_500", name: "Scholar", nameJp: "学者", description: "Maîtriser 500 kanji", rarity: "epic", icon: "学" },
  { id: "kanji_1000", name: "Sage des Kanji", nameJp: "漢字仙人", description: "Maîtriser 1000 kanji", rarity: "epic", icon: "仙" },
  { id: "kanji_2136", name: "Jōyō Complete", nameJp: "常用漢字制覇", description: "Maîtriser les 2136 jōyō kanji", rarity: "legendary", icon: "覇" },
  // JLPT
  { id: "n5_complete", name: "JLPT N5 Ready", nameJp: "N5合格", description: "Compléter tout le contenu N5", rarity: "rare", icon: "5" },
  { id: "n4_complete", name: "JLPT N4 Ready", nameJp: "N4合格", description: "Compléter tout le contenu N4", rarity: "rare", icon: "4" },
  { id: "n3_complete", name: "JLPT N3 Ready", nameJp: "N3合格", description: "Compléter tout le contenu N3", rarity: "epic", icon: "3" },
  { id: "n2_complete", name: "JLPT N2 Ready", nameJp: "N2合格", description: "Compléter tout le contenu N2", rarity: "epic", icon: "2" },
  { id: "n1_complete", name: "JLPT N1 Ready", nameJp: "N1合格", description: "Compléter tout le contenu N1", rarity: "legendary", icon: "1" },
  // STREAKS
  { id: "streak_7", name: "Semaine Parfaite", nameJp: "一週間", description: "Streak de 7 jours", rarity: "common", icon: "🔥" },
  { id: "streak_30", name: "Mois de Fer", nameJp: "鉄の月", description: "Streak de 30 jours", rarity: "rare", icon: "🔥" },
  { id: "streak_100", name: "Centenaire", nameJp: "百日", description: "Streak de 100 jours", rarity: "epic", icon: "🔥" },
  { id: "streak_365", name: "Année du Dragon", nameJp: "龍の年", description: "Streak de 365 jours", rarity: "legendary", icon: "🐉" },
  // QUIZ
  { id: "perfect_quiz", name: "Sans Faute", nameJp: "完璧", description: "Quiz parfait (10+ questions)", rarity: "rare", icon: "💯" },
  { id: "combo_20", name: "Combo Master", nameJp: "連続の達人", description: "Combo de 20 bonnes réponses", rarity: "epic", icon: "⚡" },
  { id: "reviews_1000", name: "Réviseur Éternel", nameJp: "永遠の復習者", description: "1000 révisions complétées", rarity: "epic", icon: "♾️" },
  // FUN
  { id: "night_owl", name: "Hibou Nocturne", nameJp: "ふくろう", description: "Étudier entre minuit et 5h", rarity: "common", icon: "🦉" },
  { id: "early_bird", name: "Lève-Tôt", nameJp: "早起き鳥", description: "Étudier entre 5h et 7h", rarity: "common", icon: "🐦" },
  { id: "speed_demon", name: "Démon de Vitesse", nameJp: "速度悪魔", description: "10 réponses correctes en < 2s chacune", rarity: "rare", icon: "⚡" },
];

export const RARITY_COLORS: Record<AchievementRarity, string> = {
  common: "text-zinc-400 border-zinc-400/30 bg-zinc-400/10",
  rare: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  epic: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  legendary: "text-amber-400 border-amber-400/30 bg-amber-400/10",
};

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export type AchievementCheckContext = {
  kanjiMastered: number;
  currentStreak: number;
  totalReviews: number;
  hiraganaComplete: boolean;
  katakanaComplete: boolean;
  hour: number;
  combo: number;
  quizPerfect: boolean;
  quizLength: number;
  jlptComplete: Record<string, boolean>;
};

export function checkAchievements(
  ctx: AchievementCheckContext,
  unlocked: Set<string>
): string[] {
  const newAchievements: string[] = [];

  const checks: [string, boolean][] = [
    ["hiragana_complete", ctx.hiraganaComplete],
    ["katakana_complete", ctx.katakanaComplete],
    ["kana_complete", ctx.hiraganaComplete && ctx.katakanaComplete],
    ["first_kanji", ctx.kanjiMastered >= 1],
    ["kanji_10", ctx.kanjiMastered >= 10],
    ["kanji_50", ctx.kanjiMastered >= 50],
    ["kanji_100", ctx.kanjiMastered >= 100],
    ["kanji_500", ctx.kanjiMastered >= 500],
    ["kanji_1000", ctx.kanjiMastered >= 1000],
    ["kanji_2136", ctx.kanjiMastered >= 2136],
    ["streak_7", ctx.currentStreak >= 7],
    ["streak_30", ctx.currentStreak >= 30],
    ["streak_100", ctx.currentStreak >= 100],
    ["streak_365", ctx.currentStreak >= 365],
    ["perfect_quiz", ctx.quizPerfect && ctx.quizLength >= 10],
    ["combo_20", ctx.combo >= 20],
    ["reviews_1000", ctx.totalReviews >= 1000],
    ["night_owl", ctx.hour >= 0 && ctx.hour < 5],
    ["early_bird", ctx.hour >= 5 && ctx.hour < 7],
    ["n5_complete", ctx.jlptComplete.n5 === true],
    ["n4_complete", ctx.jlptComplete.n4 === true],
    ["n3_complete", ctx.jlptComplete.n3 === true],
    ["n2_complete", ctx.jlptComplete.n2 === true],
    ["n1_complete", ctx.jlptComplete.n1 === true],
  ];

  for (const [id, condition] of checks) {
    if (condition && !unlocked.has(id)) {
      newAchievements.push(id);
    }
  }

  return newAchievements;
}
