"use client";

import { useState, useMemo } from "react";
import { VocabList } from "@/components/learning/VocabList";
import { QuizEngine } from "@/components/practice/QuizEngine";
import { generateVocabQuestions } from "@/lib/quiz/generators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, List } from "lucide-react";
import vocabData from "@/data/n2/vocabulary.json";

type Mode = "list" | "quiz";
type QuizMode = "word-meaning" | "meaning-word" | "word-reading";

export default function N2VocabularyPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [quizMode, setQuizMode] = useState<QuizMode>("word-meaning");
  const [quizKey, setQuizKey] = useState(0);

  const questions = useMemo(
    () => generateVocabQuestions(vocabData, "n2", quizMode, 10),
    [quizMode, quizKey]
  );

  if (mode === "quiz") {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Button variant="ghost" onClick={() => setMode("list")} className="text-muted-foreground">
            <List className="h-4 w-4 mr-2" />Liste
          </Button>
          <Tabs value={quizMode} onValueChange={(v) => { setQuizMode(v as QuizMode); setQuizKey((k) => k + 1); }}>
            <TabsList>
              <TabsTrigger value="word-meaning">Mot→Sens</TabsTrigger>
              <TabsTrigger value="meaning-word">Sens→Mot</TabsTrigger>
              <TabsTrigger value="word-reading">Mot→Lecture</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <QuizEngine key={quizKey} questions={questions} title="Quiz Vocabulaire N2" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vocabulaire N2 <span className="text-muted-foreground font-normal text-lg">語彙</span></h1>
          <p className="text-sm text-muted-foreground mt-1">{vocabData.length} mots</p>
        </div>
        <Button onClick={() => setMode("quiz")} className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
          <GraduationCap className="h-4 w-4" />Quiz
        </Button>
      </div>
      <VocabList data={vocabData} />
    </div>
  );
}
