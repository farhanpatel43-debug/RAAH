import React from 'react';
import { NavTab } from '../types';
import { StudentHeroIllustration } from '../components/StudentHeroIllustration';
import {
  CalendarRange,
  Sparkles,
  Code2,
  FolderGit2,
  Compass,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  BrainCircuit,
  BookOpenCheck,
  Award,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: NavTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const featureCards = [
    {
      title: '4-Year Roadmap',
      desc: 'Semester-by-semester curriculum tailored to your branch and target career.',
      icon: CalendarRange,
      actionTab: 'public-roadmap' as NavTab,
    },
    {
      title: 'AI Recommendations',
      desc: 'Smart skill gap analysis and intelligent next-step topic prioritization.',
      icon: Sparkles,
      actionTab: 'career-guidance' as NavTab,
    },
    {
      title: 'Coding Practice',
      desc: 'Curated DSA & problem sets mapped directly to placement interview patterns.',
      icon: Code2,
      actionTab: 'coding' as NavTab,
    },
    {
      title: 'Project Guidance',
      desc: 'Industry-grade projects with architectural steps and starter repositories.',
      icon: FolderGit2,
      actionTab: 'public-projects' as NavTab,
    },
    {
      title: 'Career Guidance',
      desc: 'Real-time job readiness score, resume benchmarks, and mentor insights.',
      icon: Compass,
      actionTab: 'careers' as NavTab,
    },
  ];

  const fourYearPillars = [
    {
      year: 'Year 1',
      title: 'Foundation',
      topics: 'C / C++, Discrete Math, Problem Solving, Computer Fundamentals',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
    },
    {
      year: 'Year 2',
      title: 'Core CS',
      topics: 'Data Structures & Algorithms, DBMS, Operating Systems, Networks',
      color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    },
    {
      year: 'Year 3',
      title: 'Specialization',
      topics: 'AI/ML, Data Science, Web/Cloud Systems, Advanced Electives',
      color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-[#F2B544] dark:border-amber-800',
    },
    {
      year: 'Year 4',
      title: 'Placement',
      topics: 'Capstone Engineering, System Design, Mock Technical Rounds',
      color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE] dark:bg-[#08101F] text-[#182235] dark:text-[#F1F5F9] transition-colors">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#F2B544]" />
                <span className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] tracking-wide uppercase">
                  Personalized College-to-Career Platform
                </span>
              </div>

              {/* Large Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14264A] dark:text-white tracking-tight leading-[1.15]">
                Your 4-Year <br />
                CSE Journey, <br />
                <span className="text-[#F2B544] drop-shadow-xs">Planned for Success</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-300 max-w-xl leading-relaxed">
                Personalized roadmap, skill development, quizzes, coding practice, projects and career guidance — all in one place.
              </p>

              {/* Hero Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('setup')}
                  className="px-7 py-3.5 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] dark:hover:bg-[#dfa233] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('careers')}
                  className="px-7 py-3.5 bg-white dark:bg-[#0F1D38] hover:bg-[#F8F5EE] dark:hover:bg-[#14264A] text-[#14264A] dark:text-white border border-[#CBD5E1] dark:border-[#1C2E52] font-bold text-sm sm:text-base rounded-2xl shadow-xs transition-all cursor-pointer"
                >
                  Explore Careers
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#6B7280] dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Free for CSE & AI Students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Aligned with Tech Placements</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Illustration matching reference image */}
            <div className="lg:col-span-5 flex justify-center">
              <StudentHeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 5 Feature Cards matching reference */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {featureCards.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(feature.actionTab)}
                className="bg-white dark:bg-[#0F1D38] p-5 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs hover:shadow-md hover:border-[#F2B544]/60 dark:hover:border-[#F2B544]/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F8F5EE] dark:bg-[#14264A] group-hover:bg-[#FEF6E4] dark:group-hover:bg-[#2A2312] flex items-center justify-center mb-3 transition-colors">
                    <Icon className="w-5 h-5 text-[#14264A] dark:text-[#F2B544] group-hover:text-[#B45309] dark:group-hover:text-[#F2B544] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#14264A] dark:text-white text-sm group-hover:text-[#0B1B36] flex items-center justify-between">
                    <span>{feature.title}</span>
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1.5 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="pt-3 mt-2 flex items-center gap-1 text-[11px] font-bold text-[#14264A] dark:text-[#F2B544] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 text-[#F2B544]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Year Pathway Breakdown preview */}
      <section className="py-14 bg-white dark:bg-[#08101F] border-y border-[#EAF0F7] dark:border-[#1C2E52] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F2B544] mb-2">
              Semester-by-Semester Roadmap
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
              How RAAH Guides You Through Engineering
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-2">
              Eliminate confusion about what to learn next. From Day 1 of college to final placement day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {fourYearPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] hover:border-[#14264A]/30 transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${pillar.color}`}>
                    {pillar.year}
                  </span>
                  <span className="text-xs font-semibold text-[#6B7280] dark:text-gray-400">
                    Sem {idx * 2 + 1} & {idx * 2 + 2}
                  </span>
                </div>
                <h4 className="font-extrabold text-lg text-[#14264A] dark:text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  {pillar.topics}
                </p>
                <div className="mt-4 pt-3 border-t border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-[#14264A] dark:text-gray-300">
                  <span>Job Readiness:</span>
                  <span className="font-bold text-[#F2B544]">{idx === 0 ? '25%' : idx === 1 ? '50%' : idx === 2 ? '75%' : '100%'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('public-roadmap')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-sm font-bold hover:bg-[#0B1B36] transition-colors cursor-pointer"
            >
              <span>View Full Interactive Roadmap</span>
              <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
            </button>
          </div>
        </div>
      </section>

      {/* Why College Students Choose RAAH */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-[#F2B544] tracking-wider uppercase">
              The RAAH Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white leading-tight">
              Stop Wasting Semesters Wondering What to Study
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-gray-300 leading-relaxed">
              Most college students realize in their 4th year that rote syllabus exams don't prepare them for tech interviews. RAAH gives you a structured, proven blueprint so every semester moves you closer to your dream offer.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <BrainCircuit className="w-5 h-5 text-[#14264A] dark:text-[#F2B544] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#14264A] dark:text-white">No More Tutorial Hell</h5>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">Practical, hands-on coding modules instead of passive 20-hour videos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpenCheck className="w-5 h-5 text-[#14264A] dark:text-[#F2B544] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#14264A] dark:text-white">Verified Portfolio Projects</h5>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">Build standout projects with real architectures recruiters actually look for.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#14264A] dark:text-[#F2B544] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#14264A] dark:text-white">Continuous Readiness Scoring</h5>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">Know exactly where your skill gaps lie before college placement season begins.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#0F1D38] p-6 sm:p-8 rounded-3xl border border-[#EAF0F7] dark:border-[#1C2E52] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1EFEA] dark:border-gray-800">
              <div>
                <span className="text-xs font-bold text-[#14264A] dark:text-white">Student Milestone Dashboard</span>
                <p className="text-xs text-[#6B7280] dark:text-gray-400">Farhan's Year 3 Specialization Status</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                72% Job Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 bg-[#F8F5EE] dark:bg-[#14264A]/60 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52]">
                <span className="text-xs text-[#6B7280] dark:text-gray-400 font-medium">Daily Streak</span>
                <p className="text-2xl font-extrabold text-[#14264A] dark:text-white mt-1">6 Days 🔥</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+15% vs peers</span>
              </div>
              <div className="p-4 bg-[#F8F5EE] dark:bg-[#14264A]/60 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52]">
                <span className="text-xs text-[#6B7280] dark:text-gray-400 font-medium">Core Skills Mastered</span>
                <p className="text-2xl font-extrabold text-[#14264A] dark:text-white mt-1">8 Skills</p>
                <span className="text-[10px] text-blue-600 dark:text-blue-300 font-semibold">Python, SQL, DSA...</span>
              </div>
              <div className="p-4 bg-[#F8F5EE] dark:bg-[#14264A]/60 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52]">
                <span className="text-xs text-[#6B7280] dark:text-gray-400 font-medium">Projects Built</span>
                <p className="text-2xl font-extrabold text-[#14264A] dark:text-white mt-1">3 Live</p>
                <span className="text-[10px] text-amber-600 dark:text-[#F2B544] font-semibold">Ready for GitHub</span>
              </div>
            </div>

            <div className="p-4 bg-[#14264A] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#F2B544] font-bold uppercase tracking-wider">Ready to customize yours?</p>
                <p className="text-sm font-semibold">Answer 5 quick questions to generate your plan.</p>
              </div>
              <button
                onClick={() => onNavigate('setup')}
                className="px-5 py-2.5 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer"
              >
                Build My Roadmap →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#14264A] to-[#0B1B36] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl text-center">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="w-12 h-12 bg-[#F2B544]/20 border border-[#F2B544] rounded-2xl flex items-center justify-center mx-auto text-[#F2B544]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Because Your Future Deserves a Plan.
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Start now and enter your final year confident, skilled, and ready for premier tech placements.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('signup')}
                className="px-8 py-3.5 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                Create Free Account
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-2xl border border-white/20 transition-colors cursor-pointer"
              >
                Sign In as Farhan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
