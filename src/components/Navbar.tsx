import React, { useState } from 'react';
import { RaahLogo } from './RaahLogo';
import { NavTab, UserProfile } from '../types';
import { Menu, X, ArrowRight, UserCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navLinks: { label: string; tab: NavTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Roadmap', tab: 'public-roadmap' },
    { label: 'Careers', tab: 'careers' },
    { label: 'Projects', tab: 'public-projects' },
    { label: 'About', tab: 'about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5EE]/95 dark:bg-[#08101F]/95 backdrop-blur-md border-b border-[#EAF0F7] dark:border-[#1C2E52] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <RaahLogo 
              variant="horizontal" 
              size="md" 
              onClick={() => onNavigate(user ? 'dashboard' : 'home')}
              className="cursor-pointer" 
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => onNavigate(link.tab)}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#14264A] dark:text-[#F2B544] font-bold border-b-2 border-[#F2B544] pb-1'
                      : 'text-[#6B7280] dark:text-gray-400 hover:text-[#14264A] dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#14264A] dark:text-[#F1F5F9] bg-[#EAF0F7] dark:bg-[#14264A] hover:bg-[#dfe8f5] dark:hover:bg-[#1E386D] rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-[#14264A] dark:text-[#F2B544]" />
                  <span>Go to Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs text-[#6B7280] dark:text-gray-400 hover:text-[#14264A] dark:hover:text-white font-medium px-2 py-1"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-5 py-2 text-sm font-semibold text-[#14264A] dark:text-gray-200 hover:text-[#0B1B36] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] dark:hover:bg-[#dfa233] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#14264A] dark:text-gray-200 hover:bg-[#EAF0F7] dark:hover:bg-[#14264A] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0F1D38] border-b border-[#EAF0F7] dark:border-[#1C2E52] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => {
                onNavigate(link.tab);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                currentTab === link.tab
                  ? 'bg-[#EAF0F7] dark:bg-[#14264A] text-[#14264A] dark:text-[#F2B544]'
                  : 'text-[#6B7280] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E386D]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#14264A] dark:bg-[#F2B544] text-white dark:text-[#14264A] font-bold rounded-xl text-center"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-[#6B7280] dark:text-gray-400 text-sm text-center font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center font-semibold text-[#14264A] dark:text-white border border-[#EAF0F7] dark:border-[#1C2E52] rounded-xl bg-gray-50 dark:bg-[#14264A]"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center font-bold text-white bg-[#14264A] dark:bg-[#F2B544] dark:text-[#14264A] rounded-xl shadow"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
