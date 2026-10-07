import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import { RaahLogo } from '../components/RaahLogo';
import { defaultUserProfile } from '../data/mockData';
import { Mail, Lock, ArrowRight, UserCheck, Eye, EyeOff, Database } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { fetchUserProgressFromSupabase, syncUserProgressToSupabase } from '../lib/supabase';

interface LoginPageProps {
  onNavigate: (tab: NavTab) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('farhanpatelpatel43@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Check if user progress exists in Supabase
      const existingUser = await fetchUserProgressFromSupabase(email.trim());
      if (existingUser) {
        onLoginSuccess(existingUser);
        return;
      }

      // Default baseline profile for Farhan or user email
      const loggedUser: UserProfile = {
        ...defaultUserProfile,
        email: email.trim(),
        name: email.split('@')[0] ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : 'Farhan',
      };
      // Upsert to Supabase
      syncUserProgressToSupabase(loggedUser).catch(console.warn);
      onLoginSuccess(loggedUser);
    } catch {
      const loggedUser: UserProfile = {
        ...defaultUserProfile,
        email: email.trim(),
        name: 'Farhan',
      };
      onLoginSuccess(loggedUser);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    onLoginSuccess(defaultUserProfile);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#F8F5EE] dark:bg-[#08101F] transition-colors relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-8 sm:p-10 shadow-sm border border-[#EAF0F7] dark:border-[#1C2E52] transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <RaahLogo variant="stacked" size="md" onClick={() => onNavigate('home')} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#14264A] dark:text-white">Welcome Back</h2>
            <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">Continue your journey with RAAH</p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farhan@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-sm text-[#182235] dark:text-white focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-sm text-[#182235] dark:text-white focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#6B7280] dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-700 text-[#14264A] dark:text-[#F2B544] focus:ring-[#14264A]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset instructions sent to farhan@example.com.')}
                className="text-[#14264A] dark:text-[#F2B544] font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
            </button>
          </form>

          {/* Quick Demo Login Button */}
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-[#FAF7F2] dark:bg-[#14264A] hover:bg-[#F2EFE8] dark:hover:bg-[#1E386D] border border-[#EAF0F7] dark:border-[#1C2E52] text-[#14264A] dark:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <UserCheck className="w-4 h-4 text-[#F2B544]" />
              <span>Continue as Demo Student (Farhan)</span>
            </button>
            <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 mt-2">
              Default: farhan@example.com / 123456
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-xs text-[#6B7280] dark:text-gray-400">
            <span>Don't have an account? </span>
            <button
              onClick={() => onNavigate('signup')}
              className="font-bold text-[#14264A] dark:text-[#F2B544] hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
