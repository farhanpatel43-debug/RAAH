import React, { useState } from 'react';
import { UserProfile, NavTab } from '../types';
import { User, Mail, Building, Bell, Shield, Award, Check, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SupabaseSyncManager } from '../components/SupabaseSyncManager';

interface SettingsPageProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onNavigate: (tab: NavTab) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser, onNavigate }) => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [college, setCollege] = useState(user.college);
  const [studyTime, setStudyTime] = useState(user.dailyStudyTime);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      college,
      dailyStudyTime: studyTime,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[#182235] dark:text-[#F1F5F9]">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">Settings & Preferences</h1>
        <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">Manage your student profile, theme appearance and study preferences</p>
      </div>

      <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-6 sm:p-8 border border-[#EAF0F7] dark:border-[#1C2E52] shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="w-16 h-16 rounded-full bg-[#14264A] dark:bg-[#F2B544] text-[#F2B544] dark:text-[#14264A] font-extrabold text-2xl flex items-center justify-center shadow-xs">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-base text-[#14264A] dark:text-white">{name}</h3>
              <p className="text-xs text-[#6B7280] dark:text-gray-400">{user.branch} • {user.currentYear}</p>
              <button
                type="button"
                onClick={() => onNavigate('setup')}
                className="text-xs font-bold text-[#F2B544] hover:underline mt-1"
              >
                Reconfigure Roadmap Path →
              </button>
            </div>
          </div>

          {/* Theme Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-2 uppercase tracking-wider">
              Interface Theme
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'bg-[#14264A] text-white border-[#14264A] shadow-xs'
                    : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 border-gray-200 dark:border-[#1C2E52]'
                }`}
              >
                <Sun className="w-4 h-4 text-[#F2B544]" />
                <span>Light Theme</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-[#F2B544] text-[#14264A] border-[#F2B544] shadow-xs font-extrabold'
                    : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 border-gray-200 dark:border-[#1C2E52]'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Navy Theme</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">College</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">Daily Study Commitment</label>
              <select
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544] bg-white dark:bg-[#0B162C] cursor-pointer"
              >
                <option value="1 hour">1 hour / day</option>
                <option value="2 hours">2 hours / day</option>
                <option value="3 hours">3 hours / day</option>
                <option value="4+ hours">4+ hours / day</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
            {saved ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferences saved!
              </span>
            ) : (
              <span className="text-xs text-[#6B7280] dark:text-gray-400">Changes update your personalized plan instantly.</span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Supabase Database Connection & Sync Status Card */}
      <SupabaseSyncManager user={user} onSyncComplete={() => {}} />
    </div>
  );
};
