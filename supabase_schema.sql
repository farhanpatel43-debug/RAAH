-- ====================================================================
-- RAAH CAREER OS - SUPABASE DATABASE INITIALIZATION SCRIPT
-- Project ID: iosvwfpxfhjechyisarb
-- Supabase Project URL: https://iosvwfpxfhjechyisarb.supabase.co
--
-- HOW TO RUN THIS SCRIPT:
-- 1. Open your Supabase Dashboard:
--    https://supabase.com/dashboard/project/iosvwfpxfhjechyisarb/sql/new
-- 2. Paste this entire script into the SQL Editor.
-- 3. Click "RUN" (green button) in the bottom right corner.
-- 4. That's it! Your tables, indexes, and security rules will be active.
-- ====================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. Table: user_progress
-- Stores user account info, college, career goals, skills, XP & streaks
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  college TEXT,
  degree TEXT,
  branch TEXT,
  current_year TEXT,
  target_career TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  daily_study_time TEXT DEFAULT '2 hours',
  readiness_score INT DEFAULT 50,
  streak_days INT DEFAULT 1,
  xp INT DEFAULT 250,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. Table: activity_logs
-- Tracks user actions: video watched, quiz completed, problem solved, etc.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. Table: quiz_submissions
-- Stores quiz assessment results per student
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  quiz_topic TEXT NOT NULL,
  score_percent INT NOT NULL,
  correct_count INT DEFAULT 0,
  total_questions INT DEFAULT 10,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. Create Indexes for fast querying
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_user_progress_email ON public.user_progress(email);
CREATE INDEX IF NOT EXISTS idx_activity_logs_email ON public.activity_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON public.quiz_submissions(user_email);

-- --------------------------------------------------------------------
-- 5. Enable Row Level Security (RLS)
-- --------------------------------------------------------------------
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------
-- 6. RLS Policies: Allow public / anon access for client apps
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read-write on user_progress" ON public.user_progress;
CREATE POLICY "Allow public read-write on user_progress"
  ON public.user_progress
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read-write on activity_logs" ON public.activity_logs;
CREATE POLICY "Allow public read-write on activity_logs"
  ON public.activity_logs
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read-write on quiz_submissions" ON public.quiz_submissions;
CREATE POLICY "Allow public read-write on quiz_submissions"
  ON public.quiz_submissions
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- --------------------------------------------------------------------
-- 7. Grant schema & table permissions to anon & authenticated roles
-- --------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.user_progress TO anon, authenticated;
GRANT ALL ON TABLE public.activity_logs TO anon, authenticated;
GRANT ALL ON TABLE public.quiz_submissions TO anon, authenticated;

-- Confirmation output
SELECT 'Supabase database for RAAH Career OS has been successfully initialized!' AS status;
