import React from 'react';
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
} from 'lucide-react';

interface DashboardPageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate }) => {
  // Circular progress calculation for readiness
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.readinessScore / 100) * circumference;

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
      progress: 80,
      status: 'Completed',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
      icon: Layers,
    },
    {
      year: 'Year 3',
      title: 'Specialization',
      progress: 45,
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
            Here's your complete journey, keep going.
          </p>
        </div>

        {/* AI Agent Quick Banner */}
        <div
          onClick={() => onNavigate('ai-agent')}
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#14264A] to-[#1E386D] text-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F2B544] text-[#14264A] flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#F2B544] flex items-center gap-1">
              RAAH AI Career Agent <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </p>
            <p className="text-[11px] text-gray-300">Need roadmap advice or code help?</p>
          </div>
        </div>
      </div>

      {/* 3 Top Major Cards matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: Career Readiness Score */}
        <div 
          onClick={() => onNavigate('career-guidance')}
          className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:border-[#14264A]/30 dark:hover:border-[#F2B544]/40 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Career Readiness Score
            </span>
            <span className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] px-2.5 py-0.5 rounded-full bg-[#EAF0F7] dark:bg-[#14264A]">
              {user.targetCareer}
            </span>
          </div>

          <div className="flex items-center justify-center py-4">
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100 dark:text-[#1A2E56]"
                />
                <circle
                  cx="56"
                  cy="56"
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
                <span className="text-2xl font-extrabold text-[#14264A] dark:text-white">
                  {user.readinessScore}%
                </span>
                <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                  Ready
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>Target: {user.targetCareer}</span>
            <span className="font-semibold text-[#14264A] dark:text-[#F2B544] flex items-center gap-1">
              View Report <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* CARD 2: Skill Overview */}
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Skill Overview
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              5 Tracked
            </span>
          </div>

          <div className="space-y-3">
            {skillsData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#14264A] dark:text-gray-200">{item.name}</span>
                  <span className="text-[#6B7280] dark:text-gray-400">{item.progress}%</span>
                </div>
                <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-2 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#6B7280] dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 flex justify-between">
            <span>Strongest: Python (80%)</span>
            <button onClick={() => onNavigate('career-guidance')} className="text-[#14264A] dark:text-[#F2B544] font-bold hover:underline">
              Gap Analysis
            </button>
          </div>
        </div>

        {/* CARD 3: Learning Streak */}
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Learning Streak
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FEF6E4] dark:bg-[#2A2312] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#F2B544] fill-[#F2B544]" />
            </div>
          </div>

          <div className="py-5 text-center">
            <span className="text-5xl font-extrabold text-[#14264A] dark:text-white tracking-tight">
              {user.streakDays} Days
            </span>
            <p className="text-sm font-bold text-[#F2B544] mt-2">
              Keep it up! 🔥
            </p>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400">
            <span>Daily Goal: {user.dailyStudyTime}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Today: Completed ✓</span>
          </div>
        </div>
      </div>

      {/* FOUR YEAR PROGRESS (4 Cards) matching reference */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
            4-Year Progress Overview
          </h2>
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Detailed Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2B544]" />
          </button>
        </div>

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
      </div>

      {/* CURRENT FOCUS & QUICK ACTIONS matching reference */}
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

        {/* QUICK ACTIONS CARD */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-7 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-4">
              Quick Actions
            </span>

            <div className="space-y-2.5">
              {[
                {
                  label: 'Ask AI Career Agent',
                  desc: 'Get smart roadmaps & interview advice',
                  icon: Bot,
                  tab: 'ai-agent' as NavTab,
                  highlight: true,
                },
                {
                  label: 'Take Quiz',
                  desc: 'DSA Quiz - Arrays (Earn +20 XP)',
                  icon: HelpCircle,
                  tab: 'quizzes' as NavTab,
                },
                {
                  label: 'Start Coding Practice',
                  desc: 'Solve curated problems & test cases',
                  icon: Code2,
                  tab: 'coding' as NavTab,
                },
                {
                  label: 'View Projects',
                  desc: 'Build portfolio-ready ML models',
                  icon: FolderGit2,
                  tab: 'projects' as NavTab,
                },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => onNavigate(action.tab)}
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
                          {action.highlight && (
                            <span className="text-[9px] bg-[#F2B544] text-[#14264A] px-1 rounded font-extrabold">NEW</span>
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
            <span>Total XP Earned: <strong className="text-[#14264A] dark:text-[#F2B544]">{user.xp} XP</strong></span>
            <span className="font-bold text-[#F2B544]">Rank #12 in NIT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
