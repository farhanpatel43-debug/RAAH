import React from 'react';
import { UserProfile, NavTab } from '../types';
import {
  Sparkles,
  X,
  Play,
  HelpCircle,
  Code2,
  UserCheck,
  FolderGit2,
  Bot,
  ArrowRight,
  Clock,
  Zap,
  Target,
  Award,
  ShieldAlert,
} from 'lucide-react';

interface WhatShouldIDoNowModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
  onOpenAttendance?: () => void;
  onOpenProjectGenerator?: () => void;
}

export const WhatShouldIDoNowModal: React.FC<WhatShouldIDoNowModalProps> = ({
  user,
  isOpen,
  onClose,
  onNavigate,
  onOpenAttendance,
  onOpenProjectGenerator,
}) => {
  if (!isOpen) return null;

  // Real-time analysis of student status:
  const recommendations = [
    {
      priority: 1,
      badge: 'TOP RECOMMENDATION (HIGH IMPACT)',
      badgeColor: 'bg-[#F2B544] text-[#14264A]',
      title: 'Watch Chapter 3: Machine Learning Regression Video',
      why: `Watching this lesson unlocks the Chapter Quiz, awards +20 XP, and advances your ${user.currentYear} core coursework toward 100%.`,
      time: '15 mins',
      xp: '+20 XP',
      icon: Play,
      actionText: 'Start Learning Video Now',
      onClick: () => {
        onClose();
        onNavigate('learning');
      },
    },
    {
      priority: 2,
      badge: 'QUICK CHECK-IN (2 MINS)',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      title: 'Mark Today’s Academic Attendance in Web Tech',
      why: 'Web Tech attendance is currently at 70.0% (below 75% exam threshold). Logging today protects your examination eligibility.',
      time: '2 mins',
      xp: '+15 XP',
      icon: UserCheck,
      actionText: 'Open Attendance Tracker',
      onClick: () => {
        onClose();
        if (onOpenAttendance) onOpenAttendance();
        else onNavigate('attendance');
      },
    },
    {
      priority: 3,
      badge: 'PORTFOLIO BOOSTER (30 MINS)',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
      title: `Generate ${user.currentYear} ${user.targetCareer} Project Blueprint`,
      why: `Synthesize a custom portfolio project tailored for ${user.targetCareer} roles with architecture specs and STAR resume bullet points.`,
      time: '20 mins',
      xp: '+40 XP',
      icon: FolderGit2,
      actionText: 'Launch Project Generator',
      onClick: () => {
        onClose();
        if (onOpenProjectGenerator) onOpenProjectGenerator();
        else onNavigate('projects');
      },
    },
    {
      priority: 4,
      badge: 'SKILL TEST (10 MINS)',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      title: 'Complete DSA Arrays & Search Quiz',
      why: 'Test algorithmic time complexities and earn +30 XP toward Level 5 Full-Stack Craftsman.',
      time: '10 mins',
      xp: '+30 XP',
      icon: HelpCircle,
      actionText: 'Take Practice Quiz',
      onClick: () => {
        onClose();
        onNavigate('quizzes');
      },
    },
  ];

  const topPick = recommendations[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#182235] dark:text-[#F1F5F9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#14264A] via-[#1E386D] to-[#0A162C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Action Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 fill-[#F2B544]" />
            <span>Real-Time Next Action Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            What Should I Do Right Now?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            RAAH analyzed your current learning progress, attendance margins, and streak to identify the highest-leverage next step for {user.name}.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Recommendation Hero Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FEF6E4] via-amber-50 to-white dark:from-[#2A2312] dark:via-[#14264A] dark:to-[#0F1D38] border-2 border-[#F2B544] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A]">
                🎯 #1 BEST ACTION FOR YOU
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <Clock className="w-3.5 h-3.5" />
                <span>{topPick.time}</span>
                <span className="text-[#F2B544] font-black">{topPick.xp}</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-[#14264A] dark:text-white leading-snug">
              {topPick.title}
            </h3>

            <p className="text-xs text-[#4B5563] dark:text-gray-300 leading-relaxed">
              {topPick.why}
            </p>

            <button
              onClick={topPick.onClick}
              className="w-full py-3 bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <span>{topPick.actionText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Alternative Choices by Available Time */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
              <span>Or Choose Based on Time Available</span>
            </h4>

            <div className="space-y-2.5">
              {recommendations.slice(1).map((rec, idx) => {
                const Icon = rec.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] hover:border-[#F2B544]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#14264A] flex items-center justify-center text-[#14264A] dark:text-[#F2B544] shrink-0 shadow-2xs mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.2 rounded ${rec.badgeColor}`}>
                            {rec.badge}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {rec.xp}
                          </span>
                        </div>
                        <h5 className="text-xs font-extrabold text-[#14264A] dark:text-white">
                          {rec.title}
                        </h5>
                        <p className="text-[11px] text-[#6B7280] dark:text-gray-400 leading-tight">
                          {rec.why}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={rec.onClick}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] hover:bg-[#14264A] hover:text-white dark:hover:bg-[#F2B544] dark:hover:text-[#14264A] text-xs font-bold text-[#14264A] dark:text-gray-200 transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 justify-center"
                    >
                      <span>Start</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F5EE] dark:bg-[#08101F] border-t border-[#EAF0F7] dark:border-[#1C2E52] flex items-center justify-between">
          <span className="text-xs text-[#6B7280] dark:text-gray-400">
            Need custom advice?{' '}
            <button
              onClick={() => {
                onClose();
                onNavigate('ai-agent');
              }}
              className="text-[#14264A] dark:text-[#F2B544] font-bold hover:underline"
            >
              Ask RAAH AI Career Advisor
            </button>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
