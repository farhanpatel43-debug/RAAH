import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

// Supabase configuration provided by user
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://iosvwfpxfhjechyisarb.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_wLa3KV3qNHhlFAad0yz_ZA_y78MCIGA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface UserProgressRecord {
  id?: string;
  email: string;
  name: string;
  college?: string;
  degree?: string;
  branch?: string;
  current_year?: string;
  target_career?: string;
  skills?: string[];
  interests?: string[];
  daily_study_time?: string;
  readiness_score?: number;
  streak_days?: number;
  xp?: number;
  last_active?: string;
  updated_at?: string;
}

export interface ActivityLogRecord {
  id?: string;
  user_email: string;
  activity_type: 'quiz_completed' | 'problem_solved' | 'roadmap_updated' | 'profile_updated' | 'login' | 'signup';
  details?: Record<string, any>;
  xp_earned?: number;
  created_at?: string;
}

/**
 * Sync full user profile & progress to Supabase
 * Tries tables: `user_progress` or `profiles` or `users`
 */
export async function syncUserProgressToSupabase(user: UserProfile): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      email: user.email.toLowerCase().trim(),
      name: user.name,
      college: user.college,
      degree: user.degree,
      branch: user.branch,
      current_year: user.currentYear,
      target_career: user.targetCareer,
      skills: user.skills,
      interests: user.interests,
      daily_study_time: user.dailyStudyTime,
      readiness_score: user.readinessScore,
      streak_days: user.streakDays,
      xp: user.xp,
      updated_at: new Date().toISOString(),
    };

    // Upsert into user_progress (matching on email)
    const { error } = await supabase
      .from('user_progress')
      .upsert(payload, { onConflict: 'email' });

    if (error) {
      // Fallback try 'profiles' table if user named their table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'email' });

      if (profileError) {
        console.warn('Supabase sync notice:', error.message || profileError.message);
        return { success: false, error: error.message || profileError.message };
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to sync user progress to Supabase:', err);
    return { success: false, error: err?.message || 'Unknown network error' };
  }
}

/**
 * Fetch raw database record from Supabase for live inspection
 */
export async function fetchRawSupabaseRecord(email: string): Promise<{ data: any; error: string | null }> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err?.message || 'Network error' };
  }
}

/**
 * Fetch all stored progress records from Supabase user_progress table
 */
export async function fetchAllSupabaseRecords(limit = 10): Promise<{ data: any[]; count: number | null; error: string | null }> {
  try {
    const { data, error, count } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) {
      return { data: [], count: 0, error: error.message };
    }
    return { data: data || [], count: count ?? (data ? data.length : 0), error: null };
  } catch (err: any) {
    return { data: [], count: 0, error: err?.message || 'Network error' };
  }
}

/**
 * Fetch user progress from Supabase by email
 */
export async function fetchUserProgressFromSupabase(email: string): Promise<UserProfile | null> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error || !data) {
      // Try fallback profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (profileData) {
        return mapSupabaseToUserProfile(profileData);
      }
      return null;
    }

    return mapSupabaseToUserProfile(data);
  } catch (err) {
    console.warn('Error fetching user progress from Supabase:', err);
    return null;
  }
}

/**
 * Log a user action/event (like quiz completed, problem solved, roadmap milestone)
 */
export async function logUserActivityToSupabase(
  email: string,
  activityType: ActivityLogRecord['activity_type'],
  details: Record<string, any> = {},
  xpEarned = 0
): Promise<void> {
  try {
    const record = {
      user_email: email.toLowerCase().trim(),
      activity_type: activityType,
      details,
      xp_earned: xpEarned,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('activity_logs').insert([record]);
    if (error) {
      // Fallback to general 'logs' table if activity_logs is not set
      try {
        await supabase.from('logs').insert([record]);
      } catch {
        // ignore fallback errors
      }
    }
  } catch (err) {
    console.warn('Could not record activity log in Supabase:', err);
  }
}

/**
 * Record quiz completion directly to Supabase
 */
export async function recordQuizSubmissionToSupabase(
  email: string,
  quizTopic: string,
  scorePercent: number,
  correctCount: number,
  totalQuestions: number = 10
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('quiz_submissions').insert([
      {
        user_email: email.toLowerCase().trim(),
        quiz_topic: quizTopic,
        score_percent: scorePercent,
        correct_count: correctCount,
        total_questions: totalQuestions,
        completed_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to submit quiz score' };
  }
}

/**
 * Helper to map DB columns to UserProfile TypeScript interface
 */
function mapSupabaseToUserProfile(data: any): UserProfile {
  return {
    name: data.name || 'Farhan',
    email: data.email,
    college: data.college || 'National Institute of Technology',
    degree: data.degree || 'B.Tech - Artificial Intelligence & Machine Learning (AI/ML)',
    branch: data.branch || 'Artificial Intelligence & Machine Learning (AI/ML)',
    currentYear: data.current_year || '3rd Year',
    targetCareer: data.target_career || 'Data Scientist',
    skills: Array.isArray(data.skills) ? data.skills : ['Python', 'SQL', 'DSA', 'Machine Learning'],
    interests: Array.isArray(data.interests) ? data.interests : ['AI/ML', 'Data Science'],
    dailyStudyTime: data.daily_study_time || '2 hours',
    readinessScore: typeof data.readiness_score === 'number' ? data.readiness_score : 50,
    streakDays: typeof data.streak_days === 'number' ? data.streak_days : 1,
    xp: typeof data.xp === 'number' ? data.xp : 250,
  };
}

/**
 * Sign up with Supabase Auth
 */
export async function signUpWithSupabaseAuth(email: string, password: string, metadata?: Record<string, any>) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Log in with Supabase Auth
 */
export async function loginWithSupabaseAuth(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

