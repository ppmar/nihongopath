"use client";

import { useState, useCallback } from "react";
import { KanjiCard } from "@/components/learning/KanjiCard";
import { QuizEngine, type QuizQuestion } from "@/components/practice/QuizEngine";
import { generateKanjiQuestions } from "@/lib/quiz/generators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, GraduationCap, Grid3X3 } from "lucide-react";
import kanjiData from "@/data/n3/kanji.json";

type Mode = "grid" | "quiz";
type QuizMode = "kanji-meaning" | "kanji-reading" | "meaning-kanji";

export default function N3KanjiPage() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("grid");
  const [quizMode, setQuizMode] = useState<QuizMode>("kanji-meaning");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizKey, setQuizKey] = useState(0);

  const filtered = kanjiData.filter((k) => {
    if (!search) return true;
    return (
      k.kanji.includes(search) ||
      k.meanings.some((m: string) => m.toLowerCase().includes(search.toLowerCase())) ||
      k.onyomi.some((r: string) => r.includes(search)) ||
      k.kunyomi.some((r: string) => r.includes(search))
    );
  });

  const startQuiz = useCallback((qm?: QuizMode) => {
    const m = qm ?? quizMode;
    setQuestions(generateKanjiQuestions(kanjiData, "n3", m, 10));
    setQuizKey((k) => k + 1);
    setMode("quiz");
  }, [quizMode]);

  const changeMode = useCallback((m: string) => {
    const qm = m as QuizMode;
    setQuizMode(qm);
    setQuestions(generateKanjiQuestions(kanjiData, "n3", qm, 10));
    setQuizKey((k) => k + 1);
  }, []);

  if (mode === "quiz" && questions.length > 0) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Button variant="ghost" onClick={() => setMode("grid")} className="text-muted-foreground">
            <Grid3X3 className="h-4 w-4 mr-2" />Grille
          </Button>
          <Tabs value={quizMode} onValueChange={changeMode}>
            <TabsList>
              <TabsTrigger value="kanji-meaning">漢字→Sens</TabsTrigger>
              <TabsTrigger value="kanji-reading">漢字→Lecture</TabsTrigger>
              <TabsTrigger value="meaning-kanji">Sens→漢字</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <QuizEngine key={quizKey} questions={questions} title="Quiz Kanji N3" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Kanji N3{" "}
            <span className="text-muted-foreground font-normal text-lg">漢字</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {kanjiData.length} kanji · Clique pour retourner
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Chercher un kanji..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button onClick={() => startQuiz()} className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shrink-0">
            <GraduationCap className="h-4 w-4" />Quiz
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((kanji) => (<KanjiCard key={kanji.kanji} data={kanji} />))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">Aucun kanji trouvé pour &quot;{search}&quot;</p>
      )}
    </div>
  );
}
