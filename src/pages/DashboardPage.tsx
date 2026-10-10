import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import {
  Flame,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Code2,
  FolderGit2,
  UserCheck,
  CheckCircle2,
  GraduationCap,
  Layers,
  Sparkles,
  ChevronRight,
  Target,
  Bot,
  Trophy,
  Zap,
  Award,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { getUserLevel, getNextLevel, getXpProgress } from '../data/levelsData';
import { defaultSubjectsAttendance, calculateOverallAttendance } from '../data/attendanceData';
import { FourYearJourneyVisualizer } from '../components/FourYearJourneyVisualizer';

interface DashboardPageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
  onOpenWhatShouldIDo?: () => void;
  onOpenXpLevels?: () => void;
  onOpenStreak?: () => void;
  onOpenCertificate?: () => void;
  onOpenAttendance?: () => void;
  onOpenProjectGenerator?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onNavigate,
  onOpenWhatShouldIDo,
  onOpenXpLevels,
  onOpenStreak,
  onOpenCertificate,
  onOpenAttendance,
  onOpenProjectGenerator,
}) => {
  // Circular progress calculation for readiness
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.readinessScore / 100) * circumference;

  const userLevel = getUserLevel(user.xp);
  const nextLevel = getNextLevel(user.xp);
  const { currentXpInLevel, requiredXpInLevel, percentage: levelPercentage } = getXpProgress(user.xp);
  const overallAttendance = calculateOverallAttendance(defaultSubjectsAttendance);

  const [activeRoadmapView, setActiveRoadmapView] = useState<'cards' | 'journey'>('cards');

  const skillsData = [
    { name: 'Python', progress: 80, color: 'bg-[#14264A] dark:bg-[#F2B544]' },
    { name: 'SQL', progress: 65, color: 'bg-[#1E386D] dark:bg-[#E0A433]' },
    { name: 'Machine Learning', progress: 50, color: 'bg-[#2E4A7D] dark:bg-[#C98E24]' },
    { name: 'Statistics', progress: 40, color: 'bg-[#40629A] dark:bg-[#A3741E]' },
    { name: 'DSA', progress: 30, color: 'bg-[#6B7280] dark:bg-[#7D889E]' },
  ];

  const yearCards = [
    {
      year: 'Year 1',
      title: 'Foundation',
      progress: 100,
      status: 'Completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
      icon: GraduationCap,
    },
    {
      year: 'Year 2',
      title: 'Core CS',
      progress: 100,
      status: 'Completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
      icon: Layers,
    },
    {
      year: 'Year 3',
      title: 'Specialization',
      progress: 60,
      status: 'In Progress',
      badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-[#F2B544] ring-2 ring-[#F2B544]/50',
      icon: Sparkles,
      active: true,
    },
    {
      year: 'Year 4',
      title: 'Placement',
      progress: 10,
      status: 'Upcoming',
      badgeColor: 'bg-gray-50 text-gray-500 dark:bg-gray-800/40 dark:text-gray-400',
      icon: Target,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-[#182235] dark:text-[#F1F5F9]">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white flex items-center gap-2">
            <span>Hello {user.name}</span>
            <span className="text-2xl animate-wave">👋</span>
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            {user.degree} • {user.currentYear} • Target: <strong className="text-[#14264A] dark:text-[#F2B544]">{user.targetCareer}</strong>
          </p>
        </div>

        {/* AI Agent Quick Banner */}
        <div
          onClick={() => onNavigate('ai-agent')}
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#14264A] to-[#1E386D] text-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all group shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F2B544] text-[#14264A] flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#F2B544] flex items-center gap-1">
              RAAH AI Career Advisor <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </p>
            <p className="text-[11px] text-gray-300">Need roadmap advice or interview prep?</p>
          </div>
        </div>
      </div>

      {/* ⚡ 'WHAT SHOULD I DO NOW?' High-Leverage Decision Engine Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#14264A] via-[#1E386D] to-[#0A162C] text-white shadow-xl border-2 border-[#F2B544]/50 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F2B544] text-[#14264A] flex items-center gap-1">
              <Zap className="w-3 h-3 fill-[#14264A]" />
              <span>Smart Recommendation Engine</span>
            </span>
            <span className="text-xs text-gray-300 font-semibold hidden sm:inline">
              Real-Time Next High-Leverage Step
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white">
            Next Action: Complete Machine Learning Chapter 3 Regression Lesson
          </h2>
          <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            Watching this lesson awards <strong className="text-[#F2B544]">+20 XP</strong>, unlocks the Regression Quiz, and brings your Semester 5 core coursework to 100% completion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => onNavigate('learning')}
            className="px-5 py-2.5 bg-[#F2B544] hover:bg-amber-400 text-[#14264A] font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-103 cursor-pointer"
          >
            <span>Start Lesson Now →</span>
          </button>

          <button
            onClick={onOpenWhatShouldIDo}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-[#F2B544]" />
            <span>"What Should I Do Now?" Engine</span>
          </button>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#F2B544]/10 to-transparent pointer-events-none" />
      </div>

      {/* 4 Top Cards (Readiness, XP + Levels, Attendance Margin, Learning Streak) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* CARD 1: Career Readiness Score */}
        <div 
          onClick={() => onNavigate('career-guidance')}
          className="bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:border-[#14264A]/30 dark:hover:border-[#F2B544]/40 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Readiness Score
            </span>
            <span className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] px-2 py-0.5 rounded-full bg-[#EAF0F7] dark:bg-[#14264A]">
              Top 5%
            </span>
          </div>

          <div className="flex items-center justify-center py-3">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100 dark:text-[#1A2E56]"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#F2B544"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-[#14264A] dark:text-white">
                  {user.readinessScore}%
                </span>
                <span className="text-[9px] font-bold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                  Ready
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>Target: {user.targetCareer}</span>
            <span className="font-semibold text-[#14264A] dark:text-[#F2B544] flex items-center gap-1">
              Report <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* CARD 2: XP + Levels Progression */}
        <div
          onClick={onOpenXpLevels}
          className="bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:border-[#F2B544]/60 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              XP + Levels
            </span>
            <span className="text-xs font-black text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
              {userLevel.badge}
            </span>
          </div>

          <div className="py-2 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#14264A] dark:text-white">
                Level {userLevel.level}
              </span>
              <span className="text-xs font-bold text-[#F2B544]">
                {user.xp} XP
              </span>
            </div>
            <p className="text-xs font-extrabold text-[#14264A] dark:text-gray-200">
              {userLevel.title}
            </p>

            <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-[#F2B544] to-amber-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${levelPercentage}%` }}
              />
            </div>

            <p className="text-[10px] text-[#6B7280] dark:text-gray-400 pt-1 flex items-center justify-between">
              <span>{nextLevel ? `${requiredXpInLevel - currentXpInLevel} XP to Lvl ${nextLevel.level}` : 'Max Tier'}</span>
              <span className="font-bold text-[#F2B544]">{levelPercentage}%</span>
            </p>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400">
            <span>Perks: Unlocked Capstone</span>
            <span className="font-semibold text-[#14264A] dark:text-[#F2B544] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Tiers Ladder <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* CARD 3: Attendance That Actually Means Something */}
        <div
          onClick={onOpenAttendance || (() => onNavigate('attendance'))}
          className="bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:border-[#14264A]/30 dark:hover:border-[#F2B544]/40 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              College Attendance
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                overallAttendance.overallPercentage >= 75
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
              }`}
            >
              {overallAttendance.overallPercentage}%
            </span>
          </div>

          <div className="py-2 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#14264A] dark:text-white">
                {overallAttendance.attendedClasses} / {overallAttendance.totalClasses}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Safe Margin ✓
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">
              4/5 subjects safe. Web Tech requires 8 consecutive classes.
            </p>

            <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${overallAttendance.overallPercentage}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400">
            <span>Bunk Margin Safe</span>
            <span className="font-semibold text-[#14264A] dark:text-[#F2B544] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Bunk Calculator <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* CARD 4: Learning Streak */}
        <div
          onClick={onOpenStreak}
          className="bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:border-[#F2B544]/60 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Learning Streak
            </span>
            <div className="w-7 h-7 rounded-full bg-[#FEF6E4] dark:bg-[#2A2312] flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#F2B544] fill-[#F2B544]" />
            </div>
          </div>

          <div className="py-2 text-center">
            <span className="text-4xl font-extrabold text-[#14264A] dark:text-white tracking-tight">
              {user.streakDays} Days
            </span>
            <p className="text-xs font-extrabold text-[#F2B544] mt-1 flex items-center justify-center gap-1">
              <span>1.25x Multiplier Active</span> 🔥
            </p>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400">
            <span>Shield: 1 Available 🛡️</span>
            <span className="font-semibold text-[#14264A] dark:text-[#F2B544] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Streak Center <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* FOUR YEAR JOURNEY VISUALIZATION SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-extrabold text-[#14264A] dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#F2B544]" />
              <span>Four-Year Engineering Journey Visualization</span>
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">
              Interactive timeline tracking your path from Year 1 Foundations to Placements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-[#EAF0F7] dark:bg-[#14264A] p-0.5 text-xs font-bold">
              <button
                onClick={() => setActiveRoadmapView('cards')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeRoadmapView === 'cards'
                    ? 'bg-white dark:bg-[#08101F] text-[#14264A] dark:text-[#F2B544] shadow-xs'
                    : 'text-[#6B7280] dark:text-gray-400'
                }`}
              >
                Year Cards
              </button>
              <button
                onClick={() => setActiveRoadmapView('journey')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeRoadmapView === 'journey'
                    ? 'bg-white dark:bg-[#08101F] text-[#14264A] dark:text-[#F2B544] shadow-xs'
                    : 'text-[#6B7280] dark:text-gray-400'
                }`}
              >
                8-Semester Stepper
              </button>
            </div>

            <button
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] hover:underline flex items-center gap-1 cursor-pointer pl-2"
            >
              <span>Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2B544]" />
            </button>
          </div>
        </div>

        {activeRoadmapView === 'journey' ? (
          <FourYearJourneyVisualizer user={user} onNavigateToTab={onNavigate} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {yearCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate('roadmap')}
                  className={`bg-white dark:bg-[#0F1D38] rounded-2xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:border-[#14264A]/40 dark:hover:border-[#F2B544]/40 transition-all cursor-pointer relative overflow-hidden ${
                    card.active ? 'ring-2 ring-[#14264A] dark:ring-[#F2B544] shadow-sm' : ''
                  }`}
                >
                  {card.active && (
                    <div className="absolute top-0 right-0 bg-[#F2B544] text-[#14264A] text-[10px] font-extrabold px-2 py-0.5 rounded-bl-lg">
                      CURRENT
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400">{card.year}</span>
                    <div className="w-7 h-7 rounded-lg bg-[#F8F5EE] dark:bg-[#14264A] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-[#14264A] dark:text-white text-base mb-1">
                    {card.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${card.badgeColor}`}>
                      {card.progress}%
                    </span>
                    <span className="text-[11px] text-[#6B7280] dark:text-gray-400">{card.status}</span>
                  </div>

                  <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        card.progress === 100
                          ? 'bg-emerald-500'
                          : card.active
                          ? 'bg-[#14264A] dark:bg-[#F2B544]'
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CURRENT FOCUS & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CURRENT FOCUS CARD */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-7 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                Current Focus
              </span>
              <span className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] bg-[#FEF6E4] dark:bg-[#2A2312] px-2.5 py-0.5 rounded-full">
                Year 3 • Semester 5
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF0F7] dark:bg-[#14264A] flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-[#14264A] dark:text-[#F2B544]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#14264A] dark:text-white">
                  Machine Learning
                </h3>
                <p className="text-xs font-semibold text-[#6B7280] dark:text-gray-400">
                  Chapter 3: Regression
                </p>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 pt-1">
                  Ordinary least squares, cost functions, gradient descent, and Scikit-learn implementation.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#6B7280] dark:text-gray-400">Progress</span>
                <span className="text-[#14264A] dark:text-[#F2B544]">60%</span>
              </div>
              <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#14264A] dark:bg-[#F2B544] h-full rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-xs text-[#6B7280] dark:text-gray-400">Next: Classification & Model Evaluation</span>
            <button
              onClick={() => onNavigate('learning')}
              className="px-5 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2B544] dark:text-[#14264A]" />
            </button>
          </div>
        </div>

        {/* QUICK ACTIONS CARD (Features 4, 5, 2, 7 shortcuts) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-7 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-4">
              High-Impact Tools
            </span>

            <div className="space-y-2.5">
              {[
                {
                  label: 'Project Generator',
                  desc: 'Generate custom capstone & STAR bullets',
                  icon: Cpu,
                  action: () => {
                    if (onOpenProjectGenerator) onOpenProjectGenerator();
                    else onNavigate('projects');
                  },
                  tag: 'GEN AI',
                  highlight: true,
                },
                {
                  label: 'Digital Certificate',
                  desc: 'View verifiable honors credential & QR seal',
                  icon: Award,
                  action: () => {
                    if (onOpenCertificate) onOpenCertificate();
                    else onNavigate('certificates');
                  },
                  tag: 'VERIFIED',
                },
                {
                  label: 'College Attendance',
                  desc: 'Bunk calculator & exam eligibility safe margin',
                  icon: UserCheck,
                  action: () => {
                    if (onOpenAttendance) onOpenAttendance();
                    else onNavigate('attendance');
                  },
                  tag: '75% RULE',
                },
                {
                  label: 'Ask AI Career Agent',
                  desc: 'Get smart roadmaps & interview advice',
                  icon: Bot,
                  action: () => onNavigate('ai-agent'),
                  tag: 'ADVISOR',
                },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={action.action}
                    className={`w-full p-3 rounded-2xl border transition-all flex items-center justify-between text-left cursor-pointer group ${
                      action.highlight
                        ? 'bg-[#FAF7F2] dark:bg-[#14264A]/80 border-[#F2B544]/40 hover:border-[#F2B544]'
                        : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 hover:bg-[#EAF0F7] dark:hover:bg-[#14264A] border-[#EAF0F7] dark:border-[#1C2E52]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#0F1D38] flex items-center justify-center text-[#14264A] dark:text-[#F2B544] group-hover:scale-105 transition-transform shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#14264A] dark:text-white flex items-center gap-1.5">
                          {action.label}
                          {action.tag && (
                            <span className="text-[9px] bg-[#F2B544] text-[#14264A] px-1 rounded font-extrabold">
                              {action.tag}
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-[#6B7280] dark:text-gray-400">{action.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B7280] dark:text-gray-400 group-hover:text-[#14264A] dark:group-hover:text-[#F2B544] group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-[#6B7280] dark:text-gray-400">
            <span>Level {userLevel.level} • <strong>{user.xp} XP</strong></span>
            <span className="font-bold text-[#F2B544] truncate max-w-[180px]">
              {user.college ? user.college : 'College Leaderboard'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
