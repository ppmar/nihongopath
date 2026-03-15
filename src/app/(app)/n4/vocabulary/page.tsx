"use client";
import { VocabList } from "@/components/learning/VocabList";
import vocabData from "@/data/n4/vocabulary.json";
export default function N4VocabularyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Vocabulaire N4 <span className="text-muted-foreground font-normal text-lg">語彙</span></h1><p className="text-sm text-muted-foreground mt-1">{vocabData.length} mots</p></div>
      <VocabList data={vocabData} />
    </div>
  );
}
