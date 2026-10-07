import React, { useState } from 'react';
import { NavTab, CodingProblem, UserProfile } from '../types';
import { codingProblems } from '../data/mockData';
import {
  Code2,
  Search,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  X,
  Clock,
  Terminal,
} from 'lucide-react';

interface CodingPracticePageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
  onProblemSolved?: (problemId: number) => void;
}

export const CodingPracticePage: React.FC<CodingPracticePageProps> = ({
  user,
  onNavigate,
  onProblemSolved,
}) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProblem, setActiveProblem] = useState<CodingProblem | null>(null);
  const [userCode, setUserCode] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const filterTags = [
    'All',
    'Arrays',
    'Strings',
    'Linked List',
    'Trees',
    'Graphs',
    'Dynamic Programming',
  ];

  const filteredProblems = codingProblems.filter((p) => {
    const matchesTag =
      selectedTag === 'All' ||
      p.category.toLowerCase().includes(selectedTag.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleOpenProblem = (prob: CodingProblem) => {
    setActiveProblem(prob);
    setUserCode(prob.starterCode);
    setTestOutput(null);
  };

  const handleRunCode = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTestOutput(
        `✔ Test Case 1: Input "${activeProblem?.testCases[0]?.input}" -> Output: ${activeProblem?.testCases[0]?.output} [PASSED]\n✔ Test Case 2: Input "${activeProblem?.testCases[1]?.input}" -> Output: ${activeProblem?.testCases[1]?.output} [PASSED]\n✔ Runtime: 42ms | Memory: 16.4MB (Beats 89.2% of Python submissions)`
      );
      if (activeProblem && onProblemSolved) {
        onProblemSolved(activeProblem.id);
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-[#182235]">
      {/* Title & Subtitle matching reference */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A]">
          Coding Practice
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Solve problems, improve your skills and earn XP
        </p>
      </div>

      {/* Filter tags and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter tags matching reference */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#14264A] text-white shadow-xs'
                  : 'bg-white text-[#6B7280] border border-[#EAF0F7] hover:border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#EAF0F7] text-xs focus:outline-none focus:border-[#14264A]"
          />
        </div>
      </div>

      {/* Problems Table / List matching reference */}
      <div className="bg-white rounded-3xl border border-[#EAF0F7] shadow-xs overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredProblems.map((prob) => (
            <div
              key={prob.id}
              className="p-5 hover:bg-[#FAF7F2]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="w-6 text-center font-bold text-xs text-[#6B7280]">
                  {prob.id}
                </span>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-extrabold text-sm text-[#14264A] hover:underline cursor-pointer"
                        onClick={() => handleOpenProblem(prob)}>
                      {prob.title}
                    </h3>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {prob.difficulty}
                    </span>

                    <span className="text-[11px] text-gray-400 font-medium">
                      {prob.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B7280] line-clamp-1 mt-1 max-w-xl">
                    {prob.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end shrink-0 pl-10 sm:pl-0">
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span>{prob.acceptance} acc</span>
                  <span className="hidden md:inline">{prob.solvedCount}</span>
                </div>

                <button
                  onClick={() => handleOpenProblem(prob)}
                  className="px-4 py-2 bg-[#14264A] hover:bg-[#0B1B36] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Solve Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F2B544]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Code Editor Modal / Drawer */}
      {activeProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#14264A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-[#F2B544]" />
                <h3 className="font-extrabold text-base">
                  {activeProblem.id}. {activeProblem.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-bold">
                  {activeProblem.difficulty}
                </span>
              </div>
              <button
                onClick={() => setActiveProblem(null)}
                className="text-gray-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                  Problem Description
                </h4>
                <p className="text-xs leading-relaxed text-[#182235]">
                  {activeProblem.description}
                </p>
              </div>

              {/* Sample test cases */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAF0F7] text-xs font-mono space-y-1">
                <span className="font-bold text-[#14264A] text-[11px] uppercase tracking-wider block font-sans">
                  Sample Test Case
                </span>
                <p className="text-gray-600">Input: {activeProblem.testCases[0]?.input}</p>
                <p className="text-emerald-700 font-bold">Expected Output: {activeProblem.testCases[0]?.output}</p>
              </div>

              {/* Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#14264A] uppercase tracking-wider">
                    Python 3 Solution
                  </span>
                  <button
                    onClick={() => setUserCode(activeProblem.starterCode)}
                    className="text-xs text-gray-500 hover:text-[#14264A] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={9}
                  className="w-full p-4 bg-[#0B1B36] text-emerald-300 font-mono text-xs rounded-2xl focus:outline-none resize-none leading-relaxed border border-gray-800"
                  spellCheck={false}
                />
              </div>

              {/* Test Output */}
              {testOutput && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900 whitespace-pre-line">
                  {testOutput}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F8F5EE] border-t border-[#EAF0F7] flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">
                Success earns <strong className="text-[#14264A]">+25 XP</strong>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveProblem(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isTesting}
                  className="px-5 py-2 bg-[#14264A] hover:bg-[#0B1B36] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-[#F2B544] fill-[#F2B544]" />
                  <span>{isTesting ? 'Running Test Cases...' : 'Submit Solution'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
