"use client";

import { useState, useCallback } from "react";
import { VocabList } from "@/components/learning/VocabList";
import { QuizEngine, type QuizQuestion } from "@/components/practice/QuizEngine";
import { generateVocabQuestions } from "@/lib/quiz/generators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, List } from "lucide-react";
import vocabData from "@/data/n4/vocabulary.json";

type Mode = "list" | "quiz";
type QuizMode = "word-meaning" | "meaning-word" | "word-reading";

export default function N4VocabularyPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [quizMode, setQuizMode] = useState<QuizMode>("word-meaning");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizKey, setQuizKey] = useState(0);

  const startQuiz = useCallback((qm?: QuizMode) => {
    const m = qm ?? quizMode;
    setQuestions(generateVocabQuestions(vocabData, "n4", m, 10));
    setQuizKey((k) => k + 1);
    setMode("quiz");
  }, [quizMode]);

  const changeMode = useCallback((m: string) => {
    const qm = m as QuizMode;
    setQuizMode(qm);
    setQuestions(generateVocabQuestions(vocabData, "n4", qm, 10));
    setQuizKey((k) => k + 1);
  }, []);

  if (mode === "quiz" && questions.length > 0) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Button variant="ghost" onClick={() => setMode("list")} className="text-muted-foreground">
            <List className="h-4 w-4 mr-2" />Liste
          </Button>
          <Tabs value={quizMode} onValueChange={changeMode}>
            <TabsList>
              <TabsTrigger value="word-meaning">Mot→Sens</TabsTrigger>
              <TabsTrigger value="meaning-word">Sens→Mot</TabsTrigger>
              <TabsTrigger value="word-reading">Mot→Lecture</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <QuizEngine key={quizKey} questions={questions} title="Quiz Vocabulaire N4" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Vocabulaire N4{" "}
            <span className="text-muted-foreground font-normal text-lg">語彙</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{vocabData.length} mots essentiels pour le JLPT N4</p>
        </div>
        <Button onClick={() => startQuiz()} className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
          <GraduationCap className="h-4 w-4" />Quiz
        </Button>
      </div>
      <VocabList data={vocabData} />
    </div>
  );
}
