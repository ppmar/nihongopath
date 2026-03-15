"use client";

import { useMemo, useState } from "react";
import { QuizEngine } from "@/components/practice/QuizEngine";
import { generateKanjiQuestions, generateVocabQuestions, generateGrammarQuestions } from "@/lib/quiz/generators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, BookOpen, PenTool, Type, ArrowLeftRight, BookMarked } from "lucide-react";
import kanjiData from "@/data/n5/kanji.json";
import vocabData from "@/data/n5/vocabulary.json";
import grammarData from "@/data/n5/grammar.json";

type QuizType =
  | "kanji-meaning" | "kanji-reading" | "meaning-kanji"
  | "vocab-meaning" | "meaning-vocab" | "vocab-reading"
  | "grammar-meaning" | "meaning-grammar"
  | null;

const QUIZ_TYPES: { id: QuizType; title: string; description: string; icon: typeof Languages; color: string; bgColor: string }[] = [
  { id: "kanji-meaning", title: "Kanji → Sens", description: "Trouve le sens des kanji", icon: Languages, color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { id: "kanji-reading", title: "Kanji → Lecture", description: "Trouve la lecture des kanji", icon: Type, color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { id: "meaning-kanji", title: "Sens → Kanji", description: "Trouve le kanji correspondant", icon: ArrowLeftRight, color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { id: "vocab-meaning", title: "Mot → Sens", description: "Trouve le sens des mots", icon: BookOpen, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { id: "meaning-vocab", title: "Sens → Mot", description: "Trouve le mot correspondant", icon: ArrowLeftRight, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { id: "vocab-reading", title: "Mot → Lecture", description: "Trouve la lecture du mot", icon: Type, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { id: "grammar-meaning", title: "Grammaire → Sens", description: "Trouve le sens du pattern", icon: PenTool, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { id: "meaning-grammar", title: "Sens → Grammaire", description: "Trouve le point de grammaire", icon: BookMarked, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
];

export default function N5PracticePage() {
  const [quizType, setQuizType] = useState<QuizType>(null);
  const [quizKey, setQuizKey] = useState(0);

  const questions = useMemo(() => {
    switch (quizType) {
      case "kanji-meaning": return generateKanjiQuestions(kanjiData, "n5", "kanji-meaning", 10);
      case "kanji-reading": return generateKanjiQuestions(kanjiData, "n5", "kanji-reading", 10);
      case "meaning-kanji": return generateKanjiQuestions(kanjiData, "n5", "meaning-kanji", 10);
      case "vocab-meaning": return generateVocabQuestions(vocabData, "n5", "word-meaning", 10);
      case "meaning-vocab": return generateVocabQuestions(vocabData, "n5", "meaning-word", 10);
      case "vocab-reading": return generateVocabQuestions(vocabData, "n5", "word-reading", 10);
      case "grammar-meaning": return generateGrammarQuestions(grammarData, "n5", "pattern-meaning", 10);
      case "meaning-grammar": return generateGrammarQuestions(grammarData, "n5", "meaning-pattern", 10);
      default: return [];
    }
  }, [quizType, quizKey]);

  if (quizType && questions.length > 0) {
    const qt = QUIZ_TYPES.find((t) => t.id === quizType);
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
          key={quizKey}
          questions={questions}
          title={`Quiz N5 · ${qt?.title ?? ""}`}
          onComplete={() => setQuizKey((k) => k + 1)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUIZ_TYPES.map((qt) => (
          <Card
            key={qt.id}
            className="group cursor-pointer border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => { setQuizType(qt.id); setQuizKey((k) => k + 1); }}
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
