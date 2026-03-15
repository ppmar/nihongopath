"use client";

import { useState, useMemo } from "react";
import { KanjiCard } from "@/components/learning/KanjiCard";
import { QuizEngine } from "@/components/practice/QuizEngine";
import { generateKanjiQuestions } from "@/lib/quiz/generators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, GraduationCap, Grid3X3 } from "lucide-react";
import kanjiData from "@/data/n2/kanji.json";

type Mode = "grid" | "quiz";
type QuizMode = "kanji-meaning" | "kanji-reading" | "meaning-kanji";

export default function N2KanjiPage() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("grid");
  const [quizMode, setQuizMode] = useState<QuizMode>("kanji-meaning");
  const [quizKey, setQuizKey] = useState(0);

  const filtered = kanjiData.filter((k) => !search || k.kanji.includes(search) || k.meanings.some((m: string) => m.toLowerCase().includes(search.toLowerCase())));

  const questions = useMemo(
    () => generateKanjiQuestions(kanjiData, "n2", quizMode, 10),
    [quizMode, quizKey]
  );

  if (mode === "quiz") {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Button variant="ghost" onClick={() => setMode("grid")} className="text-muted-foreground">
            <Grid3X3 className="h-4 w-4 mr-2" />Grille
          </Button>
          <Tabs value={quizMode} onValueChange={(v) => { setQuizMode(v as QuizMode); setQuizKey((k) => k + 1); }}>
            <TabsList>
              <TabsTrigger value="kanji-meaning">漢字→Sens</TabsTrigger>
              <TabsTrigger value="kanji-reading">漢字→Lecture</TabsTrigger>
              <TabsTrigger value="meaning-kanji">Sens→漢字</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <QuizEngine key={quizKey} questions={questions} title="Quiz Kanji N2" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kanji N2 <span className="text-muted-foreground font-normal text-lg">漢字</span></h1>
          <p className="text-sm text-muted-foreground mt-1">{kanjiData.length} kanji</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Chercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button onClick={() => setMode("quiz")} className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shrink-0">
            <GraduationCap className="h-4 w-4" />Quiz
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((kanji) => (<KanjiCard key={kanji.kanji} data={kanji} />))}
      </div>
    </div>
  );
}
