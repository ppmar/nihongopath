"use client";

import { useMemo, useState } from "react";
import { QuizEngine, type QuizQuestion } from "@/components/practice/QuizEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, BookOpen, PenTool } from "lucide-react";
import kanjiData from "@/data/n5/kanji.json";
import vocabData from "@/data/n5/vocabulary.json";

type QuizType = "kanji-meaning" | "vocab-meaning" | null;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateKanjiQuestions(count: number): QuizQuestion[] {
  const shuffled = shuffleArray(kanjiData).slice(0, count);
  return shuffled.map((kanji, idx) => {
    const correctMeaning = kanji.meanings[0];
    const otherMeanings = kanjiData
      .filter((k) => k.kanji !== kanji.kanji)
      .map((k) => k.meanings[0]);
    const wrongOptions = shuffleArray(otherMeanings).slice(0, 3);
    const options = shuffleArray([correctMeaning, ...wrongOptions]);
    return {
      id: `kanji-${idx}`,
      prompt: kanji.kanji,
      promptSub: "Quelle est la signification de ce kanji ?",
      options,
      correctIndex: options.indexOf(correctMeaning),
    };
  });
}

function generateVocabQuestions(count: number): QuizQuestion[] {
  const shuffled = shuffleArray(vocabData).slice(0, count);
  return shuffled.map((vocab, idx) => {
    const correctMeaning = vocab.meaning;
    const otherMeanings = vocabData
      .filter((v) => v.word !== vocab.word)
      .map((v) => v.meaning);
    const wrongOptions = shuffleArray(otherMeanings).slice(0, 3);
    const options = shuffleArray([correctMeaning, ...wrongOptions]);
    return {
      id: `vocab-${idx}`,
      prompt: vocab.word,
      promptSub: vocab.reading !== vocab.word ? vocab.reading : undefined,
      options,
      correctIndex: options.indexOf(correctMeaning),
    };
  });
}

const QUIZ_TYPES = [
  {
    id: "kanji-meaning" as QuizType,
    title: "Kanji → Sens",
    description: "Trouve le sens des kanji N5",
    icon: Languages,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    id: "vocab-meaning" as QuizType,
    title: "Vocabulaire → Sens",
    description: "Trouve le sens des mots N5",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
];

export default function N5PracticePage() {
  const [quizType, setQuizType] = useState<QuizType>(null);

  const questions = useMemo(() => {
    if (quizType === "kanji-meaning") return generateKanjiQuestions(10);
    if (quizType === "vocab-meaning") return generateVocabQuestions(10);
    return [];
  }, [quizType]);

  if (quizType && questions.length > 0) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <Button
          variant="ghost"
          onClick={() => setQuizType(null)}
          className="text-muted-foreground"
        >
          ← Retour aux quiz
        </Button>
        <QuizEngine
          questions={questions}
          title={quizType === "kanji-meaning" ? "Quiz Kanji N5" : "Quiz Vocabulaire N5"}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Pratique N5{" "}
          <span className="text-muted-foreground font-normal text-lg">練習</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Teste tes connaissances avec des quiz interactifs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUIZ_TYPES.map((qt) => (
          <Card
            key={qt.id}
            className="group cursor-pointer border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => setQuizType(qt.id)}
          >
            <CardContent className="p-6 space-y-3">
              <div className={`h-10 w-10 rounded-lg ${qt.bgColor} flex items-center justify-center`}>
                <qt.icon className={`h-5 w-5 ${qt.color}`} />
              </div>
              <h3 className="text-lg font-semibold">{qt.title}</h3>
              <p className="text-sm text-muted-foreground">{qt.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
