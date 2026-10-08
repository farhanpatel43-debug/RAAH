import React, { useState } from 'react';
import { NavTab, UserProfile, RoadmapYear } from '../types';
import { fourYearRoadmap } from '../data/mockData';
import { FourYearJourneyVisualizer } from '../components/FourYearJourneyVisualizer';
import {
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  GraduationCap,
  Layers,
  Target,
  ChevronRight,
  BookOpen,
  TrendingUp,
} from 'lucide-react';

interface RoadmapPageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ user, onNavigate }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(2); // Year 3 active by default
  const [roadmapMode, setRoadmapMode] = useState<'journey' | 'syllabus'>('journey');

  const currentYearData = fourYearRoadmap[selectedYearIndex];
  const currentSemester = currentYearData.semesters[0]; // Sem 5

  const yearIcons = [GraduationCap, Layers, Sparkles, Target];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-[#182235] dark:text-[#F1F5F9]">
      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
            My 4-Year Engineering Journey & Roadmap
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            Track all 8 semesters, syllabus milestones, and career launch checkpoints.
          </p>
        </div>

        <div className="flex rounded-2xl bg-[#EAF0F7] dark:bg-[#14264A] p-1 text-xs font-bold shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setRoadmapMode('journey')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              roadmapMode === 'journey'
                ? 'bg-white dark:bg-[#08101F] text-[#14264A] dark:text-[#F2B544] shadow-xs font-black'
                : 'text-[#6B7280] dark:text-gray-400'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#F2B544]" />
            <span>4-Year Journey Stepper</span>
          </button>
          <button
            onClick={() => setRoadmapMode('syllabus')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              roadmapMode === 'syllabus'
                ? 'bg-white dark:bg-[#08101F] text-[#14264A] dark:text-[#F2B544] shadow-xs font-black'
                : 'text-[#6B7280] dark:text-gray-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#F2B544]" />
            <span>Curriculum Syllabus</span>
          </button>
        </div>
      </div>

      {roadmapMode === 'journey' ? (
        <FourYearJourneyVisualizer user={user} onNavigateToTab={onNavigate} />
      ) : (
        <>
          {/* Top 4 Progress Cards matching reference */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {fourYearRoadmap.map((year, idx) => {
          const isSelected = selectedYearIndex === idx;
          const Icon = yearIcons[idx];
          return (
            <div
              key={year.year}
              onClick={() => setSelectedYearIndex(idx)}
              className={`bg-white dark:bg-[#0F1D38] rounded-2xl p-5 border shadow-xs transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-[#14264A] dark:border-[#F2B544] ring-2 ring-[#14264A] dark:ring-[#F2B544] shadow-sm'
                  : 'border-[#EAF0F7] dark:border-[#1C2E52] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400">Year {year.year}</span>
                <div className="w-7 h-7 rounded-lg bg-[#F8F5EE] dark:bg-[#14264A] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-[#14264A] dark:text-[#F2B544]" />
                </div>
              </div>

              <h3 className="font-extrabold text-[#14264A] dark:text-white text-base mb-1">
                {year.title}
              </h3>

              <div className="flex items-center justify-between text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5">
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    year.progress === 100
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : year.progress > 0
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-[#F2B544]'
                      : 'bg-gray-50 text-gray-500 dark:bg-gray-800/40 dark:text-gray-400'
                  }`}
                >
                  {year.progress}%
                </span>
                <span className="text-[11px] text-[#6B7280] dark:text-gray-400 capitalize">
                  {year.status.replace('-', ' ')}
                </span>
              </div>

              <div className="w-full bg-[#EAF0F7] dark:bg-[#1A2E56] h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    year.progress === 100
                      ? 'bg-emerald-500'
                      : isSelected
                      ? 'bg-[#14264A] dark:bg-[#F2B544]'
                      : 'bg-blue-600'
                  }`}
                  style={{ width: `${year.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Roadmap Area with Vertical Timeline and Recommended Next Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Middle: Timeline of Topics */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F1EFEA] dark:border-gray-800 gap-2">
            <div>
              <h2 className="text-lg font-extrabold text-[#14264A] dark:text-white">
                {currentSemester.title}
              </h2>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                {currentYearData.description}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF6E4] dark:bg-[#2A2312] text-[#B45309] dark:text-[#F2B544] shrink-0 w-fit">
              Focus Term
            </span>
          </div>

          {/* Vertical Timeline matching reference */}
          <div className="relative pt-6 pl-4 sm:pl-6 space-y-8">
            {/* Vertical connector line */}
            <div className="absolute left-7 sm:left-9 top-8 bottom-8 w-0.5 bg-[#E2E8F0] dark:bg-gray-800" />

            {currentSemester.topics.map((topic) => {
              const isCompleted = topic.status === 'completed';
              const isInProgress = topic.status === 'in-progress';

              return (
                <div key={topic.id} className="relative flex items-start gap-5 group">
                  {/* Status Indicator Node on timeline */}
                  <div className="relative z-10 shrink-0">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0B162C] border-2 border-[#14264A] dark:border-[#F2B544] ring-4 ring-[#FEF6E4] dark:ring-[#2A2312] flex items-center justify-center text-[#14264A] dark:text-[#F2B544] shadow-xs animate-pulse">
                        <Clock className="w-4 h-4 text-[#F2B544]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400">
                        <Circle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Card Content for Topic */}
                  <div
                    onClick={() => {
                      if (isInProgress || isCompleted) onNavigate('learning');
                    }}
                    className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isInProgress
                        ? 'bg-[#FAF7F2] dark:bg-[#14264A]/60 border-[#F2B544]/60 shadow-xs'
                        : isCompleted
                        ? 'bg-[#F8F5EE] dark:bg-[#0B162C]/60 border-transparent hover:border-[#CBD5E1] dark:hover:border-gray-700'
                        : 'bg-white dark:bg-[#0B162C] border-gray-100 dark:border-gray-800 hover:border-gray-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#14264A] dark:text-white group-hover:text-[#0B1B36] dark:group-hover:text-[#F2B544]">
                          {topic.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">
                          • {topic.hours} hrs
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                        Domain: {topic.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400'
                            : isInProgress
                            ? 'bg-[#14264A] dark:bg-[#F2B544] text-[#F2B544] dark:text-[#14264A]'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                      </span>

                      {isInProgress && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('learning');
                          }}
                          className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] hover:underline flex items-center gap-1"
                        >
                          Learn <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 mt-6 border-t border-[#F1EFEA] dark:border-gray-800 flex justify-between items-center">
            <span className="text-xs text-[#6B7280] dark:text-gray-400">
              Completed 1/5 Modules in this semester
            </span>
            <button
              onClick={() => onNavigate('learning')}
              className="px-5 py-2.5 bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl hover:bg-[#0B1B36] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2B544] dark:text-[#14264A]" />
            </button>
          </div>
        </div>

        {/* Right Side: Recommended Next Card matching reference */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-7 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF6E4] dark:bg-[#2A2312] flex items-center justify-center text-[#B45309] mb-4">
              <Lightbulb className="w-6 h-6 text-[#F2B544] fill-[#F2B544]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Recommended Next
            </span>

            <h3 className="text-xl font-extrabold text-[#14264A] dark:text-white mt-1 mb-2">
              Machine Learning
            </h3>

            <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed mb-6">
              Based on your skill gap analysis, we recommend you focus on Machine Learning next to unlock intermediate AI projects.
            </p>

            <button
              onClick={() => onNavigate('learning')}
              className="w-full py-3 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Learning</span>
              <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
            </button>
          </div>

          {/* Quick Syllabus summary */}
          <div className="bg-[#FAF7F2] dark:bg-[#0F1D38] p-5 rounded-3xl border border-[#EAF0F7] dark:border-[#1C2E52] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-white">
              Prerequisite Status
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] dark:text-gray-400">Data Structures (C++)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Cleared</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] dark:text-gray-400">Linear Algebra & Stats</span>
                <span className="text-amber-700 dark:text-[#F2B544] font-bold">85% Cleared</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] dark:text-gray-400">Python Programming</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
