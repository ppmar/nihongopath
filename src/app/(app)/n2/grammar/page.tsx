"use client";
import { GrammarPoint } from "@/components/learning/GrammarPoint";
import grammarData from "@/data/n2/grammar.json";
export default function N2GrammarPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Grammaire N2 <span className="text-muted-foreground font-normal text-lg">文法</span></h1><p className="text-sm text-muted-foreground mt-1">{grammarData.length} points de grammaire</p></div>
      <div className="space-y-3">{grammarData.map((point) => (<GrammarPoint key={point.id} data={point} />))}</div>
    </div>
  );
}
