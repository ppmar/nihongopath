"use client";

import { useState, useMemo } from "react";
import { KanaGrid } from "@/components/learning/KanaGrid";
import { QuizEngine } from "@/components/practice/QuizEngine";
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
  const [quizKey, setQuizKey] = useState(0);

  const questions = useMemo(
    () => generateKanaQuestions(hiraganaData, "hiragana", direction, 15),
    [direction, quizKey]
  );

  if (mode === "quiz") {
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
          <Tabs value={direction} onValueChange={(v) => { setDirection(v as QuizDirection); setQuizKey((k) => k + 1); }}>
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
        <div /> {/* spacer for KanaGrid title */}
        <Button
          onClick={() => setMode("quiz")}
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
