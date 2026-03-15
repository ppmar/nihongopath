import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Languages, PenTool, GraduationCap } from "lucide-react";
import { JLPT_LEVELS } from "@/lib/levels";

const level = JLPT_LEVELS.n4;

const SECTIONS = [
  { href: "/n4/kanji", title: "Kanji", titleJp: "漢字", description: `${level.kanjiCount} kanji de niveau N4.`, count: `${level.kanjiCount} kanji`, icon: Languages, color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { href: "/n4/vocabulary", title: "Vocabulaire", titleJp: "語彙", description: `Vocabulaire courant pour le N4.`, count: `${level.vocabCount} mots`, icon: BookOpen, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { href: "/n4/grammar", title: "Grammaire", titleJp: "文法", description: `Structures grammaticales N4.`, count: `${level.grammarCount} points`, icon: PenTool, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { href: "/n4/practice", title: "Pratique", titleJp: "練習", description: "Quiz et exercices N4.", count: "Quiz", icon: GraduationCap, color: "text-amber-400", bgColor: "bg-amber-500/10" },
];

export default function N4Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{level.label}</span>
        </h1>
        <p className="text-muted-foreground mt-1">{level.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="group h-full border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`h-10 w-10 rounded-lg ${s.bgColor} flex items-center justify-center`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                </div>
                <div><h2 className="text-xl font-semibold tracking-tight">{s.title}</h2><p className="text-sm text-muted-foreground font-jp">{s.titleJp}</p></div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">{s.count}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
