import React from 'react';
import { NavTab } from '../types';
import { RaahLogo } from '../components/RaahLogo';
import { Award, Compass, Heart, GraduationCap, ArrowRight, ShieldCheck, Target } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-[#182235]">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center mb-2">
          <RaahLogo variant="stacked" size="lg" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14264A]">
          Empowering College Engineers to Build Purposeful Careers
        </h1>
        <p className="text-base text-[#6B7280] leading-relaxed">
          "RAAH" is the Hindi/Urdu word for <strong>Path or Way</strong>. We created RAAH to give every Computer Science, AI, and Engineering student clear direction from their very first day of college through graduation.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-[#EAF0F7] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#14264A]">
            <Compass className="w-6 h-6 text-[#14264A]" />
          </div>
          <h3 className="font-extrabold text-lg text-[#14264A]">Clarity Over Confusion</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Engineering students are bombarded with endless courses, YouTube tutorials, and contradictory advice. RAAH condenses the noise into one sequenced 4-year roadmap.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-[#EAF0F7] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#14264A]">
            <Target className="w-6 h-6 text-[#14264A]" />
          </div>
          <h3 className="font-extrabold text-lg text-[#14264A]">Practical Competence</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Syllabus exams test memorization. RAAH prepares you for industry technical interviews with real coding practice, automated test suites, and verified portfolio projects.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-[#EAF0F7] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#14264A]">
            <Award className="w-6 h-6 text-[#14264A]" />
          </div>
          <h3 className="font-extrabold text-lg text-[#14264A]">Placement Readiness</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Continuous skill gap analysis and readiness scoring ensure students enter their final campus placement season ahead of 90% of their peers.
          </p>
        </div>
      </div>

      {/* Mission statement */}
      <div className="bg-gradient-to-r from-[#14264A] to-[#0B1B36] rounded-3xl p-8 sm:p-10 text-white text-center max-w-4xl mx-auto shadow-lg space-y-4">
        <h2 className="text-2xl font-extrabold">Because Your Future Deserves a Plan</h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
          Start your personalized roadmap today and build the skills, confidence, and portfolio necessary for the career you want.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('setup')}
            className="px-6 py-3 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            Start Your Journey →
          </button>
        </div>
      </div>
    </div>
  );
};
