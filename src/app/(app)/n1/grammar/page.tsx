"use client";

import { useState, useCallback } from "react";
import { GrammarPoint } from "@/components/learning/GrammarPoint";
import { QuizEngine, type QuizQuestion } from "@/components/practice/QuizEngine";
import { generateGrammarQuestions } from "@/lib/quiz/generators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, List } from "lucide-react";
import grammarData from "@/data/n1/grammar.json";

type Mode = "list" | "quiz";
type QuizMode = "pattern-meaning" | "meaning-pattern";

export default function N1GrammarPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [quizMode, setQuizMode] = useState<QuizMode>("pattern-meaning");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizKey, setQuizKey] = useState(0);

  const startQuiz = useCallback((qm?: QuizMode) => {
    const m = qm ?? quizMode;
    setQuestions(generateGrammarQuestions(grammarData, "n1", m, 10));
    setQuizKey((k) => k + 1);
    setMode("quiz");
  }, [quizMode]);

  const changeMode = useCallback((m: string) => {
    const qm = m as QuizMode;
    setQuizMode(qm);
    setQuestions(generateGrammarQuestions(grammarData, "n1", qm, 10));
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
              <TabsTrigger value="pattern-meaning">Pattern→Sens</TabsTrigger>
              <TabsTrigger value="meaning-pattern">Sens→Pattern</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <QuizEngine key={quizKey} questions={questions} title="Quiz Grammaire N1" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Grammaire N1{" "}
            <span className="text-muted-foreground font-normal text-lg">文法</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{grammarData.length} points de grammaire</p>
        </div>
        <Button onClick={() => startQuiz()} className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
          <GraduationCap className="h-4 w-4" />Quiz
        </Button>
      </div>
      <div className="space-y-3">
        {grammarData.map((point) => (<GrammarPoint key={point.id} data={point} />))}
      </div>
    </div>
  );
}
