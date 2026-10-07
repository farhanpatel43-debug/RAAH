import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Code,
  Flame,
  Award,
  Clock,
  Target,
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

interface RoadmapSetupPageProps {
  user: UserProfile;
  onSaveRoadmap: (updatedUser: UserProfile) => void;
  onNavigate: (tab: NavTab) => void;
}

export const RoadmapSetupPage: React.FC<RoadmapSetupPageProps> = ({
  user,
  onSaveRoadmap,
  onNavigate,
}) => {
  const [branch, setBranch] = useState(user.branch || 'Computer Science & Engineering (AI/ML)');
  const [currentYear, setCurrentYear] = useState(user.currentYear || '3rd Year');
  const [targetCareer, setTargetCareer] = useState(user.targetCareer || 'Data Scientist');
  const [skills, setSkills] = useState<string[]>(user.skills.length ? user.skills : ['Python', 'SQL', 'DSA', 'Machine Learning']);
  const [dailyStudyTime, setDailyStudyTime] = useState(user.dailyStudyTime || '2 hours');
  const [interests, setInterests] = useState<string[]>(user.interests.length ? user.interests : ['Data Science', 'AI/ML']);
  const [isGenerating, setIsGenerating] = useState(false);

  const availableSkills = [
    'Python',
    'C++',
    'Java',
    'HTML/CSS',
    'JavaScript',
    'SQL',
    'Machine Learning',
    'DSA',
    'Git/GitHub',
    'Docker',
    'React',
  ];

  const availableInterests = [
    'AI/ML',
    'Data Science',
    'Web Development',
    'Cyber Security',
    'Cloud',
    'App Development',
  ];

  const studyTimes = ['1 hour', '2 hours', '3 hours', '4+ hours'];

  const targetCareers = [
    'Data Scientist',
    'ML Engineer',
    'Software Engineer',
    'Web Developer',
    'Cybersecurity Analyst',
    'Cloud Engineer',
    'Data Analyst',
  ];

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    let score = 45;
    if (skills.includes('Python')) score += 10;
    if (skills.includes('SQL')) score += 8;
    if (skills.includes('Machine Learning')) score += 12;
    if (skills.includes('DSA')) score += 10;
    if (skills.includes('Git/GitHub')) score += 5;
    score = Math.min(score, 90);

    setTimeout(() => {
      const updated: UserProfile = {
        ...user,
        branch,
        currentYear,
        targetCareer,
        skills,
        dailyStudyTime,
        interests,
        readinessScore: score,
      };
      onSaveRoadmap(updated);
      onNavigate('dashboard');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-[#182235] dark:text-[#F1F5F9] transition-colors">
      {/* Title Header matching reference */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
            Let's Build Your Personalized Roadmap
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            Tell us about yourself so we can create the best plan for you.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Left Side */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-sm">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Branch */}
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-2 uppercase tracking-wider">
                Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm font-semibold focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544] cursor-pointer"
              >
                <option value="Computer Science & Engineering (AI/ML)">Computer Science & Engineering (AI/ML)</option>
                <option value="Artificial Intelligence & Machine Learning (AI/ML)">Artificial Intelligence & Machine Learning (AI/ML)</option>
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
              </select>
            </div>

            {/* Current Year */}
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-2 uppercase tracking-wider">
                Current Year
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setCurrentYear(yr)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      currentYear === yr
                        ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] shadow-xs'
                        : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E386D]'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Career */}
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-2 uppercase tracking-wider">
                Target Career
              </label>
              <select
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm font-semibold focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544] cursor-pointer"
              >
                {targetCareers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Skills (Select what you know) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#14264A] dark:text-gray-200 uppercase tracking-wider">
                  Current Skills
                </label>
                <span className="text-[11px] text-[#6B7280] dark:text-gray-400">Select what you already know</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((sk) => {
                  const isSelected = skills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] shadow-xs'
                          : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E386D]'
                      }`}
                    >
                      {sk} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Study Time */}
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-2 uppercase tracking-wider">
                Daily Study Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {studyTimes.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setDailyStudyTime(st)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      dailyStudyTime === st
                        ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] shadow-xs'
                        : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E386D]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Your Interests */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#14264A] dark:text-gray-200 uppercase tracking-wider">
                  Your Interests (optional)
                </label>
                <span className="text-[11px] text-[#6B7280] dark:text-gray-400">Select tech domains</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] shadow-xs'
                          : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E386D]'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <span>Generating Your Custom Roadmap...</span>
                ) : (
                  <>
                    <span>Generate My Roadmap</span>
                    <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Card matching reference */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-sm text-center">
            {/* Target Compass Icon in circle */}
            <div className="w-16 h-16 rounded-full bg-[#FEF6E4] dark:bg-[#2A2312] border border-[#F2B544]/50 flex items-center justify-center mx-auto mb-4 text-[#14264A]">
              <Compass className="w-8 h-8 text-[#14264A] dark:text-[#F2B544]" />
            </div>

            <h3 className="text-lg font-extrabold text-[#14264A] dark:text-white leading-snug">
              Your Personalized <br /> 4-Year Journey Awaits!
            </h3>

            <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-2 mb-6 leading-relaxed">
              Based on your selection for <span className="font-bold text-[#14264A] dark:text-[#F2B544]">{targetCareer}</span> in <span className="font-bold">{branch}</span>, we will organize your college terms into an achievable step-by-step master plan.
            </p>

            {/* Checklist matching reference */}
            <div className="text-left space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              {[
                'Learn in the right order',
                'Build real projects',
                'Practice with quizzes',
                'Get career guidance',
                'Become job ready',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#182235] dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Dynamic preview badge */}
            <div className="mt-6 p-3.5 bg-[#FAF7F2] dark:bg-[#14264A]/60 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52] text-left">
              <div className="flex items-center justify-between text-xs font-bold text-[#14264A] dark:text-white">
                <span>Projected Target:</span>
                <span className="text-[#F2B544]">{targetCareer}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                <span>Daily Commitment:</span>
                <span className="font-semibold text-[#14264A] dark:text-gray-200">{dailyStudyTime}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                <span>Current Stage:</span>
                <span className="font-semibold text-[#14264A] dark:text-gray-200">{currentYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
