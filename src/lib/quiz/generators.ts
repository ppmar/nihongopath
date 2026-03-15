import type { QuizQuestion } from "@/components/practice/QuizEngine";
import type { ProgressItem } from "@/lib/stores/useProgressStore";

// --- Utility ---

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickDistractors(pool: string[], correct: string, count: number): string[] {
  return shuffleArray(pool.filter((p) => p !== correct)).slice(0, count);
}

function buildMCQ(
  id: string,
  prompt: string,
  promptSub: string | undefined,
  correct: string,
  distractors: string[],
  meta?: { itemType: string; itemId: string; jlptLevel: string }
): QuizQuestion {
  const options = shuffleArray([correct, ...distractors]);
  return {
    id,
    prompt,
    promptSub,
    options,
    correctIndex: options.indexOf(correct),
    ...(meta && { itemType: meta.itemType, itemId: meta.itemId, jlptLevel: meta.jlptLevel }),
  };
}

// --- Kana ---

type KanaItem = { kana: string; romaji: string; row: string; type: string };
type KanaMode = "kana-romaji" | "romaji-kana";

export function generateKanaQuestions(
  data: KanaItem[],
  kanaType: "hiragana" | "katakana",
  mode: KanaMode,
  count: number
): QuizQuestion[] {
  const pool = shuffleArray(data).slice(0, count);
  const allRomaji = [...new Set(data.map((k) => k.romaji))];
  const allKana = [...new Set(data.map((k) => k.kana))];

  return pool.map((item, i) => {
    if (mode === "kana-romaji") {
      return buildMCQ(
        `kana-${i}`,
        item.kana,
        "Quel est le romaji ?",
        item.romaji,
        pickDistractors(allRomaji, item.romaji, 3),
        { itemType: kanaType, itemId: item.kana, jlptLevel: "kana" }
      );
    }
    return buildMCQ(
      `kana-${i}`,
      item.romaji,
      `Quel est le ${kanaType === "hiragana" ? "hiragana" : "katakana"} ?`,
      item.kana,
      pickDistractors(allKana, item.kana, 3),
      { itemType: kanaType, itemId: item.kana, jlptLevel: "kana" }
    );
  });
}

// --- Kanji ---

type KanjiItem = {
  kanji: string;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  jlpt: string;
  examples: { word: string; reading: string; meaning: string }[];
  radical: string;
  mnemonique: string;
  frequency_rank?: number;
};
type KanjiMode = "kanji-meaning" | "kanji-reading" | "meaning-kanji";

export function generateKanjiQuestions(
  data: KanjiItem[],
  jlpt: string,
  mode: KanjiMode,
  count: number
): QuizQuestion[] {
  const pool = shuffleArray(data).slice(0, count);
  const allMeanings = [...new Set(data.map((k) => k.meanings[0]))];
  const allReadings = [...new Set(data.flatMap((k) => [...k.onyomi, ...k.kunyomi]).filter(Boolean))];
  const allKanji = [...new Set(data.map((k) => k.kanji))];

  return pool.map((item, i) => {
    if (mode === "kanji-meaning") {
      return buildMCQ(
        `kanji-m-${i}`,
        item.kanji,
        "Quelle est la signification ?",
        item.meanings[0],
        pickDistractors(allMeanings, item.meanings[0], 3),
        { itemType: "kanji", itemId: item.kanji, jlptLevel: jlpt.toLowerCase() }
      );
    }
    if (mode === "kanji-reading") {
      const correctReading = item.kunyomi[0] || item.onyomi[0] || "";
      if (!correctReading) {
        return buildMCQ(
          `kanji-r-${i}`,
          item.kanji,
          "Quelle est la signification ?",
          item.meanings[0],
          pickDistractors(allMeanings, item.meanings[0], 3),
          { itemType: "kanji", itemId: item.kanji, jlptLevel: jlpt.toLowerCase() }
        );
      }
      return buildMCQ(
        `kanji-r-${i}`,
        item.kanji,
        "Quelle est la lecture ?",
        correctReading,
        pickDistractors(allReadings, correctReading, 3),
        { itemType: "kanji", itemId: item.kanji, jlptLevel: jlpt.toLowerCase() }
      );
    }
    // meaning-kanji
    return buildMCQ(
      `kanji-k-${i}`,
      item.meanings[0],
      "Quel kanji correspond ?",
      item.kanji,
      pickDistractors(allKanji, item.kanji, 3),
      { itemType: "kanji", itemId: item.kanji, jlptLevel: jlpt.toLowerCase() }
    );
  });
}

// --- Vocabulary ---

type VocabItem = {
  word: string;
  reading: string;
  meaning: string;
  pos: string;
  jlpt: string;
  example_sentence?: { jp: string; reading: string; fr: string };
  tags?: string[];
};
type VocabMode = "word-meaning" | "meaning-word" | "word-reading";

export function generateVocabQuestions(
  data: VocabItem[],
  jlpt: string,
  mode: VocabMode,
  count: number
): QuizQuestion[] {
  const pool = shuffleArray(data).slice(0, count);
  const allMeanings = [...new Set(data.map((v) => v.meaning))];
  const allWords = [...new Set(data.map((v) => v.word))];
  const allReadings = [...new Set(data.map((v) => v.reading))];

  return pool.map((item, i) => {
    if (mode === "word-meaning") {
      return buildMCQ(
        `vocab-m-${i}`,
        item.word,
        item.reading !== item.word ? item.reading : undefined,
        item.meaning,
        pickDistractors(allMeanings, item.meaning, 3),
        { itemType: "vocabulary", itemId: item.word, jlptLevel: jlpt.toLowerCase() }
      );
    }
    if (mode === "meaning-word") {
      return buildMCQ(
        `vocab-w-${i}`,
        item.meaning,
        "Quel mot correspond ?",
        item.word,
        pickDistractors(allWords, item.word, 3),
        { itemType: "vocabulary", itemId: item.word, jlptLevel: jlpt.toLowerCase() }
      );
    }
    // word-reading
    return buildMCQ(
      `vocab-r-${i}`,
      item.word,
      "Quelle est la lecture ?",
      item.reading,
      pickDistractors(allReadings, item.reading, 3),
      { itemType: "vocabulary", itemId: item.word, jlptLevel: jlpt.toLowerCase() }
    );
  });
}

// --- Grammar ---

type GrammarItem = {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: { jp: string; reading: string; fr: string }[];
  notes: string;
  related: string[];
};
type GrammarMode = "pattern-meaning" | "meaning-pattern";

export function generateGrammarQuestions(
  data: GrammarItem[],
  jlpt: string,
  mode: GrammarMode,
  count: number
): QuizQuestion[] {
  const pool = shuffleArray(data).slice(0, count);
  const allMeanings = [...new Set(data.map((g) => g.meaning))];
  const allPatterns = [...new Set(data.map((g) => g.pattern))];

  return pool.map((item, i) => {
    if (mode === "pattern-meaning") {
      return buildMCQ(
        `gram-m-${i}`,
        item.pattern,
        "Quelle est la signification ?",
        item.meaning,
        pickDistractors(allMeanings, item.meaning, 3),
        { itemType: "grammar", itemId: item.id, jlptLevel: jlpt.toLowerCase() }
      );
    }
    // meaning-pattern
    return buildMCQ(
      `gram-p-${i}`,
      item.meaning,
      "Quel point de grammaire ?",
      item.pattern,
      pickDistractors(allPatterns, item.pattern, 3),
      { itemType: "grammar", itemId: item.id, jlptLevel: jlpt.toLowerCase() }
    );
  });
}

// --- Review (SRS-based) ---

type AllData = {
  hiragana: KanaItem[];
  katakana: KanaItem[];
  kanji: Record<string, KanjiItem[]>;
  vocabulary: Record<string, VocabItem[]>;
  grammar: Record<string, GrammarItem[]>;
};

export function generateReviewQuestions(
  dueItems: ProgressItem[],
  allData: AllData,
  count: number
): QuizQuestion[] {
  // Sort: lowest ease_factor first (weakest items), then oldest overdue
  const sorted = [...dueItems].sort((a, b) => {
    if (a.easeFactor !== b.easeFactor) return a.easeFactor - b.easeFactor;
    const aDate = a.nextReview ? new Date(a.nextReview).getTime() : 0;
    const bDate = b.nextReview ? new Date(b.nextReview).getTime() : 0;
    return aDate - bDate;
  });

  const selected = sorted.slice(0, count);
  const questions: QuizQuestion[] = [];

  for (const item of selected) {
    const q = buildReviewQuestion(item, allData);
    if (q) questions.push(q);
  }

  return questions;
}

function buildReviewQuestion(item: ProgressItem, allData: AllData): QuizQuestion | null {
  const { itemType, itemId, jlptLevel } = item;

  if (itemType === "hiragana" || itemType === "katakana") {
    const data = itemType === "hiragana" ? allData.hiragana : allData.katakana;
    const kana = data.find((k) => k.kana === itemId);
    if (!kana) return null;
    const allRomaji = [...new Set(data.map((k) => k.romaji))];
    return buildMCQ(
      `rev-${itemType}-${itemId}`,
      kana.kana,
      "Quel est le romaji ?",
      kana.romaji,
      pickDistractors(allRomaji, kana.romaji, 3),
      { itemType, itemId, jlptLevel }
    );
  }

  if (itemType === "kanji") {
    const level = jlptLevel as string;
    const data = allData.kanji[level];
    if (!data) return null;
    const kanji = data.find((k) => k.kanji === itemId);
    if (!kanji) return null;
    const allMeanings = [...new Set(data.map((k) => k.meanings[0]))];
    return buildMCQ(
      `rev-kanji-${itemId}`,
      kanji.kanji,
      "Quelle est la signification ?",
      kanji.meanings[0],
      pickDistractors(allMeanings, kanji.meanings[0], 3),
      { itemType, itemId, jlptLevel }
    );
  }

  if (itemType === "vocabulary") {
    const level = jlptLevel as string;
    const data = allData.vocabulary[level];
    if (!data) return null;
    const vocab = data.find((v) => v.word === itemId);
    if (!vocab) return null;
    const allMeanings = [...new Set(data.map((v) => v.meaning))];
    return buildMCQ(
      `rev-vocab-${itemId}`,
      vocab.word,
      vocab.reading !== vocab.word ? vocab.reading : undefined,
      vocab.meaning,
      pickDistractors(allMeanings, vocab.meaning, 3),
      { itemType, itemId, jlptLevel }
    );
  }

  if (itemType === "grammar") {
    const level = jlptLevel as string;
    const data = allData.grammar[level];
    if (!data) return null;
    const grammar = data.find((g) => g.id === itemId);
    if (!grammar) return null;
    const allMeanings = [...new Set(data.map((g) => g.meaning))];
    return buildMCQ(
      `rev-grammar-${itemId}`,
      grammar.pattern,
      "Quelle est la signification ?",
      grammar.meaning,
      pickDistractors(allMeanings, grammar.meaning, 3),
      { itemType, itemId, jlptLevel }
    );
  }

  return null;
}
