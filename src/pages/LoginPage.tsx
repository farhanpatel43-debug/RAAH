import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import { RaahLogo } from '../components/RaahLogo';
import { defaultUserProfile } from '../data/mockData';
import {
  createNewUserProfile,
  saveUserToStorage,
  getUserFromStorageByEmail,
  formatNameFromEmail,
} from '../lib/userStore';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Home,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  fetchUserProgressFromSupabase,
  syncUserProgressToSupabase,
  loginWithSupabaseAuth,
  logUserActivityToSupabase,
} from '../lib/supabase';
import studentArtworkImg from '../assets/images/signup_student_illustration_1791400968944.jpg';

interface LoginPageProps {
  onNavigate: (tab: NavTab) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setEmail('farhanpatelpatel43@gmail.com');
    setPassword('123456');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      // 1. Try Supabase Auth login if configured
      await loginWithSupabaseAuth(cleanEmail, password).catch(() => {});

      // 2. Fetch existing user progress from Supabase database
      const existingUser = await fetchUserProgressFromSupabase(cleanEmail);

      if (existingUser && existingUser.email.toLowerCase() === cleanEmail) {
        saveUserToStorage(existingUser);
        logUserActivityToSupabase(existingUser.email, 'login', { method: 'supabase_db' });
        onLoginSuccess(existingUser);
        return;
      }

      // 3. Check local user registry (if user previously signed up on this device)
      const localUser = getUserFromStorageByEmail(cleanEmail);
      if (localUser) {
        saveUserToStorage(localUser);
        logUserActivityToSupabase(localUser.email, 'login', { method: 'local_registry' });
        onLoginSuccess(localUser);
        return;
      }

      // 4. If this is explicitly Farhan's demo account
      if (cleanEmail === defaultUserProfile.email.toLowerCase()) {
        saveUserToStorage(defaultUserProfile);
        onLoginSuccess(defaultUserProfile);
        return;
      }

      // 5. New user sign-in: Create fresh account strictly according to new sign-in info
      const cleanName = formatNameFromEmail(cleanEmail);
      const newUser = createNewUserProfile({
        name: cleanName,
        email: cleanEmail,
      });

      saveUserToStorage(newUser);
      // Upsert record to Supabase
      syncUserProgressToSupabase(newUser).catch(console.warn);
      logUserActivityToSupabase(newUser.email, 'login', { method: 'new_signin_created' });
      onLoginSuccess(newUser);
    } catch {
      const cleanEmail = email.trim().toLowerCase();
      const localUser = getUserFromStorageByEmail(cleanEmail);
      if (localUser) {
        onLoginSuccess(localUser);
      } else {
        const newUser = createNewUserProfile({
          name: formatNameFromEmail(cleanEmail),
          email: cleanEmail,
        });
        saveUserToStorage(newUser);
        onLoginSuccess(newUser);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    saveUserToStorage(defaultUserProfile);
    onLoginSuccess(defaultUserProfile);
  };

  const handleForgotPassword = () => {
    setInfoMessage(`Password reset link sent to ${email || 'your email'}.`);
    setTimeout(() => setInfoMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#070D18] flex flex-col justify-between items-center transition-colors px-4 py-6 sm:py-10 relative overflow-x-hidden">
      {/* Top Utility Controls */}
      <div className="w-full max-w-md flex items-center justify-between z-30 mb-2">
        <button
          onClick={() => onNavigate('home')}
          className="p-2 rounded-xl bg-white/90 dark:bg-[#0F1D38]/90 backdrop-blur-md border border-gray-200 dark:border-[#1C2E52] text-gray-600 dark:text-gray-300 hover:text-[#0F274A] dark:hover:text-white transition-all shadow-2xs flex items-center gap-1.5 text-xs font-semibold px-3 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <ThemeToggle />
      </div>

      {/* Main Login Card / Content */}
      <div className="w-full max-w-md bg-white dark:bg-[#0B1528] rounded-3xl sm:shadow-lg border border-gray-100 dark:border-[#1C2E52] p-6 sm:p-8 z-20 transition-colors">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="cursor-pointer mb-3" onClick={() => onNavigate('home')}>
            <RaahLogo variant="stacked" size="md" />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex-1 text-center pl-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F274A] dark:text-white">
                Welcome <span className="text-[#E59819] dark:text-[#F2B544]">Back</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1">
                Continue your journey with RAAH
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 rounded-lg bg-[#FEF6E4] dark:bg-[#2A2312] border border-[#F2B544]/40 text-[#B45309] dark:text-[#F2B544] text-[10px] font-bold hover:bg-[#FDE68A]/40 transition-colors cursor-pointer shrink-0"
              title="Auto-fill Farhan Patel demo login"
            >
              ⚡ Demo
            </button>
          </div>
        </div>

        {/* Error / Info messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-400">
            {error}
          </div>
        )}

        {infoMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email Address */}
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full text-sm text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full text-sm text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#4B5563] dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-[#0F274A] focus:ring-[#0F274A] cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#1D4ED8] dark:text-[#60A5FA] hover:underline font-semibold cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#0F274A] hover:bg-[#08182E] dark:bg-[#F2B544] dark:hover:bg-[#dfa233] text-white dark:text-[#0F274A] font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-800" />
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Continue as Demo Student */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3 bg-white dark:bg-[#070D18] hover:bg-[#F9F7F2] dark:hover:bg-[#0F1D38] border border-gray-300 dark:border-[#1C2E52] text-[#0F274A] dark:text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
        >
          <GraduationCap className="w-5 h-5 text-[#E59819] dark:text-[#F2B544]" />
          <span>Continue as Demo Student</span>
        </button>

        {/* Sign Up Link */}
        <div className="mt-5 text-center text-xs text-[#4B5563] dark:text-gray-400">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="font-bold text-[#1D4ED8] dark:text-[#60A5FA] hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* BOTTOM ILLUSTRATION: Student coding with DSA, Python, ML books and Learn Build Grow */}
      <div className="w-full max-w-md mt-6 relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-[#1C2E52] shadow-sm bg-white dark:bg-[#0B1528]">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={studentArtworkImg}
            alt="Student studying with RAAH Career OS"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          {/* Handwritten badge */}
          <div className="absolute bottom-3 left-4 text-white font-serif italic text-sm leading-tight drop-shadow-md">
            <span className="font-bold block">Learn • Build • Grow</span>
            <span className="text-[11px] font-sans not-italic text-[#F2B544]">
              Start your 4-year path today
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Home Bar Indicator */}
      <div className="w-32 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mt-4" />
    </div>
  );
};
