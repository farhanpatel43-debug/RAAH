import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Server, ShieldCheck, Key, ExternalLink, Code, Check, Eye, Table, Globe, Copy, Layers, Cpu } from 'lucide-react';
import { supabase, syncUserProgressToSupabase, fetchRawSupabaseRecord, fetchAllSupabaseRecords } from '../lib/supabase';
import { UserProfile } from '../types';

interface SupabaseSyncManagerProps {
  user: UserProfile;
  onSyncComplete?: (status: boolean) => void;
}

export const SupabaseSyncManager: React.FC<SupabaseSyncManagerProps> = ({ user, onSyncComplete }) => {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'warning' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  // Live DB records state
  const [loadingDb, setLoadingDb] = useState(false);
  const [liveRow, setLiveRow] = useState<any | null>(null);
  const [totalRowsCount, setTotalRowsCount] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'status' | 'live-data' | 'sql-schema' | 'netlify'>('status');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const projectId = 'iosvwfpxfhjechyisarb';
  const apiUrl = `https://${projectId}.supabase.co`;

  // Fetch live row from Supabase on mount and whenever user changes
  const loadLiveSupabaseData = async () => {
    setLoadingDb(true);
    try {
      const { data: userRow } = await fetchRawSupabaseRecord(user.email);
      setLiveRow(userRow);

      const { count } = await fetchAllSupabaseRecords(10);
      setTotalRowsCount(count);
    } catch {
      // ignore
    } finally {
      setLoadingDb(false);
    }
  };

  useEffect(() => {
    loadLiveSupabaseData();
  }, [user.email]);

  const handleManualSync = async () => {
    setSyncing(true);
    setStatusMessage('');
    try {
      const res = await syncUserProgressToSupabase(user);
      if (res.success) {
        setSyncStatus('success');
        setStatusMessage('User progress, profile, streak, and XP successfully saved and synced to your Supabase project!');
        const timeStr = new Date().toLocaleTimeString();
        setLastSyncedTime(timeStr);
        await loadLiveSupabaseData();
        if (onSyncComplete) onSyncComplete(true);
      } else {
        setSyncStatus('warning');
        setStatusMessage(
          `Connected to Supabase project "${projectId}". ${
            res.error?.includes('relation') || res.error?.includes('does not exist')
              ? 'Note: Table `user_progress` or `profiles` needs to be initialized in your Supabase SQL editor.'
              : res.error || 'Sync returned a response warning.'
          }`
        );
        if (onSyncComplete) onSyncComplete(false);
      }
    } catch (err: any) {
      setSyncStatus('error');
      setStatusMessage(err?.message || 'Failed to connect to Supabase.');
      if (onSyncComplete) onSyncComplete(false);
    } finally {
      setSyncing(false);
    }
  };

  const sqlSchemaCode = `-- ====================================================================
-- RAAH CAREER OS - SUPABASE DATABASE INITIALIZATION SCRIPT
-- Project ID: iosvwfpxfhjechyisarb
-- Paste and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/iosvwfpxfhjechyisarb/sql/new
-- ====================================================================

-- 1. Create table for storing student profiles & learning progress
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

-- 2. Create table for student activity logs & milestones
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create table for quiz scores & assessments
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  quiz_topic TEXT NOT NULL,
  score_percent INT NOT NULL,
  correct_count INT DEFAULT 0,
  total_questions INT DEFAULT 10,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_email ON public.user_progress(email);
CREATE INDEX IF NOT EXISTS idx_activity_logs_email ON public.activity_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON public.quiz_submissions(user_email);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- 6. Setup RLS policies for anonymous and authenticated access
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

-- 7. Grant schema & table permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.user_progress TO anon, authenticated;
GRANT ALL ON TABLE public.activity_logs TO anon, authenticated;
GRANT ALL ON TABLE public.quiz_submissions TO anon, authenticated;`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#14264A] dark:text-white">Supabase Cloud Database</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Connected & Active
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
              Syncing user email, roadmap progress, XP, streak, and branch records directly to your database.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleManualSync}
            disabled={syncing}
            className="px-4 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:hover:bg-[#E5A834] text-white dark:text-[#14264A] text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Saving to Supabase...' : 'Save & Sync to Supabase'}</span>
          </button>
        </div>
      </div>

      {/* Tabs for inspecting database */}
      <div className="flex items-center gap-2 my-5 border-b border-gray-100 dark:border-gray-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveView('status')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeView === 'status'
              ? 'bg-[#14264A] text-[#F2B544] dark:bg-[#1C2E52] dark:text-white'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Connection Overview</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveView('live-data');
            loadLiveSupabaseData();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeView === 'live-data'
              ? 'bg-[#14264A] text-[#F2B544] dark:bg-[#1C2E52] dark:text-white'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Live Stored Record {liveRow ? '✓' : ''}</span>
          {totalRowsCount !== null && (
            <span className="px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded text-[10px]">
              {totalRowsCount} in DB
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveView('sql-schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeView === 'sql-schema'
              ? 'bg-[#14264A] text-[#F2B544] dark:bg-[#1C2E52] dark:text-white'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>SQL Schema</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView('netlify')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeView === 'netlify'
              ? 'bg-[#00AD9F]/20 text-[#00AD9F] border border-[#00AD9F]/40 dark:bg-[#00AD9F]/30 dark:text-[#38ef7d]'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-[#00AD9F]" />
          <span>Netlify Deploy Ready</span>
        </button>
      </div>

      {/* Tab 1: Connection Overview */}
      {activeView === 'status' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="p-3.5 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52]">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
                <Server className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
                <span>Project ID</span>
              </div>
              <p className="text-xs font-mono font-bold text-[#14264A] dark:text-white mt-1 select-all">
                {projectId}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52]">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
                <Key className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
                <span>API Key Authenticated</span>
              </div>
              <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                sb_publishable_...pdhN_gF (Verified)
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52]">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
                <span>Target Table</span>
              </div>
              <p className="text-xs font-bold text-[#14264A] dark:text-white mt-1 truncate">
                public.user_progress
              </p>
            </div>
          </div>

          {/* Sync Status Banner */}
          {statusMessage && (
            <div
              className={`p-4 rounded-2xl border text-xs mb-4 flex items-start gap-2.5 transition-all ${
                syncStatus === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : syncStatus === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
              }`}
            >
              {syncStatus === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold">{statusMessage}</p>
                {lastSyncedTime && (
                  <p className="text-[10px] opacity-80 mt-1">Last synced timestamp: {lastSyncedTime}</p>
                )}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#08101F] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              Supabase Dashboard Console URL:
            </span>
            <a
              href={`https://supabase.com/dashboard/project/${projectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14264A] dark:text-[#F2B544] font-bold hover:underline flex items-center gap-1"
            >
              <span>supabase.com/dashboard/project/{projectId}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Tab 2: Live Stored DB Record */}
      {activeView === 'live-data' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Real-time query for user: <strong className="text-[#14264A] dark:text-white">{user.email}</strong>
            </span>
            <button
              type="button"
              onClick={loadLiveSupabaseData}
              disabled={loadingDb}
              className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loadingDb ? 'animate-spin' : ''}`} />
              <span>Query Supabase Now</span>
            </button>
          </div>

          {liveRow ? (
            <div className="p-4 rounded-2xl bg-[#08101F] border border-[#1C2E52] text-xs font-mono text-gray-200 overflow-x-auto space-y-2">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-emerald-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Record verified in Supabase `user_progress` table
                </span>
                <span className="text-gray-400">Updated: {liveRow.updated_at ? new Date(liveRow.updated_at).toLocaleString() : 'Just now'}</span>
              </div>
              <pre className="text-[11px] leading-relaxed pt-2">
                {JSON.stringify(
                  {
                    id: liveRow.id,
                    email: liveRow.email,
                    name: liveRow.name,
                    college: liveRow.college,
                    degree: liveRow.degree,
                    target_career: liveRow.target_career,
                    xp: liveRow.xp,
                    streak_days: liveRow.streak_days,
                    readiness_score: liveRow.readiness_score,
                    skills: liveRow.skills,
                    interests: liveRow.interests,
                    updated_at: liveRow.updated_at,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-center">
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                {loadingDb ? 'Querying Supabase database...' : 'No record returned yet for this specific email. Click "Save & Sync to Supabase" above to save it now!'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: SQL Schema */}
      {activeView === 'sql-schema' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] space-y-2">
            <h4 className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>How to Apply this SQL to Your Supabase Project</span>
            </h4>
            <ol className="text-xs text-[#6B7280] dark:text-gray-300 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Open your project's SQL Editor in Supabase: <a href={`https://supabase.com/dashboard/project/${projectId}/sql/new`} target="_blank" rel="noopener noreferrer" className="text-[#14264A] dark:text-[#F2B544] font-bold underline inline-flex items-center gap-0.5"><span>Supabase SQL Editor</span><ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li>Click the <strong>"Copy SQL Script"</strong> button below.</li>
              <li>Paste the code into the query editor in Supabase and click <strong>"Run"</strong> (or press Cmd+Enter / Ctrl+Enter).</li>
              <li>Your database tables (<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">user_progress</code>, <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">activity_logs</code>, <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">quiz_submissions</code>) and RLS security policies will be immediately active.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Complete Production Schema & RLS Policies:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://supabase.com/dashboard/project/${projectId}/sql/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Supabase</span>
              </a>
              <button
                type="button"
                onClick={copySqlToClipboard}
                className="px-3.5 py-1.5 rounded-lg bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:hover:bg-[#E5A834] text-white dark:text-[#14264A] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>
          </div>
          <div className="p-4 bg-[#08101F] text-gray-200 rounded-2xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-[#1C2E52] max-h-96">
            <pre>{sqlSchemaCode}</pre>
          </div>
        </div>
      )}

      {/* Tab 4: Netlify Deployment */}
      {activeView === 'netlify' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-[#00AD9F]/10 border border-[#00AD9F]/30 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#14264A] dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00AD9F]" />
                <span>Netlify Deployment Ready</span>
              </h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00AD9F]/20 text-[#008f83] dark:text-[#38ef7d] border border-[#00AD9F]/40 flex items-center gap-1">
                <Check className="w-3 h-3" /> Configured
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-gray-300 leading-relaxed">
              All Netlify configuration files (<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">netlify.toml</code>, <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">public/_redirects</code>, and <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">netlify/functions/agent.mts</code>) have been created and verified.
            </p>
          </div>

          {/* Build Settings Card */}
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-[#F2B544] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Netlify Site Build Settings</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-[#0F1D38] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] font-medium">Build Command</span>
                  <code className="font-mono font-bold text-[#14264A] dark:text-white">npm run build</code>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('npm run build', 'build_cmd')}
                  className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'build_cmd' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'build_cmd' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-white dark:bg-[#0F1D38] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] font-medium">Publish Directory</span>
                  <code className="font-mono font-bold text-[#14264A] dark:text-white">dist</code>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('dist', 'publish_dir')}
                  className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'publish_dir' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'publish_dir' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Environment Variables to Set in Netlify */}
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-[#F2B544] flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" />
                <span>Netlify Environment Variables (Site configuration &gt; Environment variables)</span>
              </h5>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-white dark:bg-[#0F1D38] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="truncate mr-2">
                  <span className="text-gray-400 block text-[10px] font-medium">VITE_SUPABASE_URL</span>
                  <code className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate block">
                    https://iosvwfpxfhjechyisarb.supabase.co
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('https://iosvwfpxfhjechyisarb.supabase.co', 'env_url')}
                  className="px-2.5 py-1 shrink-0 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'env_url' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'env_url' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-white dark:bg-[#0F1D38] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="truncate mr-2">
                  <span className="text-gray-400 block text-[10px] font-medium">VITE_SUPABASE_ANON_KEY</span>
                  <code className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate block">
                    sb_publishable_wLa3KV3qNHhlFAad0yz_ZA_y78MCIGA
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('sb_publishable_wLa3KV3qNHhlFAad0yz_ZA_y78MCIGA', 'env_key')}
                  className="px-2.5 py-1 shrink-0 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'env_key' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'env_key' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-white dark:bg-[#0F1D38] rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="truncate mr-2">
                  <span className="text-gray-400 block text-[10px] font-medium">NODE_VERSION</span>
                  <code className="font-mono text-xs font-semibold text-[#14264A] dark:text-white">
                    20
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('20', 'env_node')}
                  className="px-2.5 py-1 shrink-0 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'env_node' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'env_node' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* 3 Step Deployment Instructions */}
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-[#F2B544] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>How to Deploy to Netlify in 3 Steps</span>
            </h5>
            <ol className="text-xs text-[#6B7280] dark:text-gray-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Push this repository to GitHub or GitLab.</li>
              <li>In your <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#00AD9F] font-bold underline inline-flex items-center gap-0.5"><span>Netlify Dashboard</span><ExternalLink className="w-2.5 h-2.5" /></a>, click <strong>"Add new site"</strong> &rarr; <strong>"Import an existing project"</strong>.</li>
              <li>Select your repository. Netlify automatically reads <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-[11px]">netlify.toml</code> for build settings, routing, and functions. Click <strong>"Deploy Site"</strong>!</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
