"use client";

import { KanaGrid } from "@/components/learning/KanaGrid";
import katakanaData from "@/data/katakana.json";

export default function KatakanaPage() {
  return <KanaGrid data={katakanaData} title="Katakana カタカナ" />;
}
