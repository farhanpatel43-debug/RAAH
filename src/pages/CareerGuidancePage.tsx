import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Calendar,
  Download,
  Users,
  Award,
  BookOpen,
  Bot,
} from 'lucide-react';

interface CareerGuidancePageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
}

export const CareerGuidancePage: React.FC<CareerGuidancePageProps> = ({ user, onNavigate }) => {
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.readinessScore / 100) * circumference;

  const skillGaps = [
    { skill: 'SQL', gap: 25, current: 65, color: 'bg-rose-500' },
    { skill: 'Statistics', gap: 20, current: 70, color: 'bg-amber-500' },
    { skill: 'Machine Learning', gap: 15, current: 80, color: 'bg-blue-600 dark:bg-blue-400' },
    { skill: 'DSA', gap: 10, current: 85, color: 'bg-emerald-500' },
  ];

  const strengths = [
    'Python Programming & Syntax',
    'Data Visualization (Matplotlib)',
    'Algorithmic Problem Solving',
    'Data Structures Foundations',
  ];

  const suggestedProjects = [
    { title: 'Customer Churn Prediction', tag: 'Classification' },
    { title: 'Movie Recommendation System', tag: 'Collaborative Filtering' },
    { title: 'Stock Price Prediction', tag: 'Time Series / LSTM' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-[#182235] dark:text-[#F1F5F9]">
      {/* Title & Subtitle matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
            Career Report
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            {user.targetCareer} Readiness & Gap Analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('ai-agent')}
            className="px-4 py-2 bg-[#14264A] dark:bg-[#1E386D] hover:bg-[#0B1B36] text-[#F2B544] text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs border border-[#F2B544]/30"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Consult AI Agent</span>
          </button>
          <button
            onClick={() => alert('Generated official RAAH Career Readiness PDF Report for ' + user.name + '!')}
            className="px-4 py-2 bg-white dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] hover:border-gray-300 text-xs font-bold text-[#14264A] dark:text-gray-200 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280] dark:text-gray-400" />
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={() => setMentorModalOpen(true)}
            className="px-4 py-2 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Book 1-on-1 Mentor</span>
          </button>
        </div>
      </div>

      {/* Main Readiness Card matching reference */}
      <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Big Circular Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3">
              {user.targetCareer} Readiness
            </span>

            <div className="relative flex items-center justify-center my-2">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100 dark:text-[#1A2E56]" />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="#F2B544"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-[#14264A] dark:text-white">
                  {user.readinessScore}%
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Target Aligned
                </span>
              </div>
            </div>

            <p className="text-xs font-extrabold text-[#14264A] dark:text-white mt-2">
              Good Progress!
            </p>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 max-w-xs mt-1">
              You are on the right track! Focus on SQL and building real-world projects.
            </p>
          </div>

          {/* Right: Skill Gap Analysis matching reference */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#14264A] dark:text-white">
                Skill Gap Analysis
              </h3>
              <span className="text-xs text-[#6B7280] dark:text-gray-400">Targeting Top Tier Tech Roles</span>
            </div>

            <div className="space-y-3.5">
              {skillGaps.map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#14264A] dark:text-gray-200">{item.skill}</span>
                    <span className="text-rose-600 dark:text-rose-400 font-semibold">{item.gap}% Gap remaining</span>
                  </div>
                  <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#14264A] dark:bg-[#F2B544] h-full"
                      style={{ width: `${item.current}%` }}
                    />
                    <div
                      className={`${item.color} h-full opacity-40`}
                      style={{ width: `${item.gap}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-[#6B7280] dark:text-gray-400 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#14264A] dark:bg-[#F2B544]" /> Current Proficiency
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-400" /> Target Gap to Close
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Strengths, Recommended Next & Suggested Projects matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Strengths Card */}
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-[#F2B544]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Your Strengths
            </h3>
          </div>

          <div className="space-y-3">
            {strengths.map((str, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#182235] dark:text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold">{str}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-[11px] text-[#6B7280] dark:text-gray-400">
            Verified via 12 module quizzes & 6 code tests.
          </div>
        </div>

        {/* Recommended Next Card matching reference */}
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#F2B544]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                Recommended Next
              </h3>
            </div>

            <div className="p-4 bg-[#FAF7F2] dark:bg-[#14264A]/60 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52]">
              <span className="text-xs font-extrabold text-[#14264A] dark:text-[#F2B544] block mb-1">
                SQL for Data Science
              </span>
              <p className="text-xs text-[#6B7280] dark:text-gray-300 leading-relaxed">
                Focus on SQL window functions, joins, and indexing to strengthen your data querying skills and close the 25% gap.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('learning')}
            className="w-full mt-4 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to Learning</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2B544] dark:text-[#14264A]" />
          </button>
        </div>

        {/* Suggested Projects Card matching reference */}
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#F2B544]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                Suggested Projects
              </h3>
            </div>

            <div className="space-y-2.5">
              {suggestedProjects.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('projects')}
                  className="p-3 rounded-2xl bg-[#F8F5EE] dark:bg-[#14264A]/40 hover:bg-[#EAF0F7] dark:hover:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-[#14264A] dark:text-white">{p.title}</p>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{p.tag}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6B7280] dark:text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="w-full mt-4 py-2 text-xs font-bold text-[#14264A] dark:text-[#F2B544] hover:underline text-center cursor-pointer"
          >
            View All Recommended Projects →
          </button>
        </div>
      </div>

      {/* Mentor Booking Modal */}
      {mentorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-[#1C2E52]">
            {bookingDone ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#14264A] dark:text-white">Session Confirmed!</h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-300">
                  Your 30-minute career review with an industry Data Scientist from Google is booked for tomorrow at 5:00 PM. Calendar invite sent to {user.email}.
                </p>
                <button
                  onClick={() => {
                    setBookingDone(false);
                    setMentorModalOpen(false);
                  }}
                  className="px-6 py-2.5 bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-base text-[#14264A] dark:text-white">Book 1-on-1 Career Review</h3>
                  <button onClick={() => setMentorModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <p className="text-xs text-[#6B7280] dark:text-gray-300">
                  Get your resume and 4-year roadmap critiqued by a senior engineer in your chosen track ({user.targetCareer}).
                </p>
                <div className="space-y-2 text-xs">
                  <label className="font-bold text-[#14264A] dark:text-gray-200 block">Choose Mentor:</label>
                  <select className="w-full p-2.5 border border-gray-200 dark:border-[#1C2E52] rounded-xl bg-white dark:bg-[#0B162C] text-[#14264A] dark:text-white">
                    <option>Aditi Rao (Senior ML Engineer @ Microsoft, NIT Alum)</option>
                    <option>Sameer Gupta (Data Science Lead @ Uber)</option>
                    <option>Priya Sharma (Staff Software Engineer @ Amazon)</option>
                  </select>
                </div>
                <div className="space-y-2 text-xs">
                  <label className="font-bold text-[#14264A] dark:text-gray-200 block">Preferred Time Slot:</label>
                  <select className="w-full p-2.5 border border-gray-200 dark:border-[#1C2E52] rounded-xl bg-white dark:bg-[#0B162C] text-[#14264A] dark:text-white">
                    <option>Tomorrow, 5:00 PM - 5:30 PM IST</option>
                    <option>Tomorrow, 7:00 PM - 7:30 PM IST</option>
                    <option>Saturday, 11:00 AM - 11:30 AM IST</option>
                  </select>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setMentorModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setBookingDone(true)}
                    className="px-5 py-2.5 bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
