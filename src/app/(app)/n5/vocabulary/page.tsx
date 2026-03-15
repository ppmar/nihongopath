"use client";

import { VocabList } from "@/components/learning/VocabList";
import vocabData from "@/data/n5/vocabulary.json";

export default function N5VocabularyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Vocabulaire N5{" "}
          <span className="text-muted-foreground font-normal text-lg">語彙</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {vocabData.length} mots essentiels pour le JLPT N5
        </p>
      </div>
      <VocabList data={vocabData} />
    </div>
  );
}
