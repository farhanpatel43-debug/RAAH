import React, { useState } from 'react';
import { NavTab } from '../types';
import { mlChapters } from '../data/mockData';
import {
  Play,
  CheckCircle2,
  Lock,
  Code2,
  FileText,
  HelpCircle,
  Download,
  BookOpen,
  ArrowRight,
  Terminal,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Video,
  Bot,
} from 'lucide-react';

interface LearningPageProps {
  onNavigate: (tab: NavTab) => void;
}

export const LearningPage: React.FC<LearningPageProps> = ({ onNavigate }) => {
  const [activeChapterId, setActiveChapterId] = useState(3);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'quiz' | 'notes'>('practice');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  const initialCode = `import numpy as np
from sklearn.linear_model import LinearRegression

# Training data (Feature X, Target y)
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Initialize and fit Linear Regression model
model = LinearRegression()
model.fit(X, y)

# Predict for input X = 5
prediction = model.predict([[5]])
print(f"Prediction for X=5: {prediction[0]:.2f}")
print(f"Model Coefficient (slope): {model.coef_[0]:.2f}")
print(f"Model Intercept: {model.intercept_:.2f}")`;

  const [code, setCode] = useState(initialCode);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setCodeOutput(`> Running Python 3.11 with scikit-learn & numpy...\nPrediction for X=5: 10.00\nModel Coefficient (slope): 2.00\nModel Intercept: 0.00\n[Test Case 1]: Input [[5]] -> Output 10.00 (MATCHED)\n[Test Case 2]: Input [[10]] -> Output 20.00 (MATCHED)\n[Test Case 3]: Input [[0]] -> Output 0.00 (MATCHED)\n✔ All 3 Test Cases Passed successfully! (+15 XP)`);
    }, 700);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setCodeOutput(null);
  };

  const currentChapter = mlChapters.find((c) => c.id === activeChapterId) || mlChapters[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-[#182235] dark:text-[#F1F5F9] transition-colors">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-gray-400 mb-1">
          <span>Home</span>
          <span>&gt;</span>
          <span>Learning</span>
          <span>&gt;</span>
          <span className="text-[#14264A] dark:text-[#F2B544]">Machine Learning</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
          Machine Learning
        </h1>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-base font-bold text-[#F2B544]">
            Chapter {currentChapter.id}: {currentChapter.title}
          </span>
          <span className="text-xs text-[#6B7280] dark:text-gray-400">
            • Learn about simple and multiple linear regression, model evaluation and performance metrics.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Course Chapters matching reference */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 px-2">
            Course Chapters
          </h3>

          <div className="space-y-1">
            {mlChapters.map((ch) => {
              const isSelected = ch.id === activeChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterId(ch.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] shadow-xs'
                      : ch.completed
                      ? 'bg-[#FAF7F2] dark:bg-[#14264A]/60 text-[#14264A] dark:text-white hover:bg-[#F2EFE8] dark:hover:bg-[#1E386D]'
                      : 'text-[#6B7280] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center">{ch.id}.</span>
                    <span>{ch.title}</span>
                  </div>

                  <div>
                    {ch.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isSelected ? (
                      <span className="w-2 h-2 rounded-full bg-[#F2B544] dark:bg-[#14264A]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-[#6B7280] dark:text-gray-400 px-2 flex justify-between">
            <span>Overall Progress</span>
            <span className="font-bold text-[#14264A] dark:text-[#F2B544]">2/7 Completed</span>
          </div>
        </div>

        {/* Center / Main Content matching reference */}
        <div className="lg:col-span-6 space-y-6">
          {/* Video Player Card */}
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl border border-[#EAF0F7] dark:border-[#1C2E52] overflow-hidden shadow-xs">
            <div className="relative aspect-video bg-[#0B1B36] flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#F2B544_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <svg className="w-48 h-32 opacity-40" viewBox="0 0 200 120" fill="none">
                <line x1="20" y1="100" x2="180" y2="100" stroke="#FFF" strokeWidth="2" />
                <line x1="20" y1="20" x2="20" y2="100" stroke="#FFF" strokeWidth="2" />
                <circle cx="40" cy="85" r="4" fill="#F2B544" />
                <circle cx="70" cy="70" r="4" fill="#F2B544" />
                <circle cx="100" cy="55" r="4" fill="#F2B544" />
                <circle cx="130" cy="40" r="4" fill="#F2B544" />
                <circle cx="160" cy="30" r="4" fill="#F2B544" />
                <line x1="30" y1="92" x2="170" y2="25" stroke="#38BDF8" strokeWidth="3" />
              </svg>

              <button
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="w-16 h-16 rounded-full bg-[#14264A]/90 hover:bg-[#14264A] text-white flex items-center justify-center border-2 border-white/80 shadow-2xl transition-transform hover:scale-110 cursor-pointer z-10"
                aria-label="Play video"
              >
                <Play className="w-7 h-7 text-[#F2B544] fill-[#F2B544] ml-1" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                <span className="drop-shadow-md">Linear Regression Explained</span>
                <span className="px-2 py-0.5 rounded-md bg-black/60 font-mono text-[11px]">
                  12:45
                </span>
              </div>
            </div>

            {isPlayingVideo && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 text-xs text-[#14264A] dark:text-[#F2B544] flex items-center justify-between border-t border-amber-200 dark:border-amber-800">
                <span>▶ Video lecture streaming: Chapter 3 Key Formulas & Loss Gradient</span>
                <button onClick={() => setIsPlayingVideo(false)} className="font-bold underline">
                  Close Player
                </button>
              </div>
            )}
          </div>

          {/* Navigation Tabs matching reference */}
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
            <div className="flex border-b border-gray-100 dark:border-gray-800 gap-8 mb-6">
              {[
                { id: 'learn', label: 'Learn' },
                { id: 'practice', label: 'Practice' },
                { id: 'quiz', label: 'Quiz' },
                { id: 'notes', label: 'Notes' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'quiz') {
                      onNavigate('quizzes');
                    } else {
                      setActiveTab(tab.id as any);
                    }
                  }}
                  className={`pb-3 text-sm font-bold transition-colors cursor-pointer relative ${
                    activeTab === tab.id
                      ? 'text-[#14264A] dark:text-[#F2B544]'
                      : 'text-[#6B7280] dark:text-gray-400 hover:text-[#14264A] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2B544]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Practice */}
            {activeTab === 'practice' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#14264A] dark:text-[#F2B544]" />
                    <span className="text-xs font-extrabold text-[#14264A] dark:text-white uppercase tracking-wider">
                      Practice Coding
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#1C2E52] text-xs font-semibold bg-white dark:bg-[#0B162C] text-[#14264A] dark:text-white cursor-pointer">
                      <option value="python">Python</option>
                      <option value="cpp">C++</option>
                    </select>
                    <button
                      onClick={handleResetCode}
                      className="p-1 text-gray-400 hover:text-[#14264A] dark:hover:text-white"
                      title="Reset code"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Code Editor Box */}
                <div className="rounded-2xl overflow-hidden border border-gray-800 bg-[#0B1B36] font-mono text-xs shadow-inner">
                  <div className="bg-[#14264A] px-4 py-2 border-b border-gray-800 flex items-center justify-between text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] ml-2 text-gray-400">linear_regression.py</span>
                    </div>
                    <span className="text-[10px] text-[#F2B544] font-semibold">Python 3.11</span>
                  </div>

                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={12}
                    className="w-full p-4 bg-[#0B1B36] text-[#E2E8F0] focus:outline-none resize-none leading-relaxed font-mono selection:bg-amber-500/30"
                    spellCheck={false}
                  />

                  {/* Action buttons inside / below editor */}
                  <div className="p-3 bg-[#0f2142] border-t border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="px-4 py-1.5 bg-[#14264A] hover:bg-[#1c3563] text-white text-xs font-bold rounded-lg border border-gray-600 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-[#F2B544] fill-[#F2B544]" />
                        <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                      </button>
                      <button
                        onClick={handleRunCode}
                        className="px-4 py-1.5 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] text-xs font-extrabold rounded-lg shadow-xs cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400">Ctrl + Enter to run</span>
                  </div>
                </div>

                {/* Console Output & Test Cases matching reference */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-[#14264A] dark:text-white uppercase tracking-wider">
                    Test Cases
                  </span>

                  <div className="space-y-2">
                    {[
                      { name: 'Test Case 1', condition: 'X = [[5]] -> Output 10.0', status: 'Passed' },
                      { name: 'Test Case 2', condition: 'X = [[10]] -> Output 20.0', status: 'Passed' },
                      { name: 'Test Case 3', condition: 'X = [[0]] -> Output 0.0', status: 'Passed' },
                    ].map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#F8F5EE] dark:bg-[#14264A]/40 border border-[#EAF0F7] dark:border-[#1C2E52] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="font-bold text-[#14264A] dark:text-white">{tc.name}</span>
                          <span className="text-gray-400 font-mono text-[11px] hidden sm:inline">({tc.condition})</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-[11px]">
                          {tc.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {codeOutput && (
                    <div className="mt-3 p-3.5 rounded-xl bg-[#0B1B36] text-emerald-400 font-mono text-xs whitespace-pre-wrap border border-gray-800">
                      {codeOutput}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Learn / Theory */}
            {activeTab === 'learn' && (
              <div className="space-y-4 text-xs leading-relaxed text-[#182235] dark:text-gray-200">
                <h4 className="font-extrabold text-sm text-[#14264A] dark:text-white">Linear Regression Core Theory</h4>
                <p>
                  Linear regression is a supervised learning algorithm that models the relationship between a dependent variable (target, y) and one or more independent variables (features, X) using a linear equation:
                </p>
                <div className="p-3 bg-[#FAF7F2] dark:bg-[#14264A]/60 rounded-xl font-mono text-center font-bold text-[#14264A] dark:text-[#F2B544]">
                  y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
                </div>
                <p>
                  The goal of the algorithm is to find the weights <strong>w</strong> and bias <strong>b</strong> that minimize the Mean Squared Error (MSE) cost function:
                </p>
                <div className="p-3 bg-[#FAF7F2] dark:bg-[#14264A]/60 rounded-xl font-mono text-center font-bold text-[#14264A] dark:text-[#F2B544]">
                  J(w, b) = (1 / 2m) ∑ (h(x⁽ⁱ⁾) - y⁽ⁱ⁾)²
                </div>
              </div>
            )}

            {/* Tab: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <textarea
                  placeholder="Take your personal study notes here (saved in localStorage)..."
                  rows={6}
                  className="w-full p-4 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-xs text-[#182235] dark:text-white focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                  defaultValue="Key takeaway: Ensure standard scaling before running Ridge or Lasso regression to prevent feature magnitude bias."
                />
                <button
                  onClick={() => alert('Notes saved successfully!')}
                  className="px-4 py-2 bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl"
                >
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Resources Panel matching reference */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 px-1">
              Resources
            </h3>

            <div className="space-y-2">
              {[
                { title: 'Video Lecture', icon: Video, desc: '12:45 HD Video', action: () => setIsPlayingVideo(true) },
                { title: 'PDF Notes', icon: FileText, desc: 'Formula sheet (8 pages)', action: () => alert('Downloading Chapter 3 Formulas PDF') },
                { title: 'Ask RAAH AI', icon: Bot, desc: 'Instant code & doubt resolution', action: () => onNavigate('ai-agent') },
                { title: 'Practice Questions', icon: HelpCircle, desc: '15 LeetCode & Interview questions', action: () => onNavigate('coding') },
                { title: 'Quick Summary', icon: Sparkles, desc: 'Cheatsheet key takeaways', action: () => setActiveTab('learn') },
              ].map((res, idx) => {
                const Icon = res.icon;
                return (
                  <div
                    key={idx}
                    onClick={res.action}
                    className="p-3 rounded-2xl bg-[#F8F5EE] dark:bg-[#14264A]/40 hover:bg-[#EAF0F7] dark:hover:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] hover:border-[#14264A]/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#0F1D38] flex items-center justify-center text-[#14264A] dark:text-[#F2B544] shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#14264A] dark:text-white">{res.title}</p>
                        <p className="text-[10px] text-[#6B7280] dark:text-gray-400">{res.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Chapter Banner */}
          <div className="bg-[#14264A] dark:bg-[#112347] text-white p-5 rounded-3xl space-y-2 border border-transparent dark:border-[#1C2E52]">
            <span className="text-[10px] font-bold text-[#F2B544] uppercase tracking-wider">
              Up Next
            </span>
            <h4 className="font-bold text-sm">Chapter 4: Classification</h4>
            <p className="text-xs text-gray-300">
              Logistic regression, decision trees, and multi-class classification.
            </p>
            <button
              onClick={() => setActiveChapterId(4)}
              className="mt-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Preview Chapter 4 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
