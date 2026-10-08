import React, { useState } from 'react';
import { UserProfile, GeneratedProject } from '../types';
import { sampleGeneratedProjects, generateCustomProjectBlueprint } from '../data/projectGeneratorData';
import {
  Sparkles,
  FolderGit2,
  X,
  Code2,
  Layers,
  CheckCircle2,
  Copy,
  Download,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileText,
  BookmarkPlus,
  RefreshCw,
  Cpu,
} from 'lucide-react';

interface ProjectGeneratorModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProject?: (project: GeneratedProject) => void;
  onAddXp?: (amount: number, activity?: any, details?: any) => void;
}

export const ProjectGeneratorModal: React.FC<ProjectGeneratorModalProps> = ({
  user,
  isOpen,
  onClose,
  onSaveProject,
  onAddXp,
}) => {
  if (!isOpen) return null;

  // Form parameters
  const [selectedBranch, setSelectedBranch] = useState(user.branch || 'AI/ML');
  const [selectedYear, setSelectedYear] = useState(user.currentYear || '3rd Year');
  const [selectedCareer, setSelectedCareer] = useState(user.targetCareer || 'Data Scientist');
  const [selectedComplexity, setSelectedComplexity] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [techStackInput, setTechStackInput] = useState(user.skills?.join(', ') || 'Python, SQL, Machine Learning');
  const [isGenerating, setIsGenerating] = useState(false);

  // Current displayed project blueprint (initial sample or generated)
  const [activeProject, setActiveProject] = useState<GeneratedProject>(sampleGeneratedProjects[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const branches = [
    'Artificial Intelligence & Machine Learning (AI/ML)',
    'Computer Science & Engineering (CSE)',
    'Data Science & Analytics',
    'Electronics & Communication (ECE)',
    'Information Technology (IT)',
  ];

  const years = ['1st Year Foundation', '2nd Year Core', '3rd Year Pre-Capstone', '4th Year Final Capstone'];

  const careers = [
    'Data Scientist',
    'Machine Learning Engineer',
    'Full Stack Web Developer',
    'Cloud / DevOps Engineer',
    'Cybersecurity Specialist',
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const skillsArray = techStackInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const generated = generateCustomProjectBlueprint({
        branch: selectedBranch,
        year: selectedYear,
        careerGoal: selectedCareer,
        skills: skillsArray.length > 0 ? skillsArray : ['Python', 'SQL'],
      });

      generated.difficulty = selectedComplexity;
      setActiveProject(generated);
      setIsGenerating(false);

      if (onAddXp) {
        onAddXp(40, 'problem_solved', { type: 'generated_project_blueprint', title: generated.title });
      }
    }, 700);
  };

  const handleCopyMarkdown = () => {
    const md = `# ${activeProject.title} (${activeProject.codename})
Category: ${activeProject.category} | Target: ${activeProject.yearTarget} | Difficulty: ${activeProject.difficulty}
Tech Stack: ${activeProject.techStack.join(', ')}

## Problem Statement
${activeProject.problemStatement}

## Architecture Overview
${activeProject.architectureSummary}

## Step-by-Step Milestones
${activeProject.phases
  .map(
    (p) => `### ${p.phase}: ${p.title}
${p.deliverables.map((d) => `- ${d}`).join('\n')}`
  )
  .join('\n\n')}

## Resume Bullet Points (STAR Format)
${activeProject.resumeBulletPoints.map((b) => `- ${b}`).join('\n')}

## Technical Interview Questions
${activeProject.interviewQuestions
  .map((q) => `Q: ${q.question}\nA: ${q.answerKey}`)
  .join('\n\n')}
`;

    navigator.clipboard.writeText(md);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleSaveToPortfolio = () => {
    if (onSaveProject) {
      onSaveProject(activeProject);
    }
    // Also store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('raah_saved_projects') || '[]');
      if (!existing.some((p: any) => p.id === activeProject.id)) {
        existing.unshift(activeProject);
        localStorage.setItem('raah_saved_projects', JSON.stringify(existing));
      }
    } catch {}

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#182235] dark:text-[#F1F5F9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#14264A] via-[#1E386D] to-[#0A162C] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Project Generator"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#F2B544] uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>AI-Powered Capstone & Mini-Project Blueprint Engine</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Engineering Project Generator
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                Generate production-grade portfolio project specs tailored to your branch, academic year, and dream job.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#F2B544]" />
                <span>{copiedSuccess ? 'Copied Markdown! ✓' : 'Copy Specs'}</span>
              </button>

              <button
                onClick={handleSaveToPortfolio}
                className="px-4 py-2 bg-[#F2B544] hover:bg-amber-400 text-[#14264A] rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>{savedSuccess ? 'Saved to Portfolio ✓' : 'Save Project (+40 XP)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Left Controls, Right Blueprint */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Panel (Left 4 cols) */}
          <div className="lg:col-span-4 p-5 bg-[#F8F5EE] dark:bg-[#0F1D38] border-r border-[#EAF0F7] dark:border-[#1C2E52] overflow-y-auto space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Customize Project Parameters
            </h3>

            {/* Branch select */}
            <div>
              <label className="text-[11px] font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                Engineering Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label className="text-[11px] font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                Academic Year Level
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Career Goal */}
            <div>
              <label className="text-[11px] font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                Target Role
              </label>
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden"
              >
                {careers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Complexity Pills */}
            <div>
              <label className="text-[11px] font-bold text-[#6B7280] dark:text-gray-300 block mb-1.5">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedComplexity(lvl)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedComplexity === lvl
                        ? 'bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A]'
                        : 'bg-white dark:bg-[#14264A]/60 text-gray-600 dark:text-gray-300 border border-[#EAF0F7] dark:border-[#1C2E52]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Input */}
            <div>
              <label className="text-[11px] font-bold text-[#6B7280] dark:text-gray-300 block mb-1">
                Tech Stack Focus (comma-separated)
              </label>
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="Python, PyTorch, Docker, FastAPI"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#14264A] border border-[#EAF0F7] dark:border-[#1C2E52] text-xs font-semibold focus:outline-hidden"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing Architecture...' : 'Generate New Blueprint'}</span>
            </button>

            {/* Sample Templates */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-gray-400 block mb-2">
                Quick Template Presets
              </span>
              <div className="space-y-1.5">
                {sampleGeneratedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                      activeProject.id === proj.id
                        ? 'bg-white dark:bg-[#14264A] text-[#14264A] dark:text-[#F2B544] border border-[#F2B544]/50 shadow-2xs'
                        : 'text-[#6B7280] dark:text-gray-400 hover:bg-white/60 dark:hover:bg-[#14264A]/40'
                    }`}
                  >
                    <span className="truncate pr-2">{proj.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blueprint Detail View (Right 8 cols) */}
          <div className="lg:col-span-8 p-6 overflow-y-auto space-y-6">
            {/* Title & Badge */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#14264A] text-white dark:bg-[#F2B544] dark:text-[#14264A]">
                  {activeProject.codename}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {activeProject.difficulty}
                </span>
                <span className="text-xs text-[#6B7280] dark:text-gray-400">
                  Estimated Timeline: <strong>{activeProject.duration}</strong>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#14264A] dark:text-white leading-tight">
                {activeProject.title}
              </h2>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF0F7] dark:bg-[#1A2E56] text-[#14264A] dark:text-[#F2B544]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem Statement Card */}
            <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-1">
                Real-World Industry Problem Addressed
              </span>
              <p className="text-xs sm:text-sm text-[#182235] dark:text-gray-200 leading-relaxed">
                {activeProject.problemStatement}
              </p>
            </div>

            {/* Architecture Overview */}
            <div className="p-4 rounded-2xl bg-[#F8F5EE] dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 block mb-1">
                System Architecture & Data Flow
              </span>
              <p className="text-xs sm:text-sm font-mono text-[#14264A] dark:text-[#F2B544] bg-white dark:bg-[#08101F] p-3 rounded-xl border border-gray-200 dark:border-gray-800 leading-relaxed">
                {activeProject.architectureSummary}
              </p>
            </div>

            {/* 4-Phase Step-by-Step Milestones */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#F2B544]" />
                <span>4-Phase Step-by-Step Implementation Roadmap</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProject.phases.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0F1D38] border border-[#EAF0F7] dark:border-[#1C2E52] shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#F2B544] bg-[#FEF6E4] dark:bg-[#2A2312] px-2 py-0.5 rounded">
                        {phase.phase}
                      </span>
                      <span className="text-[10px] text-gray-400">Step {idx + 1} of 4</span>
                    </div>
                    <h4 className="text-xs font-black text-[#14264A] dark:text-white">
                      {phase.title}
                    </h4>
                    <ul className="space-y-1 text-[11px] text-[#6B7280] dark:text-gray-300">
                      {phase.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantified Resume Bullet Points (STAR format) */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Recruiter-Ready Resume Bullet Points (STAR Format)</span>
              </span>
              <ul className="space-y-2 text-xs text-emerald-950 dark:text-emerald-200">
                {activeProject.resumeBulletPoints.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Interview Questions Expected */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Technical Interview Questions You'll Be Asked</span>
              </span>
              <div className="space-y-3">
                {activeProject.interviewQuestions.map((iq, qIdx) => (
                  <div key={qIdx} className="text-xs space-y-1">
                    <p className="font-extrabold text-[#14264A] dark:text-amber-200">
                      Q: {iq.question}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 italic pl-3 border-l-2 border-amber-400">
                      A: {iq.answerKey}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
