import React, { useState } from 'react';
import { UserProfile, NavTab } from '../types';
import {
  Bell,
  ChevronDown,
  Menu,
  Sparkles,
  Flame,
  Award,
  Settings,
  LogOut,
  Map,
  BookOpen,
  Bot,
  Database,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface DashboardHeaderProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
  onLogout: () => void;
  onOpenMobileSidebar: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  onNavigate,
  onLogout,
  onOpenMobileSidebar,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const mockNotifications = [
    {
      id: 1,
      title: 'Streak maintained!',
      desc: 'You reached day 6 of your study streak 🔥',
      time: '1h ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Regression Quiz Ready',
      desc: 'Test your understanding of Chapter 3 Regression.',
      time: '3h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'New Project Available',
      desc: 'Customer Churn Prediction matches your skill level.',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-20 bg-[#F8F5EE]/95 dark:bg-[#08101F]/95 backdrop-blur-md border-b border-[#EAF0F7] dark:border-[#1C2E52] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Left side: Mobile menu toggle & page welcome badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#14264A] dark:text-gray-200 hover:bg-white dark:hover:bg-[#14264A] rounded-xl border border-[#EAF0F7] dark:border-[#1C2E52]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] rounded-full text-xs font-semibold text-[#14264A] dark:text-[#F1F5F9] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{user.branch} • {user.currentYear}</span>
        </div>
      </div>

      {/* Right side: Streak pill, ThemeToggle, Notification bell, Farhan profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Streak indicator */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF6E4] dark:bg-[#2A2312] border border-[#F2B544]/40 rounded-full text-xs font-bold text-[#B45309] dark:text-[#F2B544] cursor-pointer hover:bg-[#FDE68A]/30 transition-colors"
          title="6-day active learning streak"
        >
          <Flame className="w-4 h-4 text-[#F2B544] fill-[#F2B544]" />
          <span>{user.streakDays} Days</span>
        </div>

        {/* AI Career Advisor Quick Button */}
        <button
          onClick={() => onNavigate('ai-agent')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#14264A] hover:bg-[#1C3563] text-[#F2B544] text-xs font-bold rounded-xl border border-[#F2B544]/30 shadow-xs cursor-pointer transition-all"
        >
          <Bot className="w-4 h-4" />
          <span>Ask AI Agent</span>
        </button>

        {/* Supabase Cloud Sync Quick Status */}
        <button
          onClick={() => onNavigate('settings')}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800/60 cursor-pointer transition-all"
          title="Connected to Supabase project: inscaixmdstsgxmitocm"
        >
          <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[11px]">Supabase Synced</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* Theme Toggle (Light / Dark) */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="p-2 text-[#6B7280] dark:text-gray-300 hover:text-[#14264A] dark:hover:text-white hover:bg-white dark:hover:bg-[#14264A] rounded-xl border border-transparent hover:border-[#EAF0F7] dark:hover:border-[#1C2E52] transition-all relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F2B544] ring-2 ring-white dark:ring-[#08101F]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0F1D38] rounded-2xl shadow-xl border border-[#EAF0F7] dark:border-[#1C2E52] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-bold text-[#14264A] dark:text-white">Notifications</span>
                <span className="text-[11px] font-semibold text-[#F2B544] bg-[#FEF6E4] dark:bg-[#2A2312] px-2 py-0.5 rounded-full">
                  2 unread
                </span>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-800 max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-left hover:bg-[#F8F5EE] dark:hover:bg-[#14264A]/60 cursor-pointer transition-colors ${
                      n.unread ? 'bg-amber-50/20 dark:bg-amber-500/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#14264A] dark:text-white">{n.title}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-gray-300 mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100 dark:border-gray-800 text-center">
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-semibold text-[#14264A] dark:text-[#F2B544] hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 pl-2 hover:bg-white dark:hover:bg-[#14264A] rounded-xl border border-transparent hover:border-[#EAF0F7] dark:hover:border-[#1C2E52] transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#14264A] dark:bg-[#F2B544] text-[#F2B544] dark:text-[#14264A] font-bold text-xs flex items-center justify-center shadow-xs">
              {user.name.charAt(0)}
            </div>
            <span className="text-sm font-bold text-[#14264A] dark:text-white hidden sm:inline">
              {user.name}
            </span>
            <ChevronDown className="w-4 h-4 text-[#6B7280] dark:text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0F1D38] rounded-2xl shadow-xl border border-[#EAF0F7] dark:border-[#1C2E52] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold text-[#14264A] dark:text-white">{user.name}</p>
                <p className="text-[11px] text-[#6B7280] dark:text-gray-400 truncate">{user.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#14264A] dark:text-[#F2B544]">
                  <Sparkles className="w-3 h-3 text-[#F2B544]" />
                  <span>Target: {user.targetCareer}</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    onNavigate('ai-agent');
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-[#14264A] dark:text-gray-200 hover:bg-[#F8F5EE] dark:hover:bg-[#14264A] flex items-center gap-2"
                >
                  <Bot className="w-3.5 h-3.5 text-[#F2B544]" />
                  <span>RAAH AI Career Advisor</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('roadmap');
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-[#14264A] dark:text-gray-200 hover:bg-[#F8F5EE] dark:hover:bg-[#14264A] flex items-center gap-2"
                >
                  <Map className="w-3.5 h-3.5 text-[#6B7280] dark:text-gray-400" />
                  <span>My 4-Year Roadmap</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('setup');
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-[#14264A] dark:text-gray-200 hover:bg-[#F8F5EE] dark:hover:bg-[#14264A] flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-[#6B7280] dark:text-gray-400" />
                  <span>Reconfigure Career Path</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-[#14264A] dark:text-gray-200 hover:bg-[#F8F5EE] dark:hover:bg-[#14264A] flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-[#6B7280] dark:text-gray-400" />
                  <span>Settings & Preferences</span>
                </button>
              </div>

              <div className="pt-1 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => {
                    onLogout();
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
