import React from 'react';
import { RaahLogo } from './RaahLogo';
import { NavTab } from '../types';
import { Github, Twitter, Linkedin, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-[#08101F] border-t border-[#EAF0F7] dark:border-[#1C2E52] mt-16 text-[#182235] dark:text-[#F1F5F9] transition-colors">
      {/* Brand values bar */}
      <div className="border-b border-[#F1EFEA] dark:border-[#1C2E52] py-6 bg-[#FAF7F2]/60 dark:bg-[#0F1D38]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F2B544]" />
            <span className="text-sm font-bold text-[#14264A] dark:text-[#F2B544] tracking-wider uppercase">
              RAAH Vision:
            </span>
            <span className="text-sm text-[#6B7280] dark:text-gray-400">
              Personalized 4-Year College-to-Career Mastery for Tech Students
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[#14264A] dark:text-gray-300 tracking-wider uppercase">
            <span>Learn</span>
            <span className="text-[#F2B544] font-bold">•</span>
            <span>Practice</span>
            <span className="text-[#F2B544] font-bold">•</span>
            <span>Build</span>
            <span className="text-[#F2B544] font-bold">•</span>
            <span>Grow</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Statement */}
          <div className="md:col-span-1 space-y-4">
            <RaahLogo variant="horizontal" size="md" onClick={() => onNavigate('home')} />
            <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed">
              RAAH bridges the gap between college curriculum and industry standards with structured 4-year roadmaps, hands-on coding, and verified career paths.
            </p>
            <div className="flex items-center space-x-3 text-[#6B7280] dark:text-gray-400">
              <a href="#" className="p-2 rounded-lg bg-[#F8F5EE] dark:bg-[#14264A] hover:text-[#14264A] dark:hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#F8F5EE] dark:bg-[#14264A] hover:text-[#14264A] dark:hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#F8F5EE] dark:bg-[#14264A] hover:text-[#14264A] dark:hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#6B7280] dark:text-gray-400">
              <li>
                <button onClick={() => onNavigate('public-roadmap')} className="hover:text-[#14264A] dark:hover:text-white transition-colors cursor-pointer">
                  4-Year Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-[#14264A] dark:hover:text-white transition-colors cursor-pointer">
                  Career Pathways
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('public-projects')} className="hover:text-[#14264A] dark:hover:text-white transition-colors cursor-pointer">
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#14264A] dark:hover:text-white transition-colors cursor-pointer">
                  About RAAH
                </button>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-white mb-3">
              Career Tracks
            </h4>
            <ul className="space-y-2 text-xs text-[#6B7280] dark:text-gray-400">
              <li>Data Science & AI / ML</li>
              <li>Artificial Intelligence & Machine Learning (AI/ML)</li>
              <li>Full Stack Web Development</li>
              <li>Cloud Computing & DevOps</li>
              <li>Cybersecurity Engineering</li>
            </ul>
          </div>

          {/* Motto / Callout */}
          <div className="bg-[#FAF7F2] dark:bg-[#0F1D38] p-5 rounded-2xl border border-[#EAF0F7] dark:border-[#1C2E52] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14264A] dark:text-[#F2B544]">
              Because Your Future Deserves a Plan
            </h4>
            <p className="text-xs text-[#6B7280] dark:text-gray-300">
              Join thousands of CSE & AI/ML students turning academic foundation into top-tier tech placements.
            </p>
            <button
              onClick={() => onNavigate('signup')}
              className="w-full py-2 bg-[#14264A] hover:bg-[#0B1B36] dark:bg-[#F2B544] dark:text-[#14264A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Get Started for Free
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#F1EFEA] dark:border-[#1C2E52] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] dark:text-gray-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#14264A] dark:text-white">RAAH</span>
            <span>•</span>
            <span className="italic">Your Path to Career</span>
            <span>•</span>
            <span>© 2026 RAAH EdTech. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#F2B544] fill-[#F2B544]" />
            <span>for engineering students everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
