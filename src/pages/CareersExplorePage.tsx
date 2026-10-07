import React from 'react';
import { NavTab } from '../types';
import { ArrowRight, Sparkles, TrendingUp, DollarSign, BookOpen, Layers } from 'lucide-react';

interface CareersExplorePageProps {
  onNavigate: (tab: NavTab) => void;
}

export const CareersExplorePage: React.FC<CareersExplorePageProps> = ({ onNavigate }) => {
  const careerTracks = [
    {
      title: 'Data Scientist',
      salary: '₹14 - 32 LPA',
      demand: 'Extremely High',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas'],
      description: 'Analyze complex multidimensional data, engineer predictive statistical models, and extract actionable business insights.',
      roadmapHighlights: 'Year 1: Python/Math -> Year 2: DBMS/Algorithms -> Year 3: ML/EDA -> Year 4: Capstone/Placement',
    },
    {
      title: 'Machine Learning Engineer',
      salary: '₹16 - 38 LPA',
      demand: 'Exponential',
      skills: ['PyTorch', 'TensorFlow', 'MLOps', 'Docker', 'FastAPI'],
      description: 'Bridge research models into low-latency production pipelines and distributed cloud architectures.',
      roadmapHighlights: 'Year 1: C++/Python -> Year 2: Advanced DSA -> Year 3: Deep Learning/Transformers -> Year 4: MLOps/Scale',
    },
    {
      title: 'Full Stack Software Engineer',
      salary: '₹12 - 28 LPA',
      demand: 'High',
      skills: ['React', 'Node.js', 'PostgreSQL', 'System Design', 'Redis'],
      description: 'Engineer responsive web user experiences and fault-tolerant, scalable backend API microservices.',
      roadmapHighlights: 'Year 1: Web Basics -> Year 2: DSA/Databases -> Year 3: Distributed Systems -> Year 4: System Design',
    },
    {
      title: 'Cloud & DevOps Engineer',
      salary: '₹13 - 30 LPA',
      demand: 'High',
      skills: ['Linux', 'Kubernetes', 'Docker', 'AWS / GCP', 'Terraform'],
      description: 'Automate CI/CD deployment pipelines, manage container orchestration, and safeguard cloud infrastructure reliability.',
      roadmapHighlights: 'Year 1: Linux/Networking -> Year 2: OS/Systems -> Year 3: Containers/Cloud -> Year 4: Multi-cloud/SRE',
    },
    {
      title: 'Cybersecurity Analyst',
      salary: '₹11 - 26 LPA',
      demand: 'High',
      skills: ['Network Security', 'Cryptography', 'SIEM', 'Penetration Testing'],
      description: 'Safeguard digital infrastructure, conduct proactive vulnerability audits, and implement defense-in-depth protocols.',
      roadmapHighlights: 'Year 1: Networking Basics -> Year 2: OS/Computer Arch -> Year 3: Cryptography/Security -> Year 4: Red Team/Audits',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#182235]">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F2B544]">
          Career Exploration Tracks
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14264A] mt-1">
          Explore High-Growth CSE Career Paths
        </h1>
        <p className="text-sm text-[#6B7280] mt-2">
          Compare in-demand technology roles, required skill sets, average campus placement benchmarks, and 4-year curricula.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerTracks.map((track, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-[#EAF0F7] shadow-xs hover:border-[#14264A]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FEF6E4] text-[#B45309]">
                  {track.demand} Demand
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {track.salary}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-[#14264A] mb-2">
                {track.title}
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                {track.description}
              </p>

              <div className="space-y-1 mb-4">
                <span className="text-[11px] font-bold text-[#14264A] uppercase tracking-wider block">
                  Core Skills Needed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {track.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#14264A] border border-[#EAF0F7] font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#EAF0F7] text-[11px] text-[#6B7280]">
                <strong className="text-[#14264A]">Curriculum Blueprint:</strong>
                <p className="mt-0.5">{track.roadmapHighlights}</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('setup')}
                className="w-full py-2.5 bg-[#14264A] hover:bg-[#0B1B36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select as My Career Target</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F2B544]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
