# AVANCEMENT — NihongoPath

## État actuel : Phase 1-6 complètes (build OK, prêt pour deploy)

### Phase 1 — Fondations + Layout ✅
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4 + App Router
- [x] Dépendances : Supabase, Zustand, Framer Motion, Lucide, Sonner, canvas-confetti
- [x] shadcn/ui init + composants (button, card, dialog, badge, progress, input, tabs, tooltip, dropdown-menu, avatar, separator, sheet)
- [x] Palette 21st.dev (violet/indigo, ambre, dark mode défaut)
- [x] Polices : Inter + Noto Sans JP
- [x] Root layout avec providers, Toaster, TooltipProvider
- [x] App shell : Sidebar collapsible + BottomNav mobile + XPBar + StreakIndicator
- [x] Landing page marketing (hero gradient, features, CTA, stats)
- [x] Auth stubs (Supabase client/server/middleware, login page, callback)
- [x] .env.local.example

### Phase 2 — Gamification engine ✅
- [x] Zustand stores : useProgressStore, useGamificationStore, useSettingsStore
- [x] Gamification lib : xp.ts, achievements.ts, streaks.ts, srs.ts
- [x] Composants : LevelUpModal, AchievementToast, XPGainAnimation, DailyGoalRing, StreakCalendar, BadgeGrid, ConfettiExplosion, ProgressRing
- [x] Dashboard : stats, daily goal ring, streak calendar, parcours d'apprentissage

### Phase 3 — Kana ✅
- [x] hiragana.json (104 caractères : gojuon, dakuten, handakuten, combos)
- [x] katakana.json (104 caractères)
- [x] KanaGrid composant interactif avec tabs par type
- [x] Hub kana + pages hiragana/katakana

### Phase 4 — N5 ✅
- [x] n5/kanji.json (80 kanji triés par fréquence)
- [x] n5/vocabulary.json (200+ mots essentiels)
- [x] n5/grammar.json (50 points de grammaire)
- [x] Composants : KanjiCard (flip), VocabList (filtrable), GrammarPoint (expandable)
- [x] QuizEngine multi-format avec animations + XP
- [x] Pages N5 : dashboard, kanji, vocabulaire, grammaire, pratique (quiz)

### Phase 5 — N4 à N1 ✅
- [x] Données JSON pour N4, N3, N2, N1 (kanji, vocabulaire, grammaire)
- [x] Pages complètes pour chaque niveau (hub, kanji, vocab, grammaire, pratique)
- [x] Template réutilisable par niveau

### Phase 6 — Polish ✅
- [x] SearchBar (Cmd+K) avec navigation rapide
- [x] Page profil : stats, streak calendar, badges, settings
- [x] Migration SQL Supabase (001_initial_schema.sql)
- [x] SEO metadata

## Routes (33 pages)
```
/ (landing), /login, /callback, /dashboard, /profile,
/kana, /kana/hiragana, /kana/katakana,
/n5, /n5/kanji, /n5/vocabulary, /n5/grammar, /n5/practice,
/n4, /n4/kanji, /n4/vocabulary, /n4/grammar, /n4/practice,
/n3, /n3/kanji, /n3/vocabulary, /n3/grammar, /n3/practice,
/n2, /n2/kanji, /n2/vocabulary, /n2/grammar, /n2/practice,
/n1, /n1/kanji, /n1/vocabulary, /n1/grammar, /n1/practice
```

## Pour activer Supabase
1. Créer un projet sur supabase.com
2. Exécuter `supabase/migrations/001_initial_schema.sql`
3. Configurer Google OAuth dans Authentication > Providers
4. Copier `.env.local.example` → `.env.local` et remplir les clés
5. Redéployer

## Prochaines améliorations possibles
- Enrichir les données vocabulaire (objectif 800 N5, 700 N4, etc.)
- StrokeOrder SVG pour les kanji
- FlashcardDeck avec swipe
- MatchPairs drag-and-drop
- FillBlank phrases à trous
- PWA manifest
- Responsive audit 375px
- Sync Zustand ↔ Supabase quand auth active
- Leaderboard
