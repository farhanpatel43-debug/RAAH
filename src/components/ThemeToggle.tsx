import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme"
      className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
        isDark
          ? 'bg-[#14264A] text-[#F2B544] hover:bg-[#1E386D] border border-[#1E3563]'
          : 'bg-white text-[#14264A] hover:bg-[#FAF7F2] border border-[#EAF0F7] shadow-2xs'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F2B544] transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#14264A] transition-transform rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
