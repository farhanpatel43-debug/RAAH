import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import { RaahLogo } from '../components/RaahLogo';
import { defaultUserProfile } from '../data/mockData';
import { createNewUserProfile, saveUserToStorage } from '../lib/userStore';
import {
  User,
  Mail,
  Lock,
  Building2,
  GraduationCap,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  syncUserProgressToSupabase,
  signUpWithSupabaseAuth,
  logUserActivityToSupabase,
} from '../lib/supabase';

interface SignUpPageProps {
  onNavigate: (tab: NavTab) => void;
  onSignUpSuccess: (user: UserProfile) => void;
}

const degreesList = [
  'B.Tech - Computer Science & Engineering (CSE)',
  'B.Tech - Artificial Intelligence & Machine Learning (AI/ML)',
  'B.Tech - Data Science',
  'B.Tech - Information Technology (IT)',
  'B.Tech - Electronics & Communication (ECE)',
  'B.E. - Computer Science',
  'BCA / MCA',
  'Other Degree',
];

const yearsList = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const careerInterestOptions = [
  'Software Development',
  'AI/ML',
  'Data Science',
  'Web Development',
  'Cyber Security',
  'Cloud Computing',
  'Other',
];

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate, onSignUpSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech - Computer Science & Engineering (CSE)');
  const [currentYear, setCurrentYear] = useState('1st Year');

  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Software Development']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setFullName('Farhan Patel');
    setEmail('farhanpatelpatel43@gmail.com');
    setPassword('123456');
    setConfirmPassword('123456');
    setCollege('National Institute of Technology');
    setDegree('B.Tech - Artificial Intelligence & Machine Learning (AI/ML)');
    setCurrentYear('3rd Year');
    setSelectedInterests(['Data Science', 'AI/ML']);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // Create a brand new, personalized user profile strictly using the new sign-in info
      const newUser = createNewUserProfile({
        name: fullName.trim(),
        email: email.trim(),
        college: college.trim() || 'Engineering Institute',
        degree,
        currentYear,
        interests: selectedInterests,
      });

      // Save user to active session and multi-user local storage
      saveUserToStorage(newUser);

      // 1. Try Supabase Auth sign up
      await signUpWithSupabaseAuth(email.trim(), password, {
        name: newUser.name,
        college: newUser.college,
        degree: newUser.degree,
        currentYear: newUser.currentYear,
        branch: newUser.branch,
        interests: selectedInterests,
      }).catch(() => {});

      // 2. Save directly to Supabase Database user_progress table
      await syncUserProgressToSupabase(newUser).catch(console.warn);
      logUserActivityToSupabase(newUser.email, 'signup', {
        name: newUser.name,
        college: newUser.college,
        degree: newUser.degree,
        branch: newUser.branch,
        currentYear: newUser.currentYear,
        interests: selectedInterests,
      });

      onSignUpSuccess(newUser);
    } catch {
      const fallbackUser = createNewUserProfile({
        name: fullName.trim(),
        email: email.trim(),
        college: college.trim() || 'Engineering Institute',
        degree,
        currentYear,
        interests: selectedInterests,
      });
      saveUserToStorage(fallbackUser);
      onSignUpSuccess(fallbackUser);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#070D18] flex flex-col items-center justify-between transition-colors px-4 py-6 sm:py-10 relative overflow-x-hidden">
      {/* Top Bar with Back Arrow, Centered Logo & Theme Toggle */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4 z-20">
        <button
          onClick={() => onNavigate('login')}
          className="p-2.5 rounded-xl bg-white dark:bg-[#0F1D38] border border-gray-200 dark:border-[#1C2E52] text-gray-700 dark:text-gray-300 hover:text-[#0F274A] dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
          title="Back to Login"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="cursor-pointer" onClick={() => onNavigate('home')}>
          <RaahLogo variant="horizontal" size="sm" />
        </div>

        <ThemeToggle />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white dark:bg-[#0B1528] rounded-3xl sm:shadow-lg border border-gray-100 dark:border-[#1C2E52] p-6 sm:p-8 z-20 transition-colors">
        {/* Title Header */}
        <div className="mb-6 flex items-start justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F274A] dark:text-white">
              Create Your <span className="text-[#E59819] dark:text-[#F2B544]">Account</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1">
              Join RAAH and start your personalized journey
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 rounded-lg bg-[#FEF6E4] dark:bg-[#2A2312] border border-[#F2B544]/40 text-[#B45309] dark:text-[#F2B544] text-[10px] font-bold hover:bg-[#FDE68A]/40 transition-colors cursor-pointer shrink-0"
            title="Auto-fill Farhan Patel demo details"
          >
            ⚡ Demo Student
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-400">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full text-xs sm:text-sm font-medium text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs sm:text-sm font-medium text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
              <Lock className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full text-xs sm:text-sm font-medium text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0 cursor-pointer p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
              <Lock className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full text-xs sm:text-sm font-medium text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0 cursor-pointer p-1"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* College / University */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] focus-within:ring-2 focus-within:ring-[#0F274A]/15 dark:focus-within:ring-[#F2B544]/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                College / University
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. ABC College"
                className="w-full text-xs sm:text-sm font-medium text-[#182235] dark:text-white placeholder-gray-400 bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* 2-Columns Row: Degree & Current Year */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Degree */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0 relative">
                <label className="block text-[9px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                  Degree
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full text-[11px] sm:text-xs font-medium text-[#182235] dark:text-white bg-transparent outline-none truncate cursor-pointer appearance-none pr-4"
                >
                  {degreesList.map((d) => (
                    <option key={d} value={d} className="dark:bg-[#0F1D38]">
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-0 bottom-1 pointer-events-none" />
              </div>
            </div>

            {/* Current Year */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#070D18] focus-within:border-[#0F274A] dark:focus-within:border-[#F2B544] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F0] dark:bg-[#14264A] flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0 relative">
                <label className="block text-[9px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wide">
                  Current Year
                </label>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full text-[11px] sm:text-xs font-medium text-[#182235] dark:text-white bg-transparent outline-none truncate cursor-pointer appearance-none pr-4"
                >
                  {yearsList.map((y) => (
                    <option key={y} value={y} className="dark:bg-[#0F1D38]">
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-0 bottom-1 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Career Interest */}
          <div className="pt-2">
            <h3 className="text-xs sm:text-sm font-bold text-[#0F274A] dark:text-white">
              Career Interest
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-gray-400 mb-2">
              Select your areas of interest (multiple allowed)
            </p>

            <div className="grid grid-cols-2 gap-2">
              {careerInterestOptions.map((interest) => {
                const isChecked = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                      isChecked
                        ? 'bg-[#0F274A] dark:bg-[#F2B544] text-white dark:text-[#0F274A] border-[#0F274A] dark:border-[#F2B544] shadow-2xs'
                        : 'bg-white dark:bg-[#070D18] text-[#4B5563] dark:text-gray-300 border-gray-200 dark:border-[#1C2E52] hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded shrink-0 flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-white dark:bg-[#0F274A] border-white dark:border-[#0F274A] text-[#0F274A] dark:text-[#F2B544]'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070D18]'
                      }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className="truncate">{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#0F274A] hover:bg-[#08182E] dark:bg-[#F2B544] dark:hover:bg-[#dfa233] text-white dark:text-[#0F274A] font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create My Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Already have an account? Login */}
        <div className="mt-4 text-center text-xs text-[#4B5563] dark:text-gray-400">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-bold text-[#1D4ED8] dark:text-[#60A5FA] hover:underline cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>

      {/* Bottom Brand Signature & Decorative Waves */}
      <div className="w-full max-w-lg mt-6 flex flex-col items-center relative z-10 pb-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#8C7A5B] dark:text-[#D1A757] tracking-wider uppercase">
          <span className="w-6 h-[1px] bg-[#E59819]/50" />
          <span>Your Path to Career</span>
          <span className="w-6 h-[1px] bg-[#E59819]/50" />
        </div>

        {/* Decorative Home Bar */}
        <div className="w-32 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mt-4" />
      </div>

      {/* Subtle decorative golden/navy corner waves */}
      <div className="fixed bottom-0 right-0 w-32 h-20 pointer-events-none opacity-40 dark:opacity-20 z-0 overflow-hidden">
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <path d="M0,80 C40,40 80,70 120,20 L120,80 Z" fill="#0F274A" />
          <path d="M20,80 C60,50 90,65 120,40" stroke="#E59819" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};
