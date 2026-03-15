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
  item_id TEXT NOT NULL,
  jlpt_level TEXT CHECK (jlpt_level IN ('kana', 'n5', 'n4', 'n3', 'n2', 'n1')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'reviewing', 'mastered')),
  ease_factor REAL DEFAULT 2.5,
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

-- Indexes
CREATE INDEX idx_progress_user_review ON public.learning_progress(user_id, next_review);
CREATE INDEX idx_progress_user_type ON public.learning_progress(user_id, item_type, jlpt_level);
CREATE INDEX idx_sessions_user_date ON public.study_sessions(user_id, created_at);
CREATE INDEX idx_daily_goals_user_date ON public.daily_goals(user_id, date);
