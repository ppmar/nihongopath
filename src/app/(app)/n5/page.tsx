import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Languages, PenTool, GraduationCap } from "lucide-react";

const N5_SECTIONS = [
  {
    href: "/n5/kanji",
    title: "Kanji",
    titleJp: "漢字",
    description: "80 kanji essentiels triés par fréquence d'utilisation.",
    count: "80 kanji",
    icon: Languages,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    href: "/n5/vocabulary",
    title: "Vocabulaire",
    titleJp: "語彙",
    description: "Les mots les plus courants pour communiquer au quotidien.",
    count: "800+ mots",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    href: "/n5/grammar",
    title: "Grammaire",
    titleJp: "文法",
    description: "Les structures grammaticales fondamentales du japonais.",
    count: "50 points",
    icon: PenTool,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    href: "/n5/practice",
    title: "Pratique",
    titleJp: "練習",
    description: "Quiz et exercices pour tester tes connaissances N5.",
    count: "Quiz",
    icon: GraduationCap,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
];

export default function N5Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            JLPT N5
          </span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Le niveau débutant. Les bases indispensables du japonais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {N5_SECTIONS.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="group h-full border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`h-10 w-10 rounded-lg ${section.bgColor} flex items-center justify-center`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                  <p className="text-sm text-muted-foreground font-jp">{section.titleJp}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                  {section.count}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
