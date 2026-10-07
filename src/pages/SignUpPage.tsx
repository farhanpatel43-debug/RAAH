import React, { useState } from 'react';
import { NavTab, UserProfile } from '../types';
import { RaahLogo } from '../components/RaahLogo';
import { defaultUserProfile } from '../data/mockData';
import { User, Mail, Lock, Building, GraduationCap, Calendar, Sparkles, ArrowRight, Database } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { syncUserProgressToSupabase } from '../lib/supabase';

interface SignUpPageProps {
  onNavigate: (tab: NavTab) => void;
  onSignUpSuccess: (user: UserProfile) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate, onSignUpSuccess }) => {
  const [fullName, setFullName] = useState('Farhan Patel');
  const [email, setEmail] = useState('farhanpatelpatel43@gmail.com');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');
  const [college, setCollege] = useState('National Institute of Technology');
  const [degree, setDegree] = useState('B.Tech - Artificial Intelligence & Machine Learning (AI/ML)');
  const [currentYear, setCurrentYear] = useState('3rd Year');
  const [careerInterest, setCareerInterest] = useState('AI/ML');
  const [error, setError] = useState('');

  const careerInterests = [
    'AI/ML',
    'Data Science',
    'Web Development',
    'Cyber Security',
    'Cloud Computing',
    'Software Development',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser: UserProfile = {
      ...defaultUserProfile,
      name: fullName.trim(),
      email: email.trim(),
      college,
      degree,
      branch: degree.includes('AI/ML') || degree.includes('AI & ML') ? 'Artificial Intelligence & Machine Learning (AI/ML)' : 'Computer Science & Engineering',
      currentYear,
      targetCareer: careerInterest === 'AI/ML' ? 'ML Engineer' : careerInterest === 'Data Science' ? 'Data Scientist' : careerInterest,
      readinessScore: 45,
    };

    // Sync to Supabase project inscaixmdstsgxmitocm immediately
    syncUserProgressToSupabase(newUser).catch(console.warn);

    onSignUpSuccess(newUser);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#F8F5EE] dark:bg-[#08101F] transition-colors relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-xl w-full">
        <div className="bg-white dark:bg-[#0F1D38] rounded-3xl p-8 sm:p-10 shadow-sm border border-[#EAF0F7] dark:border-[#1C2E52] transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <RaahLogo variant="stacked" size="md" onClick={() => onNavigate('home')} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#14264A] dark:text-white">Create Your Account</h2>
            <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
              Start your personalized 4-year engineering path
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Farhan"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* College & Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                  College / University
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. NIT Trichy, IIT Bombay"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                  Degree & Branch
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1C2E52] text-sm focus:outline-none focus:border-[#14264A] dark:focus:border-[#F2B544] bg-white dark:bg-[#0B162C] text-[#182235] dark:text-white cursor-pointer"
                  >
                    <option value="B.Tech - Artificial Intelligence & Machine Learning (AI/ML)">B.Tech - AI & Machine Learning (AI/ML)</option>
                    <option value="B.Tech - CSE (AI & ML)">B.Tech - CSE (AI & ML)</option>
                    <option value="B.Tech - CSE">B.Tech - Computer Science & Engineering</option>
                    <option value="B.Tech - AI&DS">B.Tech - AI & Data Science</option>
                    <option value="B.Tech - IT">B.Tech - Information Technology</option>
                    <option value="B.E. - CSE">B.E. - Computer Science</option>
                    <option value="BCA / MCA">BCA / MCA</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Current Year */}
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                Current College Year
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setCurrentYear(yr)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      currentYear === yr
                        ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] border-[#14264A] dark:border-[#F2B544] shadow-xs'
                        : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 border-gray-200 dark:border-[#1C2E52] hover:border-gray-300'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Career Interest */}
            <div>
              <label className="block text-xs font-bold text-[#14264A] dark:text-gray-200 mb-1.5 uppercase tracking-wider">
                Primary Career Interest
              </label>
              <div className="flex flex-wrap gap-2">
                {careerInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => setCareerInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      careerInterest === interest
                        ? 'bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] border-[#14264A] dark:border-[#F2B544]'
                        : 'bg-[#F8F5EE] dark:bg-[#14264A]/40 text-[#6B7280] dark:text-gray-300 border-gray-200 dark:border-[#1C2E52] hover:border-gray-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Create My Account</span>
              <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-[#6B7280] dark:text-gray-400">
            <span>Already have an account? </span>
            <button
              onClick={() => onNavigate('login')}
              className="font-bold text-[#14264A] dark:text-[#F2B544] hover:underline cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
