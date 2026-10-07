import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import { dsaQuizQuestions } from '../data/mockData';
import {
  HelpCircle,
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface QuizzesPageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
  onAddXp?: (amount: number) => void;
}

export const QuizzesPage: React.FC<QuizzesPageProps> = ({ user, onNavigate, onAddXp }) => {
  // Start on Question 4 (index 3) to match the reference screenshot exactly!
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(3);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    0: 'C', // Q1 correct
    1: 'B', // Q2 correct
    2: 'A', // Q3 correct
    3: 'A', // Q4 correct (as in screenshot)
  });
  const [submitted, setSubmitted] = useState(false);

  const currentQ = dsaQuizQuestions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (optId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < dsaQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Performance calculations
  const totalQuestions = 10;
  const correctCount = 8;
  const incorrectCount = 2;
  const scorePercent = 80;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-[#182235]">
      {/* Title & Score Badge matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A]">
            DSA Quiz - Arrays
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Test your knowledge and earn XP
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-[#EAF0F7] text-[#14264A] text-sm font-extrabold rounded-2xl border border-[#CBD5E1] shadow-2xs">
            Score: {scorePercent}%
          </span>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FEF6E4] text-[#B45309] text-xs font-bold rounded-2xl border border-[#F2B544]/40">
            <Sparkles className="w-4 h-4 text-[#F2B544]" />
            <span>+20 XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Quiz Area (Question + Options) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] shadow-xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#F1EFEA] mb-6">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {dsaQuizQuestions.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#14264A] border border-[#EAF0F7]">
                {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-extrabold text-[#14264A] mb-6 leading-relaxed">
              Q{currentQuestionIndex + 1}. {currentQ.question}
            </h2>

            {/* Options A, B, C, D matching reference */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = opt.id === currentQ.correctOptionId;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF7F2] border-[#14264A] ring-2 ring-[#14264A]/20 shadow-xs'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-[#F8F5EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isSelected
                            ? 'bg-[#14264A] text-white'
                            : 'bg-[#F8F5EE] text-[#6B7280]'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-sm font-semibold text-[#182235]">
                        {opt.text}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {selectedOption && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 animate-in fade-in duration-200">
                <span className="font-bold flex items-center gap-1.5 mb-1 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  Explanation:
                </span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls matching reference */}
          <div className="pt-6 mt-6 border-t border-[#F1EFEA] flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                currentQuestionIndex === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#14264A] hover:bg-[#F8F5EE] cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>{currentQuestionIndex === dsaQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4 text-[#F2B544]" />
            </button>
          </div>
        </div>

        {/* Right Side: Quiz Summary & Performance matching reference */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quiz Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAF0F7] shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4">
              Quiz Summary
            </h3>

            <div className="flex items-center justify-center py-4">
              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="38" stroke="#EAF0F7" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="38"
                    stroke="#14264A"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - 0.8)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-[#14264A]">80%</span>
                  <span className="text-[10px] font-bold text-[#F2B544]">+20 XP</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Total Questions</span>
                <span className="font-bold text-[#14264A]">{totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Correct Answers</span>
                <span className="font-bold text-emerald-600">{correctCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Incorrect Answers</span>
                <span className="font-bold text-rose-500">{incorrectCount}</span>
              </div>
            </div>
          </div>

          {/* Performance Breakdown Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAF0F7] shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Performance Breakdown
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#14264A]">Easy</span>
                  <span className="text-emerald-600 font-bold">100%</span>
                </div>
                <div className="w-full bg-[#EAF0F7] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#14264A]">Medium</span>
                  <span className="text-blue-600 font-bold">75%</span>
                </div>
                <div className="w-full bg-[#EAF0F7] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#14264A] h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#14264A]">Hard</span>
                  <span className="text-amber-600 font-bold">50%</span>
                </div>
                <div className="w-full bg-[#EAF0F7] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F2B544] h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('coding')}
              className="w-full mt-4 py-2.5 bg-[#FAF7F2] hover:bg-[#F2EFE8] text-[#14264A] text-xs font-bold rounded-xl border border-[#EAF0F7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Practice DSA Problems</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2B544]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
