"use client";
import { useMemo, useState } from "react";
import { QuizEngine, type QuizQuestion } from "@/components/practice/QuizEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, BookOpen } from "lucide-react";
import kanjiData from "@/data/n2/kanji.json";
import vocabData from "@/data/n2/vocabulary.json";

type QuizType = "kanji-meaning" | "vocab-meaning" | null;
function shuffleArray<T>(arr: T[]): T[] { const s = [...arr]; for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; } return s; }
function genKanjiQ(count: number): QuizQuestion[] { const sh = shuffleArray(kanjiData).slice(0, count); return sh.map((k, i) => { const correct = k.meanings[0]; const wrong = shuffleArray(kanjiData.filter(x => x.kanji !== k.kanji).map(x => x.meanings[0])).slice(0, 3); const opts = shuffleArray([correct, ...wrong]); return { id: `k-${i}`, prompt: k.kanji, promptSub: "Signification ?", options: opts, correctIndex: opts.indexOf(correct) }; }); }
function genVocabQ(count: number): QuizQuestion[] { const sh = shuffleArray(vocabData).slice(0, count); return sh.map((v, i) => { const correct = v.meaning; const wrong = shuffleArray(vocabData.filter(x => x.word !== v.word).map(x => x.meaning)).slice(0, 3); const opts = shuffleArray([correct, ...wrong]); return { id: `v-${i}`, prompt: v.word, promptSub: v.reading !== v.word ? v.reading : undefined, options: opts, correctIndex: opts.indexOf(correct) }; }); }

export default function N2PracticePage() {
  const [qt, setQt] = useState<QuizType>(null);
  const questions = useMemo(() => { if (qt === "kanji-meaning") return genKanjiQ(10); if (qt === "vocab-meaning") return genVocabQ(10); return []; }, [qt]);
  if (qt && questions.length > 0) return (<div className="max-w-lg mx-auto space-y-4"><Button variant="ghost" onClick={() => setQt(null)}>← Retour</Button><QuizEngine questions={questions} title={qt === "kanji-meaning" ? "Quiz Kanji N2" : "Quiz Vocab N2"} /></div>);
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-bold tracking-tight">Pratique N2 <span className="text-muted-foreground font-normal text-lg">練習</span></h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="group cursor-pointer border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]" onClick={() => setQt("kanji-meaning")}><CardContent className="p-6 space-y-3"><div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center"><Languages className="h-5 w-5 text-violet-400" /></div><h3 className="text-lg font-semibold">Kanji → Sens</h3><p className="text-sm text-muted-foreground">Quiz kanji N2</p></CardContent></Card>
        <Card className="group cursor-pointer border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]" onClick={() => setQt("vocab-meaning")}><CardContent className="p-6 space-y-3"><div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><BookOpen className="h-5 w-5 text-blue-400" /></div><h3 className="text-lg font-semibold">Vocabulaire → Sens</h3><p className="text-sm text-muted-foreground">Quiz vocab N2</p></CardContent></Card>
      </div>
    </div>
  );
}
