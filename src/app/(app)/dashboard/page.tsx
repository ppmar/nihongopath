"use client";

import Link from "next/link";
import { useGamificationStore } from "@/lib/stores/useGamificationStore";
import { DailyGoalRing } from "@/components/gamification/DailyGoalRing";
import { StreakCalendar } from "@/components/gamification/StreakCalendar";
import { ProgressRing } from "@/components/common/ProgressRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Languages,
  BookOpen,
  GraduationCap,
  Flame,
  Trophy,
  ArrowRight,
  Zap,
} from "lucide-react";

const LEARNING_PATHS = [
  {
    href: "/kana",
    label: "Kana",
    sublabel: "Hiragana & Katakana",
    icon: Languages,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    href: "/n5",
    label: "JLPT N5",
    sublabel: "80 kanji · 800 mots",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    href: "/n4",
    label: "JLPT N4",
    sublabel: "170 kanji · 700 mots",
    icon: BookOpen,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    href: "/n3",
    label: "JLPT N3",
    sublabel: "370 kanji · 1500 mots",
    icon: GraduationCap,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
];

export default function DashboardPage() {
  const {
    xp,
    level,
    currentStreak,
    totalReviews,
    totalCorrect,
    kanjiMastered,
    vocabMastered,
    getLevelTitle,
  } = useGamificationStore();

  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bienvenue sur{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            NihongoPath
          </span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Continue ton apprentissage du japonais
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Niveau",
            value: `${level}`,
            sub: getLevelTitle(),
            icon: Zap,
            color: "text-violet-400",
          },
          {
            label: "XP Total",
            value: xp.toLocaleString(),
            sub: "points",
            icon: Trophy,
            color: "text-amber-400",
          },
          {
            label: "Streak",
            value: `${currentStreak}`,
            sub: "jours",
            icon: Flame,
            color: currentStreak >= 7 ? "text-blue-400" : "text-orange-400",
          },
          {
            label: "Précision",
            value: `${accuracy}%`,
            sub: `${totalReviews} révisions`,
            icon: GraduationCap,
            color: "text-emerald-400",
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily goal + streak */}
        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardContent className="p-6 flex justify-center">
              <DailyGoalRing />
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <StreakCalendar activeDays={new Set()} months={2} />
            </CardContent>
          </Card>
        </div>

        {/* Learning paths */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight">
                Parcours d&apos;apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {LEARNING_PATHS.map((path) => (
                <Link key={path.href} href={path.href}>
                  <div className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.01]">
                    <div
                      className={`h-12 w-12 rounded-xl ${path.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <path.icon className={`h-6 w-6 ${path.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{path.label}</p>
                      <p className="text-sm text-muted-foreground">{path.sublabel}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card className="border-border bg-card">
              <CardContent className="p-4 flex items-center gap-4">
                <ProgressRing percent={Math.min(100, (kanjiMastered / 2136) * 100)} size={56} strokeWidth={5}>
                  <span className="text-xs font-bold">{kanjiMastered}</span>
                </ProgressRing>
                <div>
                  <p className="text-sm font-medium">Kanji maîtrisés</p>
                  <p className="text-xs text-muted-foreground">/ 2136 jōyō</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4 flex items-center gap-4">
                <ProgressRing percent={Math.min(100, (vocabMastered / 10000) * 100)} size={56} strokeWidth={5} color="stroke-emerald-500">
                  <span className="text-xs font-bold">{vocabMastered}</span>
                </ProgressRing>
                <div>
                  <p className="text-sm font-medium">Vocab maîtrisé</p>
                  <p className="text-xs text-muted-foreground">/ 10000 mots</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
