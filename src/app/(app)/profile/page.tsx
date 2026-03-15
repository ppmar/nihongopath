"use client";

import { useGamificationStore } from "@/lib/stores/useGamificationStore";
import { useSettingsStore } from "@/lib/stores/useSettingsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProgressRing } from "@/components/common/ProgressRing";
import { StreakCalendar } from "@/components/gamification/StreakCalendar";
import { BadgeGrid } from "@/components/gamification/BadgeGrid";
import { DailyGoalRing } from "@/components/gamification/DailyGoalRing";
import {
  Flame,
  Trophy,
  Zap,
  GraduationCap,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Target,
} from "lucide-react";

export default function ProfilePage() {
  const {
    xp,
    level,
    currentStreak,
    longestStreak,
    totalReviews,
    totalCorrect,
    kanjiMastered,
    vocabMastered,
    grammarLearned,
    unlockedAchievements,
    getLevelTitle,
    getXpProgress,
  } = useGamificationStore();

  const {
    showFurigana,
    showRomaji,
    dailyGoal,
    soundEnabled,
    toggleFurigana,
    toggleRomaji,
    setDailyGoal,
    toggleSound,
  } = useSettingsStore();

  const { percent } = getXpProgress();
  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Profil
          </span>
        </h1>
        <p className="text-muted-foreground">Tes statistiques et réglages</p>
      </div>

      {/* Level + XP card */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProgressRing percent={percent} size={100} strokeWidth={7}>
              <div className="text-center">
                <span className="text-2xl font-bold">{level}</span>
              </div>
            </ProgressRing>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h2 className="text-xl font-semibold">{getLevelTitle()}</h2>
              <p className="text-sm text-muted-foreground">
                {xp.toLocaleString()} XP au total
              </p>
            </div>
            <DailyGoalRing />
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Streak actuel", value: `${currentStreak}j`, icon: Flame, color: "text-orange-400" },
          { label: "Meilleur streak", value: `${longestStreak}j`, icon: Trophy, color: "text-amber-400" },
          { label: "Précision", value: `${accuracy}%`, icon: Zap, color: "text-emerald-400" },
          { label: "Révisions", value: totalReviews.toLocaleString(), icon: GraduationCap, color: "text-blue-400" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-4 text-center space-y-1">
              <stat.icon className={`h-5 w-5 mx-auto ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mastery stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center space-y-2">
            <ProgressRing
              percent={Math.min(100, (kanjiMastered / 2136) * 100)}
              size={64}
              strokeWidth={5}
            >
              <span className="text-sm font-bold">{kanjiMastered}</span>
            </ProgressRing>
            <p className="text-xs text-muted-foreground">Kanji maîtrisés</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center space-y-2">
            <ProgressRing
              percent={Math.min(100, (vocabMastered / 10000) * 100)}
              size={64}
              strokeWidth={5}
              color="stroke-emerald-500"
            >
              <span className="text-sm font-bold">{vocabMastered}</span>
            </ProgressRing>
            <p className="text-xs text-muted-foreground">Vocabulaire</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center space-y-2">
            <ProgressRing
              percent={Math.min(100, (grammarLearned / 500) * 100)}
              size={64}
              strokeWidth={5}
              color="stroke-blue-500"
            >
              <span className="text-sm font-bold">{grammarLearned}</span>
            </ProgressRing>
            <p className="text-xs text-muted-foreground">Grammaire</p>
          </CardContent>
        </Card>
      </div>

      {/* Streak calendar */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-medium">Calendrier d&apos;activité</CardTitle>
        </CardHeader>
        <CardContent>
          <StreakCalendar activeDays={new Set()} months={3} />
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Achievements</CardTitle>
            <Badge variant="outline">{unlockedAchievements.length} débloqués</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <BadgeGrid unlockedIds={unlockedAchievements} />
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-medium">Réglages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showFurigana ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium">Furigana</p>
                <p className="text-xs text-muted-foreground">Afficher les lectures au-dessus des kanji</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleFurigana}>
              {showFurigana ? "Activé" : "Désactivé"}
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showRomaji ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium">Romaji</p>
                <p className="text-xs text-muted-foreground">Afficher la romanisation</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleRomaji}>
              {showRomaji ? "Activé" : "Désactivé"}
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 className="h-4 w-4 text-muted-foreground" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium">Sons</p>
                <p className="text-xs text-muted-foreground">Effets sonores lors des quiz</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleSound}>
              {soundEnabled ? "Activé" : "Désactivé"}
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Objectif quotidien</p>
                <p className="text-xs text-muted-foreground">Nombre d&apos;items par jour</p>
              </div>
            </div>
            <div className="flex gap-2">
              {([10, 20, 30, 50] as const).map((goal) => (
                <Button
                  key={goal}
                  variant={dailyGoal === goal ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDailyGoal(goal)}
                  className={dailyGoal === goal ? "bg-violet-600 hover:bg-violet-500" : ""}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
