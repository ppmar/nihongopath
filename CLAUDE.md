# CLAUDE.md — NihongoPath

## Projet

Site web d'apprentissage du japonais pour débutant absolu, structuré par niveaux JLPT (N5 → N1). Hébergé sur Vercel. L'utilisateur ne connaît rien : ni hiragana, ni katakana, ni kanji, ni grammaire. Progression sauvegardée dans Supabase. Système gamifié complet (XP, niveaux, streaks, achievements).

---

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS v4
- **Composants UI** : shadcn/ui comme base, customisés avec l'esthétique 21st.dev (voir section Design)
- **Animations** : Framer Motion (transitions, tracés de caractères, micro-interactions, confetti rewards)
- **Auth + DB** : Supabase (auth magiclink/OAuth Google + PostgreSQL + Row Level Security)
- **State client** : Zustand (store global synchronisé avec Supabase)
- **Déploiement** : Vercel
- **Données statiques** : fichiers JSON dans `/data/`
- **Polices** : Noto Sans JP + Inter (Google Fonts)
- **Icônes** : Lucide React

---

## Design — Philosophie 21st.dev

### Principes directeurs

Le frontend doit avoir l'esthétique premium de 21st.dev : clean, spacieux, avec des micro-interactions soignées. Pas de UI "scolaire" ou "gamifiée cheap". Penser Duolingo × Linear × Raycast.

### Direction visuelle

- **Palette** : fond noir/gris très sombre (`#09090b`, `#18181b`) en dark mode (défaut), fond blanc cassé en light mode. Accent principal : violet/indigo (`#8b5cf6` → `#6d28d9`). Accent secondaire : ambre/or pour les récompenses (`#f59e0b`).
- **Glassmorphism subtil** : cartes avec `backdrop-blur-xl bg-white/5 border border-white/10` en dark mode. Ne pas en abuser — réserver aux éléments flottants (modals, tooltips, cards premium).
- **Typographie** : Inter pour l'UI, Noto Sans JP pour le japonais. Tailles généreuses. Titres en `font-semibold tracking-tight`. Corps en `text-muted-foreground`.
- **Espacements** : généreux. `p-6` minimum sur les cartes. `gap-6` entre sections. L'air respire.
- **Radius** : `rounded-xl` sur les cartes, `rounded-lg` sur les boutons, `rounded-full` sur les badges/avatars.
- **Ombres** : subtiles en light mode (`shadow-sm`), absentes en dark mode (utiliser les bordures lumineuses).
- **Transitions** : tout a `transition-all duration-200`. Hover = léger scale (`hover:scale-[1.02]`) + changement d'opacité/border.
- **Gradients** : texte gradient sur les titres importants (`bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent`). Fond gradient subtil sur le hero.

### Composants 21st.dev style

- **Cards** : bord lumineux subtil, hover glow effect. Structure : icône/emoji top-left, titre bold, description muted, CTA ou stat en bas.
- **Progress bars** : fines, avec gradient animé et glow. Pas de barres épaisses moches.
- **Badges/pills** : `rounded-full px-3 py-1 text-xs font-medium` avec fond semi-transparent de la couleur du badge.
- **Boutons** : primaire = fond gradient violet avec hover glow. Secondaire = ghost avec border subtle. Pas de boutons plats ennuyeux.
- **Modals/Dialogs** : backdrop blur, entrée avec spring animation (Framer Motion), bord lumineux.
- **Toast notifications** : slide-in depuis le bas-droite, glassmorphism, auto-dismiss 3s. Utiliser sonner.
- **Navigation** : sidebar collapsible sur desktop, bottom nav sur mobile. Items avec icônes Lucide, indicateur actif = pill violette. Badge de notification pour les révisions dues.
- **Tableaux/Grilles** : alternance subtile de lignes, hover highlight, pas de bordures lourdes.

### Micro-interactions obligatoires

- Clic sur un kana/kanji : léger bounce + ripple
- Bonne réponse quiz : confetti burst (canvas-confetti, léger) + flash vert + +XP animé
- Mauvaise réponse : shake horizontal + flash rouge (pas punitif, encourageant)
- Level up : modal fullscreen avec animation particules + nouveau badge
- Streak maintenu : animation flamme dans le header
- Achievement débloqué : toast spécial avec slide-in doré + son subtil (optionnel)
- Transition entre pages : fade + slide (Framer Motion AnimatePresence)

### Responsive

- **Mobile-first** (c'est le device principal pour l'apprentissage)
- Bottom navigation sur mobile (5 items max : Home, Learn, Practice, Stats, Profile)
- Sidebar collapsible sur desktop (>1024px)
- Cards en grille responsive : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Touch targets : minimum 44px

---

## Architecture du site

```
src/
├── app/
│   ├── page.tsx                        # Landing marketing si non-auth / Dashboard si auth
│   ├── layout.tsx                      # Root layout (providers, fonts, theme)
│   ├── (auth)/
│   │   ├── login/page.tsx              # Login magiclink + Google OAuth
│   │   └── callback/page.tsx           # Supabase auth callback
│   ├── (app)/                          # Route group — tout le contenu authentifié
│   │   ├── layout.tsx                  # App shell (sidebar/nav, XP bar, streak)
│   │   ├── dashboard/page.tsx          # Hub principal — stats, daily goals, continue learning
│   │   ├── profile/page.tsx            # Profil, stats globales, achievements, settings
│   │   ├── leaderboard/page.tsx        # Classement (optionnel, si multi-user)
│   │   ├── kana/
│   │   │   ├── page.tsx                # Hub kana — progression hiragana/katakana
│   │   │   ├── hiragana/page.tsx       # Apprentissage hiragana
│   │   │   └── katakana/page.tsx       # Apprentissage katakana
│   │   ├── n5/
│   │   │   ├── page.tsx                # Dashboard N5 — progression par section
│   │   │   ├── kanji/page.tsx          # Kanji N5 (~80)
│   │   │   ├── vocabulary/page.tsx     # Vocab N5 (~800)
│   │   │   ├── grammar/page.tsx        # Grammaire N5 (~75 points)
│   │   │   └── practice/page.tsx       # Quiz/exercices N5
│   │   ├── n4/ ...                     # Même structure
│   │   ├── n3/ ...
│   │   ├── n2/ ...
│   │   └── n1/ ...
│   └── api/                            # Route handlers si besoin
├── components/
│   ├── ui/                             # shadcn/ui base (button, card, dialog, etc.)
│   ├── layout/
│   │   ├── Sidebar.tsx                 # Nav desktop avec progression
│   │   ├── BottomNav.tsx               # Nav mobile
│   │   ├── XPBar.tsx                   # Barre XP animée header
│   │   └── StreakIndicator.tsx         # Flamme streak header
│   ├── learning/
│   │   ├── KanjiCard.tsx               # Carte kanji premium (flip, tracé, readings)
│   │   ├── KanaGrid.tsx                # Grille interactive hiragana/katakana
│   │   ├── VocabList.tsx               # Liste vocab filtrable
│   │   ├── GrammarPoint.tsx            # Bloc grammaire avec exemples
│   │   ├── StrokeOrder.tsx             # Animation SVG ordre des traits
│   │   └── FlashcardDeck.tsx           # Flashcards SRS avec swipe
│   ├── practice/
│   │   ├── QuizEngine.tsx              # Moteur quiz multi-format
│   │   ├── MCQCard.tsx                 # QCM avec animations
│   │   ├── TypeAnswer.tsx              # Saisie libre
│   │   ├── MatchPairs.tsx              # Association drag-and-drop
│   │   └── FillBlank.tsx               # Phrases à trous
│   ├── gamification/
│   │   ├── LevelUpModal.tsx            # Modal level up fullscreen
│   │   ├── AchievementToast.tsx        # Toast achievement doré
│   │   ├── XPGainAnimation.tsx         # +XP flottant animé
│   │   ├── StreakCalendar.tsx          # Calendrier streak (GitHub-style)
│   │   ├── BadgeGrid.tsx               # Grille des achievements
│   │   └── DailyGoalRing.tsx           # Anneau progression daily goal
│   └── common/
│       ├── SearchBar.tsx               # Recherche globale (Cmd+K)
│       ├── ProgressRing.tsx            # Anneau circulaire réutilisable
│       └── ConfettiExplosion.tsx       # Confetti on success
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # Browser client
│   │   ├── server.ts                   # Server client (SSR)
│   │   ├── middleware.ts               # Auth middleware
│   │   └── types.ts                    # Types du schema
│   ├── stores/
│   │   ├── useProgressStore.ts         # Zustand — progression sync Supabase
│   │   ├── useGamificationStore.ts     # Zustand — XP, level, streaks
│   │   └── useSettingsStore.ts         # Zustand — préférences UI
│   ├── gamification/
│   │   ├── xp.ts                       # Calculs XP, level thresholds
│   │   ├── achievements.ts             # Définitions + logique unlock
│   │   ├── streaks.ts                  # Streak timezone-aware
│   │   └── srs.ts                      # Algorithme SM-2 modifié
│   └── utils.ts
├── data/
│   ├── hiragana.json
│   ├── katakana.json
│   ├── n5/ (kanji.json, vocabulary.json, grammar.json)
│   ├── n4/ ...
│   ├── n3/ ...
│   ├── n2/ ...
│   └── n1/ ...
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

## Supabase — Schema DB

```sql
-- Profil utilisateur (extension de auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Progression d'apprentissage par item
CREATE TABLE public.learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('hiragana', 'katakana', 'kanji', 'vocabulary', 'grammar')),
  item_id TEXT NOT NULL,               -- ex: "日", "n5-grammar-001", "あ"
  jlpt_level TEXT CHECK (jlpt_level IN ('kana', 'n5', 'n4', 'n3', 'n2', 'n1')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'reviewing', 'mastered')),
  ease_factor REAL DEFAULT 2.5,        -- SRS SM-2
  interval_days INTEGER DEFAULT 0,
  next_review TIMESTAMPTZ,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  last_reviewed TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Gamification
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_reviews INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,
  kanji_mastered INTEGER DEFAULT 0,
  vocab_mastered INTEGER DEFAULT 0,
  grammar_learned INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Sessions d'étude
CREATE TABLE public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('learn', 'review', 'quiz')),
  jlpt_level TEXT NOT NULL,
  item_type TEXT NOT NULL,
  items_studied INTEGER DEFAULT 0,
  items_correct INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Daily goals
CREATE TABLE public.daily_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  goal_items INTEGER DEFAULT 20,
  completed_items INTEGER DEFAULT 0,
  goal_met BOOLEAN DEFAULT false,
  UNIQUE(user_id, date)
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own data" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage own progress" ON public.learning_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own stats" ON public.user_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own achievements" ON public.user_achievements FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own sessions" ON public.study_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own goals" ON public.daily_goals FOR ALL USING (auth.uid() = user_id);

-- Auto-create profile + stats on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  INSERT INTO public.user_stats (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index
CREATE INDEX idx_progress_user_review ON public.learning_progress(user_id, next_review);
CREATE INDEX idx_progress_user_type ON public.learning_progress(user_id, item_type, jlpt_level);
CREATE INDEX idx_sessions_user_date ON public.study_sessions(user_id, created_at);
CREATE INDEX idx_daily_goals_user_date ON public.daily_goals(user_id, date);
```

### Auth

- Magic link (email) principal + Google OAuth
- Pas de username/password
- Trigger DB crée profil + user_stats automatiquement à l'inscription

---

## Système de gamification

### XP

| Action | XP |
|---|---|
| Nouveau kana | +5 |
| Nouveau kanji | +15 |
| Nouveau mot vocab | +10 |
| Nouveau point grammaire | +20 |
| Bonne réponse révision SRS | +5 |
| Bonne réponse quiz | +10 |
| Combo 5 d'affilée | +25 bonus |
| Combo 10 d'affilée | +50 bonus |
| Session terminée | +30 |
| Daily goal atteint | +50 |
| Streak bonus (par jour, cap 7) | +10×streak |

### Niveaux

Le level gamifié ≠ JLPT. Progression exponentielle douce.

```typescript
const XP_FOR_LEVEL = (level: number) => 100 * level * (level + 1) / 2;
// L1: 0    L5: 1500    L10: 5500    L25: 32500    L50: 127500

const LEVEL_TITLES: Record<number, string> = {
  1: "見習い (Apprenti)",      5: "初心者 (Débutant)",
  10: "学生 (Étudiant)",       15: "読者 (Lecteur)",
  20: "知識人 (Érudit)",       25: "達人 (Maître)",
  30: "先生 (Sensei)",         40: "仙人 (Sage)",
  50: "言語神 (Dieu des Langues)",
};
```

### Streaks

- 1 session/jour minimum = streak maintenu
- Pas de freeze. Manqué = reset. Discipline.
- Flamme animée header, couleur variable :
  - 1-6j : orange | 7-29j : bleu | 30-99j : violet | 100+ : doré + particules
- Calendrier GitHub contribution graph sur la page profil

### Achievements

```typescript
const ACHIEVEMENTS = [
  // KANA
  { id: 'hiragana_complete', name: 'Hiragana Master', nameJp: 'ひらがなの達人', rarity: 'common' },
  { id: 'katakana_complete', name: 'Katakana Master', nameJp: 'カタカナの達人', rarity: 'common' },
  { id: 'kana_complete', name: 'Kana Conqueror', nameJp: '仮名征服者', rarity: 'rare' },
  // KANJI
  { id: 'first_kanji', name: 'Premier Trait', nameJp: '一画', rarity: 'common' },
  { id: 'kanji_10', name: 'Dix Symboles', nameJp: '十文字', rarity: 'common' },
  { id: 'kanji_50', name: 'Demi-Centurion', nameJp: '半百', rarity: 'common' },
  { id: 'kanji_100', name: 'Centurion', nameJp: '百字', rarity: 'rare' },
  { id: 'kanji_500', name: 'Scholar', nameJp: '学者', rarity: 'epic' },
  { id: 'kanji_1000', name: 'Sage des Kanji', nameJp: '漢字仙人', rarity: 'epic' },
  { id: 'kanji_2136', name: 'Jōyō Complete', nameJp: '常用漢字制覇', rarity: 'legendary' },
  // JLPT
  { id: 'n5_complete', name: 'JLPT N5 Ready', nameJp: 'N5合格', rarity: 'rare' },
  { id: 'n4_complete', name: 'JLPT N4 Ready', nameJp: 'N4合格', rarity: 'rare' },
  { id: 'n3_complete', name: 'JLPT N3 Ready', nameJp: 'N3合格', rarity: 'epic' },
  { id: 'n2_complete', name: 'JLPT N2 Ready', nameJp: 'N2合格', rarity: 'epic' },
  { id: 'n1_complete', name: 'JLPT N1 Ready', nameJp: 'N1合格', rarity: 'legendary' },
  // STREAKS
  { id: 'streak_7', name: 'Semaine Parfaite', nameJp: '一週間', rarity: 'common' },
  { id: 'streak_30', name: 'Mois de Fer', nameJp: '鉄の月', rarity: 'rare' },
  { id: 'streak_100', name: 'Centenaire', nameJp: '百日', rarity: 'epic' },
  { id: 'streak_365', name: 'Année du Dragon', nameJp: '龍の年', rarity: 'legendary' },
  // QUIZ
  { id: 'perfect_quiz', name: 'Sans Faute', nameJp: '完璧', rarity: 'rare' },
  { id: 'combo_20', name: 'Combo Master', nameJp: '連続の達人', rarity: 'epic' },
  { id: 'reviews_1000', name: 'Réviseur Éternel', nameJp: '永遠の復習者', rarity: 'epic' },
  // FUN
  { id: 'night_owl', name: 'Hibou Nocturne', nameJp: 'ふくろう', rarity: 'common' },
  { id: 'early_bird', name: 'Lève-Tôt', nameJp: '早起き鳥', rarity: 'common' },
  { id: 'speed_demon', name: 'Démon de Vitesse', nameJp: '速度悪魔', rarity: 'rare' },
];
```

Rarity badge colors : common = gris, rare = bleu, epic = violet, legendary = doré avec glow.

### Daily Goals

- Objectif configurable : 10 / 20 / 30 / 50 items/jour
- Anneau de progression Apple Watch-style, animé
- Complétion → animation + 50 XP bonus
- Historique 30 jours visible dans le profil

---

## Structure des données JSON

### hiragana.json / katakana.json

```json
[
  { "kana": "あ", "romaji": "a", "row": "vowel", "mnemonique": "Ressemble à un 'a' avec une barre" }
]
```

### kanji.json (par niveau)

```json
[
  {
    "kanji": "日",
    "meanings": ["jour", "soleil"],
    "onyomi": ["ニチ", "ジツ"],
    "kunyomi": ["ひ", "か"],
    "strokes": 4,
    "frequency_rank": 1,
    "jlpt": "N5",
    "examples": [
      { "word": "日本", "reading": "にほん", "meaning": "Japon" },
      { "word": "今日", "reading": "きょう", "meaning": "aujourd'hui" }
    ],
    "radical": "日",
    "mnemonique": "Un soleil dans un cadre"
  }
]
```

### vocabulary.json (par niveau)

```json
[
  {
    "word": "食べる", "reading": "たべる", "meaning": "manger",
    "pos": "verb-ichidan", "jlpt": "N5",
    "example_sentence": { "jp": "りんごを食べる。", "reading": "りんごをたべる。", "fr": "Manger une pomme." },
    "tags": ["nourriture", "quotidien"]
  }
]
```

### grammar.json (par niveau)

```json
[
  {
    "id": "n5-grammar-001", "pattern": "〜は〜です", "meaning": "X est Y (politesse)",
    "explanation": "は (wa) marque le thème, です (desu) est la copule polie.",
    "examples": [{ "jp": "私は学生です。", "reading": "わたしはがくせいです。", "fr": "Je suis étudiant." }],
    "notes": "は se prononce 'wa' quand particule",
    "related": ["〜じゃないです", "〜ではありません"]
  }
]
```

---

## Contenu par niveau JLPT

**Pré-niveau : Kana** — Hiragana 46 + combinaisons (~104), Katakana idem. Grille interactive → quiz → SRS.

**N5** — 80 kanji, 800 vocab, 75 grammaire. Thèmes : salutations, nombres, temps, famille, nourriture, couleurs, transport.

**N4** — +170 kanji (250 total), +700 vocab (1500), +75 grammaire. Conditionnel, potentiel, passif, causatif.

**N3** — +370 kanji (620), +1500 vocab (3000), +100 grammaire. Keigo intro, nuances.

**N2** — +380 kanji (1000), +3000 vocab (6000), +120 grammaire. Keigo complet, registre formel.

**N1** — +1136 kanji (2136 jōyō complets), +4000 vocab (10000), +150 grammaire. Littéraire, académique.

---

## Algorithme SRS — SM-2 modifié

```typescript
function updateSRS(card: SRSCard, quality: number): SRSCard {
  // quality: 0-5 (0=blackout, 5=parfait)
  const newEase = Math.max(1.3,
    card.ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  let newInterval: number;
  if (quality < 3) newInterval = 1;
  else if (card.review_count === 0) newInterval = 1;
  else if (card.review_count === 1) newInterval = 3;
  else newInterval = Math.round(card.interval_days * newEase);

  return {
    ease_factor: newEase,
    interval_days: newInterval,
    review_count: quality >= 3 ? card.review_count + 1 : 0,
    next_review: addDays(new Date(), newInterval),
  };
}
```

---

## Plan d'implémentation

### Phase 1 — Fondations + Auth + DB

1. `npx create-next-app@latest nihongo-path --typescript --tailwind --app --src-dir`
2. `npm i @supabase/supabase-js @supabase/ssr zustand framer-motion lucide-react sonner canvas-confetti`
3. `npx shadcn@latest init` + composants : button, card, dialog, badge, progress, input, tabs, tooltip, dropdown-menu, avatar, separator, sheet
4. Supabase : créer projet, exécuter migration, env vars
5. Auth (magiclink + Google OAuth) + middleware routes protégées
6. Layout global : fonts, theme provider (dark défaut)
7. App shell : Sidebar + BottomNav + XPBar + StreakIndicator

### Phase 2 — Gamification engine

8. Zustand stores (progress, gamification, settings)
9. Sync Supabase ↔ Zustand (fetch mount, debounced writes)
10. `lib/gamification/` : xp.ts, achievements.ts, streaks.ts, srs.ts
11. Composants gamification : LevelUpModal, AchievementToast, XPGainAnimation, DailyGoalRing
12. Dashboard : daily goal ring, streak calendar, continue learning, stats

### Phase 3 — Kana

13. `hiragana.json` + `katakana.json` complets
14. `KanaGrid` : grille cliquable, rangées, états visuels
15. Pages `/kana/hiragana` et `/kana/katakana`
16. Quiz kana + XP/progression intégrés
17. Test boucle gamification bout en bout

### Phase 4 — N5

18. `n5/kanji.json` (80, triés fréquence), `vocabulary.json` (800), `grammar.json` (75)
19. KanjiCard : flip, tracé SVG, readings, exemples
20. VocabList : filtres, recherche, furigana toggle
21. GrammarPoint : exemples interactifs
22. Dashboard N5 : progress rings par section
23. QuizEngine + FlashcardDeck avec SRS

### Phase 5 — N4 à N1

24. JSON pour N4-N1
25. Template dynamique par niveau (une implémentation, données variables)
26. Quiz avancés : MatchPairs, FillBlank

### Phase 6 — Polish

27. SearchBar (Cmd+K)
28. Profil complet : stats, streak calendar, badges, settings
29. Animations Framer Motion partout
30. Responsive audit (375px, 390px, 428px)
31. SEO + PWA
32. Deploy Vercel

---

## Kanji par fréquence

Corpus Mainichi Shimbun. Les 100 premiers = ~40% des textes, les 500 premiers = ~80%.

Top 20 : 日 一 国 人 年 大 十 二 本 中 長 出 三 時 行 見 月 分 後 前

---

## Conventions

- Composants PascalCase, exports nommés
- JSON snake_case
- Conventional commits (`feat:`, `fix:`, `data:`, `style:`)
- Interface + pédagogie en français
- Exemples JP : kanji + reading + traduction FR
- Mobile-first (375px)
- Pas de `any` TypeScript
- Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY` côté client

## Git + Déploiement

- **Repo** : `git@github.com:ppmar/Japonais.git`
- **SSH key** : `ssh-add ~/.ssh/sshkey` avant tout push
- **Commits** : conventional commits, pas de mention de Claude/AI dans les messages de commit
- **Deploy** : push sur GitHub → Vercel auto-deploy

## Env vars

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # Server-side only
```
