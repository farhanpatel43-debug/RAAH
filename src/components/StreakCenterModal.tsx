import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Flame,
  X,
  Shield,
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Zap,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface StreakCenterModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onAddXp?: (amount: number, activity?: any, details?: any) => void;
}

export const StreakCenterModal: React.FC<StreakCenterModalProps> = ({
  user,
  isOpen,
  onClose,
  onAddXp,
}) => {
  if (!isOpen) return null;

  const [shieldCount, setShieldCount] = useState(1);
  const [claimedToday, setClaimedToday] = useState(true);
  const [activeHoverDay, setActiveHoverDay] = useState<{ day: number; label: string; xp: number; activities: string } | null>(null);

  // Generate a mock 12-week heatmap grid (84 days)
  const heatmapWeeks = Array.from({ length: 12 }, (_, wIdx) => {
    return Array.from({ length: 7 }, (_, dIdx) => {
      const dayNum = wIdx * 7 + dIdx;
      // Make recent 7 days fully active, and scattered realistic engineering study history
      const isRecentSeven = dayNum >= 84 - user.streakDays;
      let level = 0;
      let xpEarned = 0;
      let activityText = 'Rest Day (No activity logged)';

      if (isRecentSeven) {
        level = (dayNum % 3) + 2; // high activity
        xpEarned = 60 + (dayNum % 4) * 20;
        activityText = `🔥 Active Streak Day! 2 Videos, 1 Quiz (+${xpEarned} XP)`;
      } else if ((wIdx + dIdx) % 3 === 0 || (wIdx * 2 + dIdx) % 5 === 0) {
        level = (dayNum % 3) + 1;
        xpEarned = 25 + (dayNum % 3) * 15;
        activityText = `Completed Coding practice (+${xpEarned} XP)`;
      }

      return {
        id: `cell-${wIdx}-${dIdx}`,
        dayNum,
        level,
        xpEarned,
        activityText,
        dateLabel: `Day ${dayNum + 1}`,
      };
    });
  });

  const milestones = [
    { days: 3, title: 'Flame Ignited', reward: '+50 XP', unlocked: true, icon: '🔥' },
    { days: 7, title: 'Consistency Champion', reward: '1.25x Multiplier', unlocked: true, current: true, icon: '⚡' },
    { days: 14, title: 'Streak Shield Keeper', reward: '+1 Shield & +100 XP', unlocked: false, icon: '🛡️' },
    { days: 30, title: 'Habit Architect', reward: 'Gold Badge & +250 XP', unlocked: false, icon: '🏅' },
    { days: 100, title: 'Mythic Centurion', reward: 'Lifetime Hall of Fame', unlocked: false, icon: '👑' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#182235] dark:text-[#F1F5F9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#14264A] via-[#1E386D] to-[#0A162C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Streak Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 fill-[#F2B544]" />
            <span>Daily Discipline & Learning Streak</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {user.streakDays} Days
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#F2B544] text-[#14264A] shadow-xs animate-pulse">
                  ON FIRE 🔥
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Best Record: <strong>14 Days</strong> • Daily Goal: <strong>{user.dailyStudyTime}</strong>
              </p>
            </div>

            {/* Streak Freeze Shield Badge */}
            <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/15 backdrop-blur-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-300 block">Streak Shield</span>
                <span className="text-sm font-extrabold text-cyan-300">{shieldCount} Shield Active</span>
                <p className="text-[10px] text-gray-400">Protects if you miss an exam day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* GitHub Style 12-Week Activity Heatmap */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
                <span>12-Week Activity Heatmap</span>
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] dark:text-gray-400">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-xs bg-[#EAF0F7] dark:bg-gray-800" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#FDE68A] dark:bg-amber-900" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#F59E0B] dark:bg-amber-600" />
                <span className="w-2.5 h-2.5 rounded-xs bg-[#D97706] dark:bg-[#F2B544]" />
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] overflow-x-auto">
              <div className="flex gap-1.5 min-w-[500px]">
                {heatmapWeeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                    {week.map((cell) => (
                      <div
                        key={cell.id}
                        onMouseEnter={() =>
                          setActiveHoverDay({
                            day: cell.dayNum,
                            label: cell.dateLabel,
                            xp: cell.xpEarned,
                            activities: cell.activityText,
                          })
                        }
                        onMouseLeave={() => setActiveHoverDay(null)}
                        className={`w-full aspect-square rounded-xs cursor-pointer transition-transform hover:scale-125 ${
                          cell.level === 0
                            ? 'bg-[#EAF0F7] dark:bg-gray-800/80 hover:bg-gray-300'
                            : cell.level === 1
                            ? 'bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200'
                            : cell.level === 2
                            ? 'bg-[#FDE68A] dark:bg-amber-700/80 hover:bg-[#FCD34D]'
                            : cell.level === 3
                            ? 'bg-[#F59E0B] dark:bg-amber-600 hover:bg-[#D97706]'
                            : 'bg-[#D97706] dark:bg-[#F2B544] hover:bg-amber-500 ring-1 ring-[#14264A]/30'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Hover Tooltip display */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 text-xs min-h-[24px]">
                {activeHoverDay ? (
                  <div className="flex items-center justify-between text-[#14264A] dark:text-[#F1F5F9]">
                    <span className="font-bold">{activeHoverDay.activities}</span>
                    <span className="font-extrabold text-amber-600 dark:text-[#F2B544]">
                      {activeHoverDay.xp > 0 ? `+${activeHoverDay.xp} XP` : '0 XP'}
                    </span>
                  </div>
                ) : (
                  <span className="text-[#6B7280] dark:text-gray-400 italic text-[11px]">
                    Hover over any square to inspect activity log and XP earned.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Today's Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3">
              Today's Daily Checklist (October 8)
            </h3>
            <div className="space-y-2">
              {[
                { task: 'Academic Attendance Check-In', xp: '+15 XP', done: true },
                { task: 'Watch Machine Learning Regression Video', xp: '+20 XP', done: true },
                { task: 'Solve 1 Medium Coding Challenge in DSA', xp: '+25 XP', done: false },
                { task: 'Review Semester 5 Roadmap Milestones', xp: '+10 XP', done: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                    item.done
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300'
                      : 'bg-white dark:bg-[#0F1D38] border-gray-200 dark:border-gray-800 text-[#14264A] dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        item.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                    <span>{item.task}</span>
                  </div>
                  <span className="font-bold text-[#F2B544]">{item.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Ladder */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3">
              Streak Milestone Rewards
            </h3>
            <div className="space-y-2">
              {milestones.map((ms) => (
                <div
                  key={ms.days}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    ms.current
                      ? 'bg-[#FEF6E4] dark:bg-[#2A2312] border-[#F2B544] ring-2 ring-[#F2B544]/30'
                      : ms.unlocked
                      ? 'bg-white dark:bg-[#0F1D38] border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-gray-50/60 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{ms.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#14264A] dark:text-white">
                          {ms.days} Days: {ms.title}
                        </span>
                        {ms.current && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#F2B544] text-[#14264A]">
                            ACTIVE TODAY
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6B7280] dark:text-gray-400">
                        Reward: {ms.reward}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      ms.unlocked
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {ms.unlocked ? 'Unlocked ✓' : `In ${ms.days - user.streakDays} Days`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#EAF0F7] dark:border-[#1C2E52] bg-[#F8F5EE] dark:bg-[#08101F] flex items-center justify-between">
          <span className="text-xs text-[#6B7280] dark:text-gray-400">
            Streak reset occurs at midnight. Complete 1 lesson daily to maintain!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] text-xs font-bold cursor-pointer"
          >
            Keep The Fire Burning 🔥
          </button>
        </div>
      </div>
    </div>
  );
};
