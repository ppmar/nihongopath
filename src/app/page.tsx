import Link from "next/link";
import { BookOpen, Languages, Trophy, Flame, Zap, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Languages,
    title: "Hiragana & Katakana",
    description: "Apprends les alphabets japonais avec des grilles interactives et des quiz.",
  },
  {
    icon: BookOpen,
    title: "Kanji progressif",
    description: "Du N5 au N1, maîtrise les 2136 jōyō kanji avec mnémoniques et tracés.",
  },
  {
    icon: Zap,
    title: "Révision intelligente",
    description: "Algorithme SRS pour réviser au bon moment et ne rien oublier.",
  },
  {
    icon: Trophy,
    title: "Gamification complète",
    description: "XP, niveaux, achievements et classements pour rester motivé.",
  },
  {
    icon: Flame,
    title: "Streaks quotidiennes",
    description: "Maintiens ta série d'étude et débloque des récompenses.",
  },
  {
    icon: GraduationCap,
    title: "JLPT N5 → N1",
    description: "Contenu structuré par niveau pour préparer les examens officiels.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            NihongoPath
          </span>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
              >
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 lg:py-40 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Apprends le japonais
            </span>
            <br />
            <span className="text-foreground">de zéro.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Du premier hiragana au JLPT N1. Progression structurée, révision
            intelligente et gamification pour ne jamais décrocher.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-lg px-8 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-violet-500/25"
              >
                Commencer gratuitement
              </Button>
            </Link>
            <Link href="/kana">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 h-12 hover:scale-[1.02] transition-all duration-200"
              >
                Découvrir les kana
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-16 text-center">
            {[
              { value: "2136", label: "Kanji" },
              { value: "10000+", label: "Mots" },
              { value: "N5→N1", label: "Niveaux JLPT" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">
          Tout ce qu&apos;il faut pour{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            réussir
          </span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Une méthode complète, structurée et motivante pour apprendre le japonais
          pas à pas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card hover:border-violet-500/30 hover:bg-card/80 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                <feature.icon className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Rejoins NihongoPath et commence ton voyage vers la maîtrise du
            japonais dès aujourd&apos;hui.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="text-lg px-8 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
            >
              C&apos;est parti !
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <span className="font-medium bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            NihongoPath
          </span>{" "}
          — Apprends le japonais, un kana à la fois.
        </div>
      </footer>
    </div>
  );
}
