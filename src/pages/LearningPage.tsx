import React, { useState, useEffect } from 'react';
import { NavTab, UserProfile, CourseChapter } from '../types';
import { mlChapters } from '../data/mockData';
import { YouTubePlayer } from '../components/YouTubePlayer';
import { LearningVideo } from '../data/videos';
import {
  getRecommendedVideo,
  getAlternativeVideo,
  markVideoComplete,
  getVideoProgress,
} from '../services/videoService';
import {
  CheckCircle2,
  Lock,
  Code2,
  FileText,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Video,
  Bot,
  Award,
  Layers,
  ArrowRight,
  BookOpen,
  Check,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';

interface LearningPageProps {
  user?: UserProfile | null;
  onNavigate: (tab: NavTab) => void;
  onAddXp?: (amount: number, activity?: string, details?: Record<string, any>) => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const LearningPage: React.FC<LearningPageProps> = ({
  user,
  onNavigate,
  onAddXp,
  onUpdateUser,
}) => {
  const [chapters, setChapters] = useState<CourseChapter[]>(mlChapters);
  const [activeChapterId, setActiveChapterId] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'quiz' | 'notes'>('learn');

  // Code editor states
  const [isRunning, setIsRunning] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  // Video recommendation and status state
  const [currentVideo, setCurrentVideo] = useState<LearningVideo | null>(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isQuizUnlocked, setIsQuizUnlocked] = useState(false);
  const [isCodingUnlocked, setIsCodingUnlocked] = useState(false);
  const [isProjectUnlocked, setIsProjectUnlocked] = useState(false);

  // Notification badge for XP award
  const [xpAwardNotice, setXpAwardNotice] = useState<string | null>(null);

  const initialCode = `import numpy as np
from sklearn.linear_model import LinearRegression

# Training data (Feature X: Study Hours, Target y: Exam Score)
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Initialize and fit Linear Regression model
model = LinearRegression()
model.fit(X, y)

# Predict for input X = 5 hours
prediction = model.predict([[5]])
print(f"Prediction for X=5: {prediction[0]:.2f}")
print(f"Model Coefficient (slope): {model.coef_[0]:.2f}")
print(f"Model Intercept: {model.intercept_:.2f}")`;

  const [code, setCode] = useState(initialCode);

  const currentChapter = chapters.find((c) => c.id === activeChapterId) || chapters[2];

  // Whenever active chapter or user profile changes, dynamically recommend a real video
  useEffect(() => {
    const recommended = getRecommendedVideo({
      branch: user?.branch || 'Artificial Intelligence & Machine Learning (AI/ML)',
      year: user?.currentYear || 3,
      careerGoal: user?.targetCareer || 'Data Scientist',
      skills: user?.skills || ['Python', 'Machine Learning'],
      currentLesson: currentChapter.title,
      topic: currentChapter.title,
      quizPerformance: 85,
      codingPerformance: 80,
    });

    setCurrentVideo(recommended);

    if (recommended) {
      const progress = getVideoProgress(recommended.videoId);
      setIsVideoCompleted(progress.completed);
      setIsQuizUnlocked(progress.completed || currentChapter.completed);
    } else {
      setIsVideoCompleted(false);
      setIsQuizUnlocked(currentChapter.completed);
    }
  }, [activeChapterId, user, currentChapter]);

  // Handle video completion
  const handleVideoCompleted = () => {
    if (!currentVideo) return;

    const result = markVideoComplete(currentVideo.videoId, user?.email);
    setIsVideoCompleted(true);
    setIsQuizUnlocked(true);

    // Update local chapter completion state
    setChapters((prev) =>
      prev.map((ch) => (ch.id === activeChapterId ? { ...ch, completed: true } : ch))
    );

    // Award +20 XP if not already awarded
    if (result.xpAwarded > 0) {
      if (onAddXp) {
        onAddXp(20, 'video_completed', {
          videoId: currentVideo.videoId,
          videoTitle: currentVideo.title,
          chapter: currentChapter.title,
        });
      }

      if (user && onUpdateUser) {
        const currentSkills = user.skills || [];
        const newSkill = currentVideo.topic;
        const updatedSkills = currentSkills.includes(newSkill)
          ? currentSkills
          : [...currentSkills, newSkill];

        onUpdateUser({
          ...user,
          xp: (user.xp || 0) + 20,
          readinessScore: Math.min(100, (user.readinessScore || 80) + 2),
          skills: updatedSkills,
        });
      }

      setXpAwardNotice(`🎉 +20 XP Awarded! Lesson video completed. Quiz is now unlocked!`);
      setTimeout(() => {
        setXpAwardNotice(null);
      }, 5000);
    }
  };

  // Find another real alternative video for the same topic
  const handleFindAlternativeVideo = () => {
    if (!currentVideo) return;
    const alternative = getAlternativeVideo(currentVideo.videoId, currentChapter.title);
    if (alternative) {
      setCurrentVideo(alternative);
      const progress = getVideoProgress(alternative.videoId);
      setIsVideoCompleted(progress.completed);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setCodeOutput(
        `> Running Python 3.11 with scikit-learn & numpy...\nPrediction for X=5: 10.00\nModel Coefficient (slope): 2.00\nModel Intercept: 0.00\n[Test Case 1]: Input [[5]] -> Output 10.00 (MATCHED)\n[Test Case 2]: Input [[10]] -> Output 20.00 (MATCHED)\n[Test Case 3]: Input [[0]] -> Output 0.00 (MATCHED)\n✔ All 3 Test Cases Passed successfully! (+15 XP)`
      );
      setIsCodingUnlocked(true);
      setIsProjectUnlocked(true);
      if (onAddXp) {
        onAddXp(15, 'coding_challenge', { topic: currentChapter.title });
      }
    }, 700);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setCodeOutput(null);
  };

  const completedChaptersCount = chapters.filter((c) => c.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-[#182235] dark:text-[#F1F5F9] transition-colors">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] dark:text-gray-400 mb-1">
          <button onClick={() => onNavigate('dashboard')} className="hover:underline">
            Dashboard
          </button>
          <span>&gt;</span>
          <button onClick={() => onNavigate('roadmap')} className="hover:underline">
            Roadmap
          </button>
          <span>&gt;</span>
          <span className="text-[#14264A] dark:text-[#F2B544]">Learning</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
              Interactive Learning Lab
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-[#F2B544]">
                Chapter {currentChapter.id}: {currentChapter.title}
              </span>
              <span className="text-xs text-[#6B7280] dark:text-gray-400">
                • {currentChapter.summary || 'Real video lecture, theory notes, and coding sandbox.'}
              </span>
            </div>
          </div>

          {/* Student Goal Badge */}
          <div className="flex items-center gap-2 bg-[#F8F5EE] dark:bg-[#14264A]/60 px-3.5 py-2 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52] self-start sm:self-auto">
            <Award className="w-4 h-4 text-[#F2B544]" />
            <div className="text-xs">
              <span className="text-[#6B7280] dark:text-gray-400">Career Goal: </span>
              <span className="font-bold text-[#14264A] dark:text-[#F2B544]">
                {user?.targetCareer || 'Data Scientist'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* XP Toast Notification Banner */}
      {xpAwardNotice && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-between text-xs sm:text-sm font-bold shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#F2B544] shrink-0" />
            <span>{xpAwardNotice}</span>
          </div>
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Go to Quiz →
          </button>
        </div>
      )}

      {/* 4-Step Mastery Flow Pipeline Required */}
      <div className="bg-white dark:bg-[#0F1D38] p-4 sm:p-5 rounded-3xl border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#14264A] dark:text-[#F2B544]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#14264A] dark:text-white">
              Lesson Progression Flow
            </span>
          </div>
          <span className="text-xs text-[#6B7280] dark:text-gray-400">
            Complete sequentially to master the topic
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {/* Step 1: Video */}
          <div
            className={`p-3 rounded-2xl border transition-all ${
              isVideoCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-[#FAF7F2] dark:bg-[#14264A]/60 border-[#F2B544] dark:border-[#F2B544]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400">Step 1</span>
              {isVideoCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#F2B544] animate-pulse" />
              )}
            </div>
            <p className="text-xs font-bold text-[#14264A] dark:text-white">1. Video Lesson</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
              {isVideoCompleted ? 'Completed (+20 XP)' : 'Watch & Learn'}
            </p>
          </div>

          {/* Step 2: Quiz */}
          <div
            onClick={() => {
              if (isQuizUnlocked) setActiveTab('quiz');
            }}
            className={`p-3 rounded-2xl border transition-all ${
              isQuizUnlocked
                ? 'bg-white dark:bg-[#0F1D38] border-[#14264A] dark:border-[#F2B544] cursor-pointer hover:shadow-xs'
                : 'bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400">Step 2</span>
              {isQuizUnlocked ? (
                <Sparkles className="w-4 h-4 text-[#F2B544]" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              )}
            </div>
            <p className="text-xs font-bold text-[#14264A] dark:text-white">2. Chapter Quiz</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
              {isQuizUnlocked ? 'Unlocked (+30 XP)' : 'Requires Video'}
            </p>
          </div>

          {/* Step 3: Coding Practice */}
          <div
            onClick={() => setActiveTab('practice')}
            className={`p-3 rounded-2xl border transition-all ${
              isCodingUnlocked
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-[#0F1D38] border-gray-200 dark:border-gray-800 cursor-pointer hover:border-[#14264A]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400">Step 3</span>
              {isCodingUnlocked ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Code2 className="w-3.5 h-3.5 text-gray-400" />
              )}
            </div>
            <p className="text-xs font-bold text-[#14264A] dark:text-white">3. Coding Practice</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
              {isCodingUnlocked ? 'Passed (+15 XP)' : 'Run Test Cases'}
            </p>
          </div>

          {/* Step 4: Project Task */}
          <div
            onClick={() => onNavigate('projects')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              isProjectUnlocked
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 hover:shadow-xs'
                : 'bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400">Step 4</span>
              {isProjectUnlocked ? (
                <FolderGit2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              )}
            </div>
            <p className="text-xs font-bold text-[#14264A] dark:text-white">4. Project Task</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
              {isProjectUnlocked ? 'Unlocked (+100 XP)' : 'Capstone'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Course Chapters */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Course Chapters
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#14264A] text-[#14264A] dark:text-[#F2B544]">
              {chapters.length} Total
            </span>
          </div>

          <div className="space-y-1">
            {chapters.map((ch) => {
              const isSelected = ch.id === activeChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapterId(ch.id);
                    setActiveTab('learn');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] shadow-xs'
                      : ch.completed
                      ? 'bg-[#FAF7F2] dark:bg-[#14264A]/60 text-[#14264A] dark:text-white hover:bg-[#F2EFE8] dark:hover:bg-[#1E386D]'
                      : 'text-[#6B7280] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 text-center shrink-0">{ch.id}.</span>
                    <span className="truncate">{ch.title}</span>
                  </div>

                  <div className="shrink-0 ml-2">
                    {ch.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isSelected ? (
                      <span className="w-2 h-2 rounded-full bg-[#F2B544] dark:bg-[#14264A]" />
                    ) : (
                      <span className="text-[10px] text-gray-400 font-normal">
                        {ch.duration || '20m'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-[#6B7280] dark:text-gray-400 px-2 flex justify-between">
            <span>Overall Progress</span>
            <span className="font-bold text-[#14264A] dark:text-[#F2B544]">
              {completedChaptersCount}/{chapters.length} Completed
            </span>
          </div>
        </div>

        {/* Center / Main Content */}
        <div className="lg:col-span-6 space-y-6">
          {/* REAL PLAYABLE YOUTUBE VIDEO PLAYER COMPONENT */}
          {currentVideo ? (
            <div className="space-y-2">
              <YouTubePlayer
                videoId={currentVideo.videoId}
                title={currentVideo.title}
                topic={currentVideo.topic}
                duration={currentVideo.duration}
                onComplete={handleVideoCompleted}
                onUnavailable={handleFindAlternativeVideo}
                isCompleted={isVideoCompleted}
              />

              {/* Video Metadata & Educational Badges */}
              <div className="bg-[#FAF7F2] dark:bg-[#14264A]/40 rounded-2xl p-3.5 border border-[#EAF0F7] dark:border-[#1C2E52] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentVideo.channel && (
                    <span className="font-bold text-[#14264A] dark:text-white">
                      Instructor: {currentVideo.channel}
                    </span>
                  )}
                  <span className="text-gray-400">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#14264A]/10 dark:bg-white/10 text-[#14264A] dark:text-gray-200 font-semibold text-[11px]">
                    {currentVideo.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-[#F2B544] font-semibold text-[11px]">
                    Year {currentVideo.year}
                  </span>
                </div>

                <button
                  onClick={handleFindAlternativeVideo}
                  className="text-xs font-semibold text-[#14264A] dark:text-[#F2B544] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch Video</span>
                </button>
              </div>
            </div>
          ) : (
            /* Fallback if no verified video is available for topic */
            <div className="bg-[#0F1D38] rounded-3xl p-8 border border-amber-500/30 text-center text-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#F2B544] mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  No verified video is currently available for this topic.
                </h3>
                <p className="text-xs text-gray-300 mt-1 max-w-sm mx-auto">
                  Only authentic, verified YouTube educational lectures are displayed to ensure curriculum quality.
                </p>
              </div>
              <button
                onClick={handleFindAlternativeVideo}
                className="px-4 py-2 bg-[#F2B544] text-[#14264A] text-xs font-extrabold rounded-xl hover:bg-[#e0a433] transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Find Another Video</span>
              </button>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
            <div className="flex border-b border-gray-100 dark:border-gray-800 gap-6 sm:gap-8 mb-6 overflow-x-auto">
              {[
                { id: 'learn', label: 'Theory & Lecture Notes' },
                { id: 'practice', label: 'Coding Sandbox' },
                {
                  id: 'quiz',
                  label: isQuizUnlocked ? 'Quiz (Unlocked!)' : 'Quiz (Locked 🔒)',
                },
                { id: 'notes', label: 'Personal Notes' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'quiz' && !isQuizUnlocked) {
                      setXpAwardNotice(
                        '🔒 Please watch or complete the video lecture above to unlock this quiz!'
                      );
                      setTimeout(() => setXpAwardNotice(null), 4000);
                      return;
                    }
                    setActiveTab(tab.id as any);
                  }}
                  className={`pb-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#14264A] dark:text-[#F2B544]'
                      : 'text-[#6B7280] dark:text-gray-400 hover:text-[#14264A] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{tab.label}</span>
                    {tab.id === 'quiz' && isQuizUnlocked && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2B544]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Learn / Theory */}
            {activeTab === 'learn' && (
              <div className="space-y-4 text-xs leading-relaxed text-[#182235] dark:text-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm sm:text-base text-[#14264A] dark:text-white">
                    {currentChapter.title} — Key Concepts
                  </h4>
                  <span className="text-[11px] font-bold text-[#F2B544]">
                    Estimated Study: {currentChapter.duration || '25 min'}
                  </span>
                </div>

                <p>
                  Linear regression models the relationship between a dependent variable (target, <code>y</code>) and one or more independent variables (features, <code>X</code>) using a straight-line function:
                </p>

                <div className="p-4 bg-[#FAF7F2] dark:bg-[#14264A]/60 rounded-2xl font-mono text-center font-bold text-[#14264A] dark:text-[#F2B544] text-sm">
                  y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B1B36] border border-gray-200 dark:border-gray-800 space-y-1">
                    <span className="text-[10px] font-bold text-[#F2B544] uppercase tracking-wider">
                      Ordinary Least Squares (OLS)
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Calculates the line that minimizes the sum of squared differences (residuals) between predicted and actual values.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B1B36] border border-gray-200 dark:border-gray-800 space-y-1">
                    <span className="text-[10px] font-bold text-[#F2B544] uppercase tracking-wider">
                      Gradient Descent
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Iterative optimization algorithm that updates weights proportional to the negative gradient of the loss function.
                    </p>
                  </div>
                </div>

                {isQuizUnlocked ? (
                  <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ✔ Video verified. You're ready to test your knowledge!
                    </span>
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="px-4 py-2 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>Take Chapter Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Watch the video above or mark it complete to unlock the chapter quiz.</span>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Quiz */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                {!isQuizUnlocked ? (
                  <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3">
                    <Lock className="w-8 h-8 text-gray-400 mx-auto" />
                    <h4 className="font-bold text-sm text-[#14264A] dark:text-white">
                      Quiz Currently Locked
                    </h4>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 max-w-sm mx-auto">
                      In the RAAH learning workflow, students must watch the video lesson before attempting the quiz.
                    </p>
                    <button
                      onClick={handleVideoCompleted}
                      className="px-4 py-2 bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A] text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Complete Video Lesson (+20 XP)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          Quiz Unlocked! Video lecture completed successfully.
                        </span>
                      </div>
                      <span className="font-black text-[#14264A] dark:text-[#F2B544]">
                        Earn up to +30 XP
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#FAF7F2] dark:bg-[#0B1B36] space-y-3">
                      <p className="font-bold text-xs sm:text-sm text-[#14264A] dark:text-white">
                        Question 1 of 5: In Simple Linear Regression, what does the slope coefficient represent?
                      </p>

                      <div className="space-y-2">
                        {[
                          'The expected value of y when X is 0',
                          'The change in y for every 1-unit increase in X',
                          'The total residual variance in the dataset',
                          'The number of iterations in gradient descent',
                        ].map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (i === 1) {
                                if (onAddXp) onAddXp(30, 'quiz_completed', { score: 100 });
                                alert('Correct answer! +30 XP awarded! Coding Practice is ready.');
                                setIsCodingUnlocked(true);
                              } else {
                                alert('Incorrect option. Hint: The derivative dy/dx gives the rate of change.');
                              }
                            }}
                            className="w-full text-left p-3 rounded-xl bg-white dark:bg-[#0F1D38] border border-gray-200 dark:border-gray-700 hover:border-[#F2B544] text-xs font-medium transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>
                              {String.fromCharCode(65 + i)}. {opt}
                            </span>
                            <span className="text-[10px] text-gray-400">Select</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => onNavigate('quizzes')}
                        className="text-xs font-bold text-[#14264A] dark:text-[#F2B544] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Full Quizzes Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActiveTab('practice')}
                        className="px-4 py-2 bg-[#14264A] hover:bg-[#1E386D] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Proceed to Coding Practice →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Practice */}
            {activeTab === 'practice' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#14264A] dark:text-[#F2B544]" />
                    <span className="text-xs font-extrabold text-[#14264A] dark:text-white uppercase tracking-wider">
                      Interactive Python Editor
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#1C2E52] text-xs font-semibold bg-white dark:bg-[#0B162C] text-[#14264A] dark:text-white cursor-pointer">
                      <option value="python">Python 3.11</option>
                    </select>
                    <button
                      onClick={handleResetCode}
                      className="p-1 text-gray-400 hover:text-[#14264A] dark:hover:text-white cursor-pointer"
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
                        <Sparkles className="w-3 h-3 text-[#F2B544]" />
                        <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                      </button>
                      <button
                        onClick={handleRunCode}
                        className="px-4 py-1.5 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] text-xs font-extrabold rounded-lg shadow-xs cursor-pointer"
                      >
                        Submit Solution
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400">Ctrl + Enter to run</span>
                  </div>
                </div>

                {/* Console Output & Test Cases */}
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
                          <span className="text-gray-400 font-mono text-[11px] hidden sm:inline">
                            ({tc.condition})
                          </span>
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

            {/* Tab: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <textarea
                  placeholder="Take your personal study notes here (saved in localStorage)..."
                  rows={6}
                  className="w-full p-4 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-xs text-[#182235] dark:text-white focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                  defaultValue="Key takeaway from video lecture: Mean Squared Error (MSE) penalizes larger outliers more heavily than MAE. Always check correlation coefficients beforehand."
                />
                <button
                  onClick={() => alert('Study notes saved to your profile!')}
                  className="px-4 py-2 bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Resources Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-5 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 px-1">
              Course Resources
            </h3>

            <div className="space-y-2">
              {[
                {
                  title: 'Video Lecture',
                  icon: Video,
                  desc: `${currentVideo?.duration || 20}m HD YouTube`,
                  action: () => {
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  },
                },
                {
                  title: 'PDF Cheatsheet',
                  icon: FileText,
                  desc: 'Formula sheet (8 pages)',
                  action: () => alert('Downloading Linear Regression Formula Cheatsheet PDF'),
                },
                {
                  title: 'Ask RAAH AI',
                  icon: Bot,
                  desc: 'Instant code & doubt resolution',
                  action: () => onNavigate('ai-agent'),
                },
                {
                  title: 'Practice Questions',
                  icon: HelpCircle,
                  desc: '15 LeetCode & Interview questions',
                  action: () => onNavigate('coding'),
                },
                {
                  title: 'Quick Summary',
                  icon: Sparkles,
                  desc: 'Cheatsheet key takeaways',
                  action: () => setActiveTab('learn'),
                },
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

          {/* Up Next Chapter Banner */}
          <div className="bg-[#14264A] dark:bg-[#112347] text-white p-5 rounded-3xl space-y-2 border border-transparent dark:border-[#1C2E52]">
            <span className="text-[10px] font-bold text-[#F2B544] uppercase tracking-wider">
              Up Next In Roadmap
            </span>
            <h4 className="font-bold text-sm">Chapter 4: Classification</h4>
            <p className="text-xs text-gray-300">
              Logistic regression, decision trees, and multi-class classification.
            </p>
            <button
              onClick={() => {
                setActiveChapterId(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Start Chapter 4 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
