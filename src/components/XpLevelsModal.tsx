import React from 'react';
import { UserProfile } from '../types';
import { XP_LEVELS, getUserLevel, getNextLevel, getXpProgress, XP_ACTIVITIES } from '../data/levelsData';
import {
  Trophy,
  X,
  Sparkles,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface XpLevelsModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToActivity?: (activityType: string) => void;
}

export const XpLevelsModal: React.FC<XpLevelsModalProps> = ({
  user,
  isOpen,
  onClose,
  onNavigateToActivity,
}) => {
  if (!isOpen) return null;

  const currentLevel = getUserLevel(user.xp);
  const nextLevel = getNextLevel(user.xp);
  const { currentXpInLevel, requiredXpInLevel, percentage } = getXpProgress(user.xp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#182235] dark:text-[#F1F5F9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with decorative badge */}
        <div className="bg-gradient-to-r from-[#14264A] via-[#1E386D] to-[#0A162C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close XP Level Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4" />
            <span>RAAH Engineering Mastery Ladder</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  Level {currentLevel.level}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F2B544] text-[#14264A] shadow-xs">
                  {currentLevel.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-200 mt-1">
                {currentLevel.title}
              </h2>
            </div>

            <div className="sm:text-right bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xs border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-gray-300 block font-semibold">
                Total Career XP
              </span>
              <span className="text-2xl font-black text-[#F2B544]">
                {user.xp.toLocaleString()} <span className="text-sm font-bold text-white">XP</span>
              </span>
            </div>
          </div>

          {/* Progress bar to next level */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs font-semibold text-gray-200 mb-2">
              <span>
                Progress to {nextLevel ? `Level ${nextLevel.level}: ${nextLevel.title}` : 'Max Level'}
              </span>
              <span className="font-bold text-[#F2B544]">
                {nextLevel ? `${currentXpInLevel} / ${requiredXpInLevel} XP (${percentage}%)` : 'MAXED'}
              </span>
            </div>
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="bg-gradient-to-r from-[#F2B544] to-amber-300 h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${percentage}%` }}
              />
            </div>
            {nextLevel && (
              <p className="text-[11px] text-gray-300 mt-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F2B544]" />
                <span>
                  Earn <strong>{requiredXpInLevel - currentXpInLevel} more XP</strong> to unlock Level {nextLevel.level} perks!
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Content Tabs / Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active Streak Multiplier Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF6E4] dark:bg-[#2A2312] flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-[#F2B544] fill-[#F2B544]" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  {user.streakDays}-Day Learning Streak Bonus Active!
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  You earn <strong>1.25x XP multiplier</strong> on all completed videos, quizzes, and attendance!
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-1 bg-[#F2B544] text-[#14264A] rounded-lg shrink-0">
              +25% BOOST
            </span>
          </div>

          {/* Level Tiers Ladder */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
              <span>All 8 Progression Levels & Unlocks</span>
            </h3>

            <div className="space-y-2.5">
              {XP_LEVELS.map((lvl) => {
                const isCurrent = lvl.level === currentLevel.level;
                const isUnlocked = user.xp >= lvl.minXp;
                return (
                  <div
                    key={lvl.level}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-amber-50/70 dark:bg-[#14264A]/60 border-[#F2B544] ring-2 ring-[#F2B544]/30 shadow-xs'
                        : isUnlocked
                        ? 'bg-white dark:bg-[#0F1D38] border-gray-200 dark:border-[#1C2E52]'
                        : 'bg-gray-50/70 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isCurrent
                              ? 'bg-[#F2B544] text-[#14264A]'
                              : isUnlocked
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                          }`}
                        >
                          {isUnlocked ? (
                            isCurrent ? (
                              <Sparkles className="w-4 h-4 text-[#14264A]" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-[#14264A] dark:text-white">
                              Level {lvl.level}: {lvl.title}
                            </span>
                            <span className="text-[11px]">{lvl.badge}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A] font-extrabold px-1.5 py-0.2 rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                            {lvl.minXp.toLocaleString()} - {lvl.maxXp.toLocaleString()} XP
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-[11px] font-semibold text-[#14264A] dark:text-gray-300 hidden sm:block">
                        <div className="text-[10px] text-[#6B7280] dark:text-gray-400 uppercase font-bold">Unlocks</div>
                        <span>{lvl.perks[0]}</span>
                      </div>
                    </div>

                    {/* Perks bullets */}
                    <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/60 flex flex-wrap gap-1.5">
                      {lvl.perks.map((perk, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F8F5EE] dark:bg-[#1A2E56] text-[#14264A] dark:text-gray-200"
                        >
                          ✓ {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to Earn XP */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3">
              How to Earn More XP Every Day
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {XP_ACTIVITIES.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-[#14264A] dark:text-white leading-tight">
                    {act.action}
                  </span>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      +{act.xp} XP
                    </span>
                    <span className="text-[10px] text-[#6B7280] dark:text-gray-400">Daily</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAF0F7] dark:border-[#1C2E52] bg-[#F8F5EE] dark:bg-[#08101F] flex items-center justify-between">
          <span className="text-xs text-[#6B7280] dark:text-gray-400">
            Keep learning daily to climb to <strong>Level 8: Tech Titan</strong>!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] text-xs font-bold transition-colors cursor-pointer"
          >
            Got it, Let's Level Up!
          </button>
        </div>
      </div>
    </div>
  );
};
