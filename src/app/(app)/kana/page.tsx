import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const KANA_SECTIONS = [
  {
    href: "/kana/hiragana",
    title: "Hiragana",
    titleJp: "ひらがな",
    description: "L'alphabet de base du japonais. Utilisé pour les mots natifs et la grammaire.",
    count: "104 caractères",
    example: "あ い う え お",
  },
  {
    href: "/kana/katakana",
    title: "Katakana",
    titleJp: "カタカナ",
    description: "L'alphabet pour les mots étrangers, noms propres et onomatopées.",
    count: "104 caractères",
    example: "ア イ ウ エ オ",
  },
];

export default function KanaHubPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Kana
          </span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Les deux alphabets syllabiques japonais. Commence par les hiragana.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {KANA_SECTIONS.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="group h-full border-border bg-card hover:border-violet-500/30 transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {section.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-jp">
                      {section.titleJp}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
                <div className="font-jp text-lg tracking-widest text-foreground/80">
                  {section.example}
                </div>
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
