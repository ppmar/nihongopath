"use client";

import { useState, useCallback } from "react";
import { KanaGrid } from "@/components/learning/KanaGrid";
import { QuizEngine, type QuizQuestion } from "@/components/practice/QuizEngine";
import { generateKanaQuestions } from "@/lib/quiz/generators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Grid3X3 } from "lucide-react";
import hiraganaData from "@/data/hiragana.json";

type Mode = "grid" | "quiz";
type QuizDirection = "kana-romaji" | "romaji-kana";

export default function HiraganaPage() {
  const [mode, setMode] = useState<Mode>("grid");
  const [direction, setDirection] = useState<QuizDirection>("kana-romaji");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizKey, setQuizKey] = useState(0);

  const startQuiz = useCallback((dir?: QuizDirection) => {
    const d = dir ?? direction;
    setQuestions(generateKanaQuestions(hiraganaData, "hiragana", d, 15));
    setQuizKey((k) => k + 1);
    setMode("quiz");
  }, [direction]);

  const changeDirection = useCallback((dir: string) => {
    const d = dir as QuizDirection;
    setDirection(d);
    setQuestions(generateKanaQuestions(hiraganaData, "hiragana", d, 15));
    setQuizKey((k) => k + 1);
  }, []);

  if (mode === "quiz" && questions.length > 0) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setMode("grid")}
            className="text-muted-foreground"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Grille
          </Button>
          <Tabs value={direction} onValueChange={changeDirection}>
            <TabsList>
              <TabsTrigger value="kana-romaji">あ → a</TabsTrigger>
              <TabsTrigger value="romaji-kana">a → あ</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <QuizEngine
          key={quizKey}
          questions={questions}
          title="Quiz Hiragana"
          mode="practice"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div />
        <Button
          onClick={() => startQuiz()}
          className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
        >
          <GraduationCap className="h-4 w-4" />
          Lancer un quiz
        </Button>
      </div>
      <KanaGrid data={hiraganaData} title="Hiragana ひらがな" />
    </div>
  );
}
