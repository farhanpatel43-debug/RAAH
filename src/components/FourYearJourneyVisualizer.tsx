import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  GraduationCap,
  Layers,
  Sparkles,
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Code2,
  Building2,
  Briefcase,
} from 'lucide-react';

interface FourYearJourneyVisualizerProps {
  user: UserProfile;
  onNavigateToTab?: (tab: any) => void;
}

export interface SemesterData {
  semNumber: number;
  yearNumber: number;
  title: string;
  theme: string;
  status: 'completed' | 'current' | 'upcoming';
  progress: number;
  cgpa: string;
  milestones: { name: string; completed: boolean }[];
  primarySubjects: string[];
  careerCheckpoint: string;
}

export const semestersList: SemesterData[] = [
  {
    semNumber: 1,
    yearNumber: 1,
    title: 'Semester 1',
    theme: 'Foundations & Algorithmic Logic',
    status: 'completed',
    progress: 100,
    cgpa: '8.80',
    milestones: [
      { name: 'Write first C programming code', completed: true },
      { name: 'Complete Engineering Math 1 & Physics', completed: true },
      { name: 'Setup Linux terminal & Git repository', completed: true },
    ],
    primarySubjects: ['C Programming', 'Engineering Calculus', 'Digital Logic', 'Physics Lab'],
    careerCheckpoint: 'Discovered passion for software engineering & AI',
  },
  {
    semNumber: 2,
    yearNumber: 1,
    title: 'Semester 2',
    theme: 'Object Oriented Principles & Math',
    status: 'completed',
    progress: 100,
    cgpa: '8.65',
    milestones: [
      { name: 'Master Object-Oriented Programming (C++)', completed: true },
      { name: 'Complete Discrete Mathematics & Probability', completed: true },
      { name: 'Publish first mini console project on GitHub', completed: true },
    ],
    primarySubjects: ['OOP in C++', 'Discrete Math', 'Python Intro', 'Data Analysis Lab'],
    careerCheckpoint: 'Built first CLI tools & solved 25 basic algorithm questions',
  },
  {
    semNumber: 3,
    yearNumber: 2,
    title: 'Semester 3',
    theme: 'Core Data Structures & Architecture',
    status: 'completed',
    progress: 100,
    cgpa: '8.90',
    milestones: [
      { name: 'Implement Linked Lists, Stacks, Queues & Trees', completed: true },
      { name: 'Learn SQL & Relational Database Design', completed: true },
      { name: 'Participate in college internal code hackathon', completed: true },
    ],
    primarySubjects: ['Data Structures in C++', 'DBMS & SQL', 'Computer Architecture', 'Design Thinking'],
    careerCheckpoint: 'Solidified DSA fundamentals & normalized schema design',
  },
  {
    semNumber: 4,
    yearNumber: 2,
    title: 'Semester 4',
    theme: 'Operating Systems, Networks & Full-Stack',
    status: 'completed',
    progress: 100,
    cgpa: '8.75',
    milestones: [
      { name: 'Understand OS Scheduling, Memory & Semaphores', completed: true },
      { name: 'Socket Programming & TCP/IP Computer Networks', completed: true },
      { name: 'Build first full-stack web app with React & REST API', completed: true },
    ],
    primarySubjects: ['Operating Systems', 'Computer Networks', 'Algorithm Analysis', 'Web Tech'],
    careerCheckpoint: 'Created first full-stack portfolio app & reached 100 LeetCode questions',
  },
  {
    semNumber: 5,
    yearNumber: 3,
    title: 'Semester 5',
    theme: 'Specialization: Machine Learning & Pre-Placement',
    status: 'current',
    progress: 60,
    cgpa: '8.72 (Avg)',
    milestones: [
      { name: 'Machine Learning: Regression, Classification & Scikit-learn', completed: true },
      { name: 'Advanced Graph Algorithms & Dynamic Programming', completed: false },
      { name: 'Build Industry Capstone project blueprint', completed: true },
      { name: 'Resume V1 peer review & ATS optimization', completed: false },
    ],
    primarySubjects: ['Machine Learning', 'DBMS Advanced', 'DAA Algorithms', 'Cloud Computing'],
    careerCheckpoint: 'Targeting summer analyst & SDE internships (88% readiness achieved!)',
  },
  {
    semNumber: 6,
    yearNumber: 3,
    title: 'Semester 6',
    theme: 'Deep Learning, System Design & Internship Season',
    status: 'upcoming',
    progress: 0,
    cgpa: 'Target 9.00',
    milestones: [
      { name: 'Deep Learning with PyTorch & Computer Vision', completed: false },
      { name: 'High-Level System Design (HLD) & Caching', completed: false },
      { name: 'Convert Summer Internship offer at tier-1 firm', completed: false },
    ],
    primarySubjects: ['Deep Learning', 'System Design', 'Cyber Security', 'Elective Track'],
    careerCheckpoint: 'Secure 2-3 month paid industrial internship',
  },
  {
    semNumber: 7,
    yearNumber: 4,
    title: 'Semester 7',
    theme: 'Campus Placement Drive & Job Offers',
    status: 'upcoming',
    progress: 0,
    cgpa: 'Target 9.00',
    milestones: [
      { name: 'On-campus placement tests (Aptitude + Coding)', completed: false },
      { name: 'Technical & HR Mock Interview rounds', completed: false },
      { name: 'Accept Full-Time Employment (FTE) Offer', completed: false },
    ],
    primarySubjects: ['Distributed Systems', 'Natural Language Processing', 'Placement Lab'],
    careerCheckpoint: 'Receive dream offer in Data Science / Software Engineering',
  },
  {
    semNumber: 8,
    yearNumber: 4,
    title: 'Semester 8',
    theme: 'Final Capstone Project & Industry Onboarding',
    status: 'upcoming',
    progress: 0,
    cgpa: 'Target 9.00',
    milestones: [
      { name: 'Deploy production final-year capstone project', completed: false },
      { name: 'Publish research paper / patent filing', completed: false },
      { name: 'Engineering graduation & corporate onboarding', completed: false },
    ],
    primarySubjects: ['Major Capstone Project', 'Industry Internship', 'Ethics in AI'],
    careerCheckpoint: 'Graduate B.Tech with First Class with Distinction 🎓',
  },
];

export const FourYearJourneyVisualizer: React.FC<FourYearJourneyVisualizerProps> = ({
  user,
  onNavigateToTab,
}) => {
  const [selectedSemNumber, setSelectedSemNumber] = useState<number>(5); // Semester 5 current
  const activeSem = semestersList.find((s) => s.semNumber === selectedSemNumber) || semestersList[4];

  const yearThemes = [
    { year: 1, title: 'Year 1: Foundations', icon: GraduationCap, status: 'Completed (100%)', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' },
    { year: 2, title: 'Year 2: Core CS', icon: Layers, status: 'Completed (100%)', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' },
    { year: 3, title: 'Year 3: Specialization', icon: Sparkles, status: 'In Progress (Sem 5: 60%)', badge: 'bg-[#FEF6E4] text-[#B45309] dark:bg-[#2A2312] dark:text-[#F2B544] ring-2 ring-[#F2B544]/50' },
    { year: 4, title: 'Year 4: Placements & Launch', icon: Target, status: 'Upcoming', badge: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  ];

  return (
    <div className="space-y-6 text-[#182235] dark:text-[#F1F5F9]">
      {/* Overview Header */}
      <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309] dark:text-[#F2B544] bg-[#FEF6E4] dark:bg-[#2A2312] px-3 py-0.5 rounded-full">
                Interactive Engineering Roadmap
              </span>
              <span className="text-xs text-[#6B7280] dark:text-gray-400 font-semibold">
                8 Semesters • 4 Years • 160+ Credits
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14264A] dark:text-white">
              Four-Year Journey Visualization
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1 max-w-2xl">
              From 1st year beginner to placement-ready engineer. Scrub across all 8 semesters to see milestones, CGPA benchmarks, and career launch checkpoints.
            </p>
          </div>

          <div className="bg-[#F8F5EE] dark:bg-[#14264A]/50 p-4 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52] sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-gray-400 block">
              Cumulative CGPA
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#14264A] dark:text-white">
              8.72 <span className="text-xs font-bold text-[#F2B544]">/ 10.0</span>
            </span>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              Target 8.5+ Maintained ✓
            </p>
          </div>
        </div>

        {/* 4 Years High Level Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          {yearThemes.map((yt) => {
            const Icon = yt.icon;
            const isCurrentYear = yt.year === 3;
            return (
              <div
                key={yt.year}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isCurrentYear
                    ? 'bg-amber-50/50 dark:bg-[#14264A]/80 border-[#F2B544] shadow-xs'
                    : 'bg-[#F8F5EE] dark:bg-[#08101F]/60 border-[#EAF0F7] dark:border-[#1C2E52]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400">
                    Year {yt.year}
                  </span>
                  <Icon className="w-4 h-4 text-[#14264A] dark:text-[#F2B544]" />
                </div>
                <h4 className="text-xs font-extrabold text-[#14264A] dark:text-white">
                  {yt.title}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-2 ${yt.badge}`}>
                  {yt.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8-Semester Interactive Stepper / Scrubber */}
      <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-4 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#F2B544]" />
          <span>Select Any Semester to Inspect Milestones & Focus</span>
        </h3>

        {/* Track with 8 nodes */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[700px] relative px-4">
            {/* Background connecting line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 bg-[#EAF0F7] dark:bg-gray-800 z-0" />
            {/* Active completed colored line */}
            <div
              className="absolute left-8 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-emerald-500 to-[#F2B544] z-0 transition-all duration-500"
              style={{ width: `${((selectedSemNumber - 1) / 7) * 90}%` }}
            />

            {semestersList.map((sem) => {
              const isSelected = selectedSemNumber === sem.semNumber;
              const isCompleted = sem.status === 'completed';
              const isCurrent = sem.status === 'current';

              return (
                <div
                  key={sem.semNumber}
                  onClick={() => setSelectedSemNumber(sem.semNumber)}
                  className="relative z-10 flex flex-col items-center cursor-pointer group"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs transition-all shadow-xs ${
                      isSelected
                        ? 'bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A] scale-110 ring-4 ring-[#F2B544]/40'
                        : isCompleted
                        ? 'bg-emerald-500 text-white hover:scale-105'
                        : isCurrent
                        ? 'bg-[#F2B544] text-[#14264A] animate-pulse'
                        : 'bg-white dark:bg-gray-800 text-gray-500 border-2 border-gray-300 dark:border-gray-700 hover:border-[#14264A]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `S${sem.semNumber}`}
                  </div>

                  <span
                    className={`text-[11px] font-bold mt-2 whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'text-[#14264A] dark:text-[#F2B544] font-black'
                        : 'text-[#6B7280] dark:text-gray-400'
                    }`}
                  >
                    Sem {sem.semNumber}
                  </span>

                  {isCurrent && (
                    <span className="text-[9px] font-black uppercase text-[#F2B544] bg-[#2A2312] px-1 rounded absolute -top-4">
                      CURRENT
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Semester Deep Dive Card */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Theme & Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A]">
                  YEAR {activeSem.yearNumber} • SEMESTER {activeSem.semNumber}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    activeSem.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : activeSem.status === 'current'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {activeSem.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#14264A] dark:text-white mt-2">
                {activeSem.theme}
              </h3>
            </div>

            {/* Career checkpoint banner */}
            <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52]">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-gray-400 block mb-1">
                Career Checkpoint
              </span>
              <p className="text-xs font-semibold text-[#14264A] dark:text-gray-200">
                🎯 {activeSem.careerCheckpoint}
              </p>
            </div>

            {/* Coursework subjects */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-2">
                Key Subjects Covered
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSem.primarySubjects.map((sub, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#14264A] dark:text-gray-200"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Milestones Checklist */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                Semester Milestones ({activeSem.milestones.filter((m) => m.completed).length} /{' '}
                {activeSem.milestones.length} Completed)
              </span>
              <span className="text-xs font-bold text-[#F2B544]">
                CGPA: {activeSem.cgpa}
              </span>
            </div>

            <div className="space-y-2.5">
              {activeSem.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold transition-all ${
                    m.completed
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                      : 'bg-[#F8F5EE] dark:bg-[#14264A]/30 border-gray-200 dark:border-gray-800 text-[#14264A] dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        m.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                    <span>{m.name}</span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      m.completed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {m.completed ? 'Achieved ✓' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action Button */}
            {onNavigateToTab && activeSem.status === 'current' && (
              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => onNavigateToTab('learning')}
                  className="px-5 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue Current Semester Coursework</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F2B544] dark:text-[#14264A]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
