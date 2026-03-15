"use client";

import { KanaGrid } from "@/components/learning/KanaGrid";
import hiraganaData from "@/data/hiragana.json";

export default function HiraganaPage() {
  return <KanaGrid data={hiraganaData} title="Hiragana ひらがな" />;
}
