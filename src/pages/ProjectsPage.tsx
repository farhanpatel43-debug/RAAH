import React, { useState } from 'react';
import { NavTab, RecommendedProject, UserProfile, GeneratedProject } from '../types';
import { recommendedProjects } from '../data/mockData';
import { ProjectGeneratorModal } from '../components/ProjectGeneratorModal';
import {
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  Layers,
  Clock,
  ExternalLink,
  X,
  Code2,
  GitBranch,
  Terminal,
  Sparkles,
  Cpu,
  BookmarkPlus,
} from 'lucide-react';

interface ProjectsPageProps {
  user: UserProfile;
  onNavigate: (tab: NavTab) => void;
  onAddXp?: (amount: number, activity?: any, details?: any) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ user, onNavigate, onAddXp }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<RecommendedProject | null>(null);
  const [generatorOpen, setGeneratorOpen] = useState(false);

  const categories = [
    'All',
    'Data Science',
    'AI/ML',
    'Web Dev',
    'Cyber Security',
    'Cloud',
  ];

  const filteredProjects = recommendedProjects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return (
      p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-[#182235] dark:text-[#F1F5F9]">
      {/* Title & AI Generator Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264A] dark:text-white">
            Projects & Blueprint Generator
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            Build production-grade capstone and mini-projects tailored to your branch and target career.
          </p>
        </div>

        {/* AI Generator Trigger Button */}
        <button
          onClick={() => setGeneratorOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#14264A] via-[#1E386D] to-[#14264A] hover:opacity-95 text-white dark:bg-[#F2B544] dark:text-[#14264A] border-2 border-[#F2B544] shadow-md flex items-center gap-2.5 font-black text-xs transition-all hover:scale-102 cursor-pointer self-start md:self-auto"
        >
          <Cpu className="w-4 h-4 text-[#F2B544] dark:text-[#14264A]" />
          <span>Launch AI Project Generator</span>
          <span className="text-[10px] bg-[#F2B544] text-[#14264A] px-1.5 py-0.2 rounded font-black">
            +40 XP
          </span>
        </button>
      </div>

      {/* Category Pills matching reference */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#14264A] text-white shadow-xs'
                : 'bg-white text-[#6B7280] border border-[#EAF0F7] hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl p-6 border border-[#EAF0F7] shadow-xs hover:border-[#14264A]/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                    project.badge === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : project.badge === 'Intermediate'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {project.badge}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-extrabold text-[#14264A] mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Steps and Difficulty Info */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
                <span>Steps: <strong className="text-[#14264A]">{project.stepsCount}</strong></span>
                <span>Difficulty: <strong className="text-[#14264A]">{project.difficulty}</strong></span>
              </div>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#14264A] border border-[#EAF0F7] font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="pt-6">
              <button
                onClick={() => setActiveProject(project)}
                className="w-full py-2.5 bg-[#14264A] hover:bg-[#0B1B36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Project</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F2B544]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100">
            {/* Header */}
            <div className="p-6 bg-[#14264A] text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F2B544] uppercase tracking-wider">
                  {activeProject.category} • {activeProject.badge}
                </span>
                <h3 className="text-xl font-extrabold mt-0.5">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-gray-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                  Project Overview
                </h4>
                <p className="text-xs text-[#182235] leading-relaxed">
                  {activeProject.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                  Key Deliverables
                </h4>
                <div className="space-y-1.5">
                  {activeProject.keyFeatures.map((kf, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#182235]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{kf}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                  Step-by-Step Implementation Roadmap ({activeProject.stepsCount} Steps)
                </h4>
                <div className="space-y-2">
                  {activeProject.steps.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAF0F7] flex items-center gap-3 text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#14264A] text-[#F2B544] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-[#182235]">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starter commands */}
              <div className="p-4 bg-[#0B1B36] rounded-2xl text-emerald-400 font-mono text-xs space-y-1">
                <p className="text-gray-400 text-[10px] uppercase font-bold font-sans">
                  Quick Git Clone
                </p>
                <p>git clone https://github.com/raah-org/{activeProject.title.toLowerCase().replace(/\s+/g, '-')}.git</p>
                <p>cd {activeProject.title.toLowerCase().replace(/\s+/g, '-')} && pip install -r requirements.txt</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F8F5EE] border-t border-[#EAF0F7] flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">
                Estimated Duration: <strong>{activeProject.duration}</strong>
              </span>
              <button
                onClick={() => {
                  alert(`Started project: ${activeProject.title}. Added to your active assignments!`);
                  setActiveProject(null);
                }}
                className="px-5 py-2.5 bg-[#14264A] hover:bg-[#0B1B36] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Start This Project →
              </button>
            </div>
          </div>
        </div>
      )}
      {/* AI Project Generator Modal */}
      <ProjectGeneratorModal
        user={user}
        isOpen={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        onAddXp={onAddXp}
      />
    </div>
  );
};
