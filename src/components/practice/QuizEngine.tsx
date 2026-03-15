"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ConfettiExplosion } from "@/components/common/ConfettiExplosion";
import { XPGainAnimation } from "@/components/gamification/XPGainAnimation";
import { useGamificationStore } from "@/lib/stores/useGamificationStore";
import { XP_REWARDS } from "@/lib/gamification/xp";
import { cn } from "@/lib/utils";
import { Check, X, ArrowRight } from "lucide-react";

export type QuizQuestion = {
  id: string;
  prompt: string;
  promptSub?: string;
  options: string[];
  correctIndex: number;
};

type QuizEngineProps = {
  questions: QuizQuestion[];
  title: string;
  xpPerCorrect?: number;
  onComplete?: (correct: number, total: number) => void;
};

export function QuizEngine({
  questions,
  title,
  xpPerCorrect = XP_REWARDS.CORRECT_QUIZ,
  onComplete,
}: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpGain, setXpGain] = useState({ amount: 0, show: false });

  const { addXp, recordCorrectAnswer, recordIncorrectAnswer, recordActivity, incrementDaily } =
    useGamificationStore();

  const question = questions[current];
  const isCorrect = selected === question?.correctIndex;
  const progress = ((current + (showResult ? 1 : 0)) / questions.length) * 100;

  const handleSelect = useCallback(
    (idx: number) => {
      if (showResult) return;
      setSelected(idx);
      setShowResult(true);

      const correct = idx === question.correctIndex;
      if (correct) {
        setCorrectCount((c) => c + 1);
        recordCorrectAnswer();
        const { leveledUp } = addXp(xpPerCorrect);
        setXpGain({ amount: xpPerCorrect, show: true });
        incrementDaily();
      } else {
        recordIncorrectAnswer();
      }
      recordActivity();
    },
    [showResult, question, addXp, xpPerCorrect, recordCorrectAnswer, recordIncorrectAnswer, recordActivity, incrementDaily]
  );

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      const { leveledUp } = addXp(XP_REWARDS.SESSION_COMPLETE);
      onComplete?.(correctCount + (isCorrect ? 0 : 0), questions.length);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setShowResult(false);
  }, [current, questions.length, addXp, onComplete, correctCount, isCorrect]);

  if (finished) {
    const finalCorrect = correctCount;
    const percent = Math.round((finalCorrect / questions.length) * 100);
    const isPerfect = finalCorrect === questions.length;

    return (
      <>
        <ConfettiExplosion trigger={isPerfect} />
        <Card className="max-w-lg mx-auto border-border bg-card">
          <CardContent className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-6xl"
            >
              {isPerfect ? "🎉" : percent >= 70 ? "👏" : "💪"}
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight">Quiz terminé !</h2>
            <div className="space-y-2">
              <p className="text-4xl font-bold">
                <span className={percent >= 70 ? "text-emerald-400" : "text-amber-400"}>
                  {finalCorrect}
                </span>
                <span className="text-muted-foreground">/{questions.length}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {percent}% de bonnes réponses
              </p>
            </div>
            <Button
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setShowResult(false);
                setCorrectCount(0);
                setFinished(false);
              }}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              Recommencer
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <XPGainAnimation
        amount={xpGain.amount}
        show={xpGain.show}
        onComplete={() => setXpGain({ amount: 0, show: false })}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{title}</span>
          <span className="text-muted-foreground">
            {current + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-3xl font-jp font-bold">{question.prompt}</p>
                {question.promptSub && (
                  <p className="text-sm text-muted-foreground">{question.promptSub}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {question.options.map((option, idx) => {
                  const isSelected = selected === idx;
                  const isAnswer = idx === question.correctIndex;

                  return (
                    <motion.button
                      key={idx}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)}
                      disabled={showResult}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200",
                        !showResult && "hover:border-violet-500/30 hover:bg-accent/50 cursor-pointer",
                        showResult && isAnswer && "border-emerald-500/50 bg-emerald-500/10",
                        showResult && isSelected && !isAnswer && "border-red-500/50 bg-red-500/10",
                        showResult && !isSelected && !isAnswer && "opacity-50"
                      )}
                    >
                      <span className="flex-1">{option}</span>
                      {showResult && isAnswer && (
                        <Check className="h-5 w-5 text-emerald-400" />
                      )}
                      {showResult && isSelected && !isAnswer && (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <Button
            onClick={handleNext}
            className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
          >
            {current + 1 >= questions.length ? "Voir les résultats" : "Suivant"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
