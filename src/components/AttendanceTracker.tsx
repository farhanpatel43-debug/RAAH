import React, { useState, useEffect } from 'react';
import { SubjectAttendance, UserProfile } from '../types';
import {
  defaultSubjectsAttendance,
  calculateBunkSafety,
  calculateOverallAttendance,
} from '../data/attendanceData';
import {
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Trash2,
  Calculator,
  ShieldCheck,
  Flame,
  Sparkles,
  TrendingUp,
  Info,
  Calendar,
  GraduationCap,
} from 'lucide-react';

interface AttendanceTrackerProps {
  user: UserProfile;
  onAddXp?: (amount: number, activity?: any, details?: any) => void;
  onUpdateReadiness?: (newScore: number) => void;
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  user,
  onAddXp,
  onUpdateReadiness,
}) => {
  // Load from localStorage or default
  const [subjects, setSubjects] = useState<SubjectAttendance[]>(() => {
    try {
      const saved = localStorage.getItem('raah_attendance_subjects');
      return saved ? JSON.parse(saved) : defaultSubjectsAttendance;
    } catch {
      return defaultSubjectsAttendance;
    }
  });

  const [minimumThreshold, setMinimumThreshold] = useState<number>(75);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubTotal, setNewSubTotal] = useState('30');
  const [newSubAttended, setNewSubAttended] = useState('25');

  // Today check-in feedback state
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('raah_attendance_subjects', JSON.stringify(subjects));
    } catch (e) {
      console.warn('Failed to save attendance', e);
    }
  }, [subjects]);

  const overall = calculateOverallAttendance(subjects);

  // Handle Mark Attendance for a single subject
  const handleMarkClass = (subjectId: string, action: 'present' | 'absent' | 'cancelled') => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;

        if (action === 'present') {
          return {
            ...sub,
            totalClasses: sub.totalClasses + 1,
            attendedClasses: sub.attendedClasses + 1,
            lastAction: 'present',
          };
        } else if (action === 'absent') {
          return {
            ...sub,
            totalClasses: sub.totalClasses + 1,
            lastAction: 'absent',
          };
        }
        return {
          ...sub,
          lastAction: 'cancelled',
        };
      })
    );

    if (action === 'present') {
      if (onAddXp) {
        onAddXp(15, 'quiz_completed', { type: 'attendance_checkin', subjectId });
      }
      setNotificationMsg('Attended class marked! +15 XP added to your profile 🎉');
    } else if (action === 'absent') {
      setNotificationMsg('Class marked absent. Check your bunk safety margin below!');
    } else {
      setNotificationMsg('Class marked cancelled. Total count unchanged.');
    }

    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // 1-Click "Mark All Today Present"
  const handleMarkAllToday = () => {
    setSubjects((prev) =>
      prev.map((sub) => ({
        ...sub,
        totalClasses: sub.totalClasses + 1,
        attendedClasses: sub.attendedClasses + 1,
        lastAction: 'present',
      }))
    );
    setTodayCheckedIn(true);
    if (onAddXp) {
      onAddXp(30, 'quiz_completed', { type: 'full_day_attendance' });
    }
    setNotificationMsg('All classes marked attended! Daily streak sustained and +30 XP awarded! 🔥');
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // Add subject
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const newSub: SubjectAttendance = {
      id: 'sub-' + Date.now(),
      subjectCode: newSubCode.trim() || `CS${Math.floor(100 + Math.random() * 800)}`,
      name: newSubName.trim(),
      totalClasses: Math.max(1, parseInt(newSubTotal) || 30),
      attendedClasses: Math.max(0, parseInt(newSubAttended) || 25),
      minimumRequired: minimumThreshold,
      credits: 3,
    };

    setSubjects((prev) => [...prev, newSub]);
    setShowAddModal(false);
    setNewSubName('');
    setNewSubCode('');
  };

  // Delete subject
  const handleDeleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 text-[#182235] dark:text-[#F1F5F9]">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="p-3.5 bg-[#14264A] text-white rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#F2B544]" />
            <span>{notificationMsg}</span>
          </div>
          <button
            onClick={() => setNotificationMsg(null)}
            className="text-xs text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Overview Header */}
      <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#EAF0F7] dark:bg-[#14264A] text-[#14264A] dark:text-[#F2B544] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                {user.degree} • {user.currentYear}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                Rule: {minimumThreshold}% Mandatory
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white flex items-center gap-2.5">
              <span>Academic Attendance That Actually Means Something</span>
            </h1>
            <p className="text-sm text-[#6B7280] dark:text-gray-400 max-w-2xl">
              Never get debarred from semester examinations or placement drives. Track real attendance percentages, calculate exact safe bunks, and boost your college readiness score.
            </p>
          </div>

          {/* Quick Mark Today Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleMarkAllToday}
              disabled={todayCheckedIn}
              className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                todayCheckedIn
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 cursor-default'
                  : 'bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{todayCheckedIn ? 'Checked In Today ✓' : 'Mark All Present Today (+30 XP)'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-3 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52] hover:bg-gray-50 dark:hover:bg-[#14264A] text-xs font-bold text-[#14264A] dark:text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          {/* Card 1: Overall Percentage */}
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-1">
              Overall Semester Attendance
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-black ${
                  overall.overallPercentage >= 75
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {overall.overallPercentage}%
              </span>
              <span className="text-xs text-[#6B7280] dark:text-gray-400 font-semibold">
                ({overall.attendedClasses} / {overall.totalClasses} classes)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mt-3">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  overall.overallPercentage >= 75 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, overall.overallPercentage)}%` }}
              />
            </div>
            <p className="text-[11px] mt-2 font-medium text-[#6B7280] dark:text-gray-400 flex items-center gap-1">
              {overall.overallPercentage >= 75 ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-700 dark:text-emerald-300">Exam Hall Ticket Guaranteed ✓</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span className="text-rose-700 dark:text-rose-300 font-bold">Eligibility At Risk! Attendance &lt; 75%</span>
                </>
              )}
            </p>
          </div>

          {/* Card 2: Bunk Safety Status */}
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-1">
              Bunk Safety Margin
            </span>
            <div className="text-3xl font-black text-[#14264A] dark:text-white">
              {subjects.filter((s) => calculateBunkSafety(s.attendedClasses, s.totalClasses).isSafe).length}{' '}
              <span className="text-sm font-bold text-gray-500">/ {subjects.length} Subjects Safe</span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-2">
              {subjects.some((s) => !calculateBunkSafety(s.attendedClasses, s.totalClasses).isSafe)
                ? '⚠️ 1 or more subjects require urgent attendance recovery.'
                : '✅ All registered subjects currently exceed the mandatory safety buffer.'}
            </p>
          </div>

          {/* Card 3: Career Readiness Impact */}
          <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-1">
              Readiness Score Boost
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#F2B544]">
                {overall.readinessModifier >= 0 ? `+${overall.readinessModifier}%` : `${overall.readinessModifier}%`}
              </span>
              <span className="text-xs font-semibold text-[#14264A] dark:text-gray-200">
                To Overall Score ({user.readinessScore}%)
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-2">
              Regular academic discipline factors directly into your Placement Readiness score.
            </p>
          </div>
        </div>
      </div>

      {/* Subject-Wise Tracker Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#14264A] dark:text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#F2B544]" />
            <span>Subject-by-Subject Bunk Margin Calculator</span>
          </h2>
          <span className="text-xs text-[#6B7280] dark:text-gray-400">
            Click + / - to log daily class sessions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((sub) => {
            const calc = calculateBunkSafety(sub.attendedClasses, sub.totalClasses, sub.minimumRequired);
            return (
              <div
                key={sub.id}
                className={`bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border transition-all shadow-xs flex flex-col justify-between ${
                  calc.status === 'critical'
                    ? 'border-rose-300 dark:border-rose-800/80 ring-2 ring-rose-400/20'
                    : calc.status === 'warning'
                    ? 'border-amber-300 dark:border-amber-800/80 ring-2 ring-amber-400/20'
                    : 'border-[#EAF0F7] dark:border-[#1C2E52]'
                }`}
              >
                <div>
                  {/* Code and Status Pill */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#6B7280] dark:text-gray-400">
                      {sub.subjectCode} • {sub.credits || 4} Credits
                    </span>
                    <span
                      className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full ${
                        calc.status === 'critical'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : calc.status === 'warning'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}
                    >
                      {calc.status === 'critical'
                        ? 'CRITICAL DEFICIT'
                        : calc.status === 'warning'
                        ? 'BORDERLINE (1 Bunk Left)'
                        : 'SAFE & COMPLIANT'}
                    </span>
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-base font-extrabold text-[#14264A] dark:text-white leading-snug">
                    {sub.name}
                  </h3>
                  {sub.teacher && (
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                      Faculty: {sub.teacher}
                    </p>
                  )}

                  {/* Progress Numbers */}
                  <div className="flex items-baseline justify-between mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#14264A] dark:text-white">
                        {calc.percentage}%
                      </span>
                      <span className="text-xs text-[#6B7280] dark:text-gray-400 font-semibold">
                        ({sub.attendedClasses} / {sub.totalClasses} attended)
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400">
                      Req: {sub.minimumRequired}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-2.5 rounded-full overflow-hidden mt-2 relative">
                    {/* Minimum target threshold indicator tick */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-black/40 dark:bg-white/40 z-10"
                      style={{ left: `${sub.minimumRequired}%` }}
                      title={`Target minimum: ${sub.minimumRequired}%`}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        calc.status === 'critical'
                          ? 'bg-rose-500'
                          : calc.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, calc.percentage)}%` }}
                    />
                  </div>

                  {/* Bunk / Recovery Advice Box */}
                  <div
                    className={`mt-4 p-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                      calc.status === 'critical'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900'
                        : calc.status === 'warning'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-900'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900'
                    }`}
                  >
                    {calc.status === 'critical' ? (
                      <>
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                        <div>
                          <strong>Action Required:</strong> Attend next{' '}
                          <span className="underline font-black text-rose-900 dark:text-rose-100">
                            {calc.classesNeededToRecover} consecutive classes
                          </span>{' '}
                          without missing to get back above {sub.minimumRequired}%!
                        </div>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <strong>Safe to Bunk:</strong> You can miss up to{' '}
                          <span className="underline font-black text-emerald-900 dark:text-emerald-100">
                            {calc.safeBunks} more classes
                          </span>{' '}
                          and still remain above {sub.minimumRequired}%.
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkClass(sub.id, 'present')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      title="Attended today's class (+15 XP)"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>+ Present</span>
                    </button>
                    <button
                      onClick={() => handleMarkClass(sub.id, 'absent')}
                      className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Marked absent"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>- Absent</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteSubject(sub.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 transition-colors"
                    title="Remove subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="bg-white dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#182235] dark:text-[#F1F5F9]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-extrabold text-[#14264A] dark:text-white mb-1">
              Add New Subject / Course
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 mb-4">
              Configure current semester subject attendance targets.
            </p>

            <form onSubmit={handleAddSubject} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems & Shell"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#14264A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                  Subject Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. CS506"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#14264A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                    Total Classes Held
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newSubTotal}
                    onChange={(e) => setNewSubTotal(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#14264A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                    Classes Attended
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newSubAttended}
                    onChange={(e) => setNewSubAttended(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#14264A]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] text-xs font-bold cursor-pointer"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
