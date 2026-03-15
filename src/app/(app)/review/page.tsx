"use client";

import { useMemo, useState } from "react";
import { QuizEngine } from "@/components/practice/QuizEngine";
import { generateReviewQuestions } from "@/lib/quiz/generators";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

import hiraganaData from "@/data/hiragana.json";
import katakanaData from "@/data/katakana.json";
import n5Kanji from "@/data/n5/kanji.json";
import n5Vocab from "@/data/n5/vocabulary.json";
import n5Grammar from "@/data/n5/grammar.json";
import n4Kanji from "@/data/n4/kanji.json";
import n4Vocab from "@/data/n4/vocabulary.json";
import n4Grammar from "@/data/n4/grammar.json";
import n3Kanji from "@/data/n3/kanji.json";
import n3Vocab from "@/data/n3/vocabulary.json";
import n3Grammar from "@/data/n3/grammar.json";
import n2Kanji from "@/data/n2/kanji.json";
import n2Vocab from "@/data/n2/vocabulary.json";
import n2Grammar from "@/data/n2/grammar.json";
import n1Kanji from "@/data/n1/kanji.json";
import n1Vocab from "@/data/n1/vocabulary.json";
import n1Grammar from "@/data/n1/grammar.json";

const ALL_DATA = {
  hiragana: hiraganaData,
  katakana: katakanaData,
  kanji: {
    n5: n5Kanji,
    n4: n4Kanji,
    n3: n3Kanji,
    n2: n2Kanji,
    n1: n1Kanji,
  } as Record<string, typeof n5Kanji>,
  vocabulary: {
    n5: n5Vocab,
    n4: n4Vocab,
    n3: n3Vocab,
    n2: n2Vocab,
    n1: n1Vocab,
  } as Record<string, typeof n5Vocab>,
  grammar: {
    n5: n5Grammar,
    n4: n4Grammar,
    n3: n3Grammar,
    n2: n2Grammar,
    n1: n1Grammar,
  } as Record<string, typeof n5Grammar>,
};

export default function ReviewPage() {
  const [quizKey, setQuizKey] = useState(0);
  const dueItems = useProgressStore((s) => s.getItemsDueForReview());

  const questions = useMemo(
    () => generateReviewQuestions(dueItems, ALL_DATA, 20),
    [dueItems, quizKey]
  );

  if (dueItems.length === 0 || questions.length === 0) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-border bg-card">
          <CardContent className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Aucune révision en attente</h1>
              <p className="text-muted-foreground">
                Toutes tes révisions sont à jour. Continue d&apos;apprendre pour ajouter de nouveaux items à réviser !
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Révisions{" "}
            <span className="text-muted-foreground font-normal text-lg">復習</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {dueItems.length} item{dueItems.length > 1 ? "s" : ""} à réviser · Les plus faibles en premier
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuizKey((k) => k + 1)}
          className="text-muted-foreground"
          title="Relancer"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
      <QuizEngine
        key={quizKey}
        questions={questions}
        title="Révisions SRS"
        mode="review"
        onComplete={() => setQuizKey((k) => k + 1)}
      />
    </div>
  );
}
