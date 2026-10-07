import React, { useState, useEffect } from 'react';
import { NavTab, UserProfile } from './types';
import { defaultUserProfile } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { Footer } from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AiCareerAgent } from './components/AiCareerAgent';
import { syncUserProgressToSupabase, fetchUserProgressFromSupabase, logUserActivityToSupabase } from './lib/supabase';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { RoadmapSetupPage } from './pages/RoadmapSetupPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { LearningPage } from './pages/LearningPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CareerGuidancePage } from './pages/CareerGuidancePage';
import { CareersExplorePage } from './pages/CareersExplorePage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';
import { Bot, Sparkles, X } from 'lucide-react';

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Load initial user state from localStorage or default to Farhan
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('raah_user');
      return saved ? JSON.parse(saved) : defaultUserProfile;
    } catch {
      return defaultUserProfile;
    }
  });

  // Current tab / page
  const [currentTab, setCurrentTab] = useState<NavTab>(() => {
    return 'dashboard';
  });

  // Mobile sidebar state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Floating AI Drawer state
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  // Sync user updates to localStorage and Supabase database
  useEffect(() => {
    if (user) {
      localStorage.setItem('raah_user', JSON.stringify(user));
      // Auto sync progress to Supabase database in the background
      syncUserProgressToSupabase(user).catch((err) => {
        console.warn('Auto-sync to Supabase queued:', err);
      });
    } else {
      localStorage.removeItem('raah_user');
    }
  }, [user]);

  // Initial attempt to fetch fresh user progress from Supabase on mount
  useEffect(() => {
    if (user?.email) {
      fetchUserProgressFromSupabase(user.email).then((remoteUser) => {
        if (remoteUser && remoteUser.xp >= (user.xp || 0)) {
          setUser((prev) => (prev ? { ...prev, ...remoteUser } : remoteUser));
        }
      }).catch(() => {});
    }
  }, []);

  // Scroll to top on navigation
  const handleNavigate = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setCurrentTab('dashboard');
    logUserActivityToSupabase(loggedInUser.email, 'login', { name: loggedInUser.name });
  };

  const handleSignUpSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentTab('setup');
    logUserActivityToSupabase(newUser.email, 'signup', {
      branch: newUser.branch,
      college: newUser.college,
    });
  };

  const handleSaveRoadmap = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    logUserActivityToSupabase(updatedUser.email, 'roadmap_updated', {
      targetCareer: updatedUser.targetCareer,
      skills: updatedUser.skills,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab('home');
  };

  const handleAddXp = (amount: number, activity?: 'quiz_completed' | 'problem_solved', details?: Record<string, any>) => {
    if (user) {
      const updatedUser = { ...user, xp: user.xp + amount };
      setUser(updatedUser);
      if (activity) {
        logUserActivityToSupabase(user.email, activity, details || {}, amount);
      }
    }
  };

  // Determine if we should show the student dashboard shell
  const isDashboardRoute = user && [
    'dashboard',
    'roadmap',
    'learning',
    'quizzes',
    'coding',
    'projects',
    'career-guidance',
    'ai-agent',
    'settings',
    'setup',
  ].includes(currentTab);

  return (
    <div className="min-h-screen bg-[#F8F5EE] dark:bg-[#08101F] text-[#182235] dark:text-[#F1F5F9] font-sans antialiased selection:bg-[#F2B544]/30 selection:text-[#14264A] transition-colors duration-200">
      {isDashboardRoute ? (
        // Logged-in Student Experience with Left Sidebar
        <div className="flex min-h-screen">
          <Sidebar
            currentTab={currentTab}
            onNavigate={handleNavigate}
            user={user}
            onLogout={handleLogout}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader
              user={user}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            />

            <main className="flex-1 pb-12">
              {currentTab === 'dashboard' && (
                <DashboardPage user={user} onNavigate={handleNavigate} />
              )}
              {currentTab === 'roadmap' && (
                <RoadmapPage user={user} onNavigate={handleNavigate} />
              )}
              {currentTab === 'learning' && (
                <LearningPage onNavigate={handleNavigate} />
              )}
              {currentTab === 'quizzes' && (
                <QuizzesPage
                  user={user}
                  onNavigate={handleNavigate}
                  onAddXp={(amount) => handleAddXp(amount, 'quiz_completed', { timestamp: new Date().toISOString() })}
                />
              )}
              {currentTab === 'coding' && (
                <CodingPracticePage
                  user={user}
                  onNavigate={handleNavigate}
                  onProblemSolved={() => handleAddXp(25, 'problem_solved', { platform: 'RAAH Code Practice' })}
                />
              )}
              {currentTab === 'projects' && (
                <ProjectsPage user={user} onNavigate={handleNavigate} />
              )}
              {currentTab === 'career-guidance' && (
                <CareerGuidancePage user={user} onNavigate={handleNavigate} />
              )}
              {currentTab === 'ai-agent' && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-110px)]">
                  <AiCareerAgent user={user} dark={isDark} />
                </div>
              )}
              {currentTab === 'setup' && (
                <RoadmapSetupPage
                  user={user}
                  onSaveRoadmap={handleSaveRoadmap}
                  onNavigate={handleNavigate}
                />
              )}
              {currentTab === 'settings' && (
                <SettingsPage
                  user={user}
                  onUpdateUser={setUser}
                  onNavigate={handleNavigate}
                />
              )}
            </main>

            {/* Brand Footer inside dashboard */}
            <div className="border-t border-[#EAF0F7] dark:border-[#1C2E52] bg-white dark:bg-[#08101F] py-4 px-6 text-center text-xs text-[#6B7280] dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="font-semibold text-[#14264A] dark:text-[#F2B544]">RAAH • Your Path to Career</span>
              <span>Learn • Practice • Build • Grow</span>
              <span className="italic">Because Your Future Deserves a Plan</span>
            </div>
          </div>
        </div>
      ) : (
        // Public Website Experience
        <div className="flex flex-col min-h-screen">
          <Navbar
            currentTab={currentTab}
            onNavigate={handleNavigate}
            user={user}
            onLogout={handleLogout}
          />

          <main className="flex-1">
            {currentTab === 'home' && <LandingPage onNavigate={handleNavigate} />}
            {currentTab === 'public-roadmap' && (
              <RoadmapPage user={user || defaultUserProfile} onNavigate={handleNavigate} />
            )}
            {currentTab === 'careers' && (
              <CareersExplorePage onNavigate={handleNavigate} />
            )}
            {currentTab === 'public-projects' && (
              <ProjectsPage user={user || defaultUserProfile} onNavigate={handleNavigate} />
            )}
            {currentTab === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentTab === 'login' && (
              <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
            )}
            {currentTab === 'signup' && (
              <SignUpPage onNavigate={handleNavigate} onSignUpSuccess={handleSignUpSuccess} />
            )}
            {currentTab === 'setup' && (
              <RoadmapSetupPage
                user={user || defaultUserProfile}
                onSaveRoadmap={handleSaveRoadmap}
                onNavigate={handleNavigate}
              />
            )}
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      )}

      {/* Floating AI Agent Trigger Button (Available on any screen) */}
      {currentTab !== 'ai-agent' && (
        <aside aria-label="RAAH AI Career Advisor" className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setAiDrawerOpen(!aiDrawerOpen)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#14264A] hover:bg-[#0B1B36] text-white rounded-full shadow-2xl border-2 border-[#F2B544] hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-[#F2B544] text-[#14264A] flex items-center justify-center font-bold">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-extrabold pr-1 tracking-wide">
              Ask RAAH AI
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2B544] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2B544]" />
            </span>
          </button>
        </aside>
      )}

      {/* Floating AI Agent Drawer */}
      {aiDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setAiDrawerOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#08101F] shadow-2xl h-full flex flex-col z-50 animate-in slide-in-from-right duration-200">
            <div className="h-full p-2 sm:p-4">
              <AiCareerAgent
                user={user || defaultUserProfile}
                isFloatingDrawer={true}
                onClose={() => setAiDrawerOpen(false)}
                dark={isDark}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
