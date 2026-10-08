import React from 'react';
import { RaahLogo } from './RaahLogo';
import { NavTab, UserProfile } from '../types';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  HelpCircle,
  Code2,
  FolderGit2,
  Compass,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  Bot,
  Database,
  UserCheck,
  TrendingUp,
  Award,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getUserLevel } from '../data/levelsData';

interface SidebarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  user: UserProfile;
  onLogout: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  user,
  onLogout,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const userLevel = getUserLevel(user.xp);

  const menuItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; highlight?: boolean }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'My Roadmap', icon: Map },
    { id: 'journey', label: '4-Year Journey', icon: TrendingUp },
    { id: 'attendance', label: 'College Attendance', icon: UserCheck },
    { id: 'learning', label: 'Learning & Videos', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'coding', label: 'Coding Practice', icon: Code2 },
    { id: 'projects', label: 'Projects & Generator', icon: FolderGit2 },
    { id: 'certificates', label: 'Digital Certificate', icon: Award },
    { id: 'career-guidance', label: 'Career Guidance', icon: Compass },
    { id: 'ai-agent', label: 'AI Career Agent', icon: Bot, highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-[#08101F] border-r border-[#EAF0F7] dark:border-[#1C2E52] w-64 select-none transition-colors">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#F1EFEA] dark:border-[#1C2E52]">
          <RaahLogo 
            variant="horizontal" 
            size="md" 
            onClick={() => onNavigate('dashboard')}
            className="cursor-pointer"
          />
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 mt-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#14264A] text-white shadow-sm'
                    : item.highlight
                    ? 'text-[#F2B544] dark:text-[#F2B544] hover:bg-[#FEF6E4]/50 dark:hover:bg-[#14264A]/60'
                    : 'text-[#6B7280] dark:text-gray-400 hover:text-[#14264A] dark:hover:text-white hover:bg-[#F8F5EE] dark:hover:bg-[#0F1D38]'
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#F2B544]' : item.highlight ? 'text-[#F2B544]' : 'text-[#9CA3AF]'
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#FEF6E4] dark:bg-[#2A2312] text-[#B45309] dark:text-[#F2B544]">
                    AI
                  </span>
                )}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2B544]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Career Card & Profile */}
      <div className="p-3 border-t border-[#F1EFEA] dark:border-[#1C2E52] space-y-3">
        {/* Goal Badge */}
        <div 
          onClick={() => onNavigate('career-guidance')}
          className="p-3 rounded-xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] cursor-pointer hover:border-[#F2B544]/50 transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#14264A] dark:text-[#F1F5F9]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F2B544]" />
              {user.targetCareer}
            </span>
            <span className="font-extrabold">{user.readinessScore}%</span>
          </div>
          <div className="w-full bg-[#E5E7EB] dark:bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#14264A] dark:bg-[#F2B544] h-full rounded-full transition-all duration-500"
              style={{ width: `${user.readinessScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px] text-[#6B7280] dark:text-gray-400">
            <span>Readiness Score</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Supabase status indicator */}
        <div
          onClick={() => onNavigate('settings')}
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 cursor-pointer hover:bg-emerald-100/70 transition-colors"
          title="Supabase Connected (Project iosvwfpxfhjechyisarb)"
        >
          <div className="flex items-center gap-1.5 truncate">
            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">Supabase Connected</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
        </div>

        {/* User mini chip */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50/70 dark:bg-[#0F1D38] border border-gray-100 dark:border-[#1C2E52]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#14264A] dark:bg-[#F2B544] text-[#F2B544] dark:text-[#14264A] font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#14264A] dark:text-white truncate">{user.name}</p>
              <p className="text-[10px] text-[#6B7280] dark:text-gray-400 truncate">{user.currentYear} • AI/ML</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Log out"
            className="p-1.5 text-[#9CA3AF] hover:text-rose-600 rounded-lg hover:bg-white dark:hover:bg-[#1C2E52] transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#08101F] shadow-2xl flex z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
