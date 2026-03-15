export type JlptLevelId = "n5" | "n4" | "n3" | "n2" | "n1";

export type LevelConfig = {
  id: JlptLevelId;
  label: string;
  description: string;
  kanjiCount: string;
  vocabCount: string;
  grammarCount: string;
};

export const JLPT_LEVELS: Record<JlptLevelId, LevelConfig> = {
  n5: {
    id: "n5",
    label: "JLPT N5",
    description: "Le niveau débutant. Les bases indispensables du japonais.",
    kanjiCount: "80",
    vocabCount: "800+",
    grammarCount: "50",
  },
  n4: {
    id: "n4",
    label: "JLPT N4",
    description: "Niveau élémentaire. Conditionnel, potentiel, passif, causatif.",
    kanjiCount: "170",
    vocabCount: "700+",
    grammarCount: "75",
  },
  n3: {
    id: "n3",
    label: "JLPT N3",
    description: "Niveau intermédiaire. Keigo (politesse), nuances et registres.",
    kanjiCount: "370",
    vocabCount: "1500+",
    grammarCount: "100",
  },
  n2: {
    id: "n2",
    label: "JLPT N2",
    description: "Niveau avancé. Keigo complet, registre formel et académique.",
    kanjiCount: "380",
    vocabCount: "3000+",
    grammarCount: "120",
  },
  n1: {
    id: "n1",
    label: "JLPT N1",
    description: "Niveau supérieur. Littéraire, académique, maîtrise complète.",
    kanjiCount: "1136",
    vocabCount: "4000+",
    grammarCount: "150",
  },
};
