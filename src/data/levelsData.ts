import { XpLevel } from '../types';

export const XP_LEVELS: XpLevel[] = [
  {
    level: 1,
    title: 'Code Novice',
    minXp: 0,
    maxXp: 300,
    badge: '🥉 Bronze Sprout',
    color: 'from-amber-600 to-amber-700',
    perks: ['Access to Year 1-4 Roadmaps', 'Daily Learning Videos', 'Basic Quizzes'],
  },
  {
    level: 2,
    title: 'Syntax Explorer',
    minXp: 301,
    maxXp: 700,
    badge: '🌿 Emerald Scout',
    color: 'from-emerald-500 to-teal-600',
    perks: ['Unlock Interactive Code Runner', 'Daily Streak Tracking', 'College Attendance Log'],
  },
  {
    level: 3,
    title: 'Algorithm Apprentice',
    minXp: 701,
    maxXp: 1200,
    badge: '⚡ Sapphire Solver',
    color: 'from-blue-500 to-indigo-600',
    perks: ['Medium Coding Challenges', 'Bunk Safety Calculator', 'AI Career Advisor Access'],
  },
  {
    level: 4,
    title: 'Bug Slayer',
    minXp: 1201,
    maxXp: 1800,
    badge: '⚔️ Ruby Vanguard',
    color: 'from-rose-500 to-red-600',
    perks: ['Smart Project Idea Generator', 'Resume STAR Bullet Generator', 'Streak Shields (1x/month)'],
  },
  {
    level: 5,
    title: 'Full-Stack Craftsman',
    minXp: 1801,
    maxXp: 2600,
    badge: '🔮 Amethyst Architect',
    color: 'from-purple-500 to-fuchsia-600',
    perks: ['Verifiable Digital Certificate', 'Advanced Capstone Blueprints', 'LinkedIn Credential Badges'],
  },
  {
    level: 6,
    title: 'Architecture Adept',
    minXp: 2601,
    maxXp: 3600,
    badge: '💎 Diamond Pioneer',
    color: 'from-cyan-500 to-blue-600',
    perks: ['System Design Roadmaps', 'FAANG Placement Mock Drives', '1.5x XP Streak Multiplier'],
  },
  {
    level: 7,
    title: 'System Virtuoso',
    minXp: 3601,
    maxXp: 5000,
    badge: '👑 Crown Master',
    color: 'from-amber-400 to-yellow-600',
    perks: ['Direct Alumni Referral Vault', 'Open Source Contributor Badge', 'Peer Mentorship Portal'],
  },
  {
    level: 8,
    title: 'Tech Titan',
    minXp: 5001,
    maxXp: 10000,
    badge: '🌟 Mythic Legend',
    color: 'from-amber-300 via-orange-500 to-purple-600',
    perks: ['Lifetime Hall of Fame', 'VIP Industry Network', 'Unlimited Project Generative Exports'],
  },
];

export function getUserLevel(xp: number): XpLevel {
  const current = XP_LEVELS.find((l) => xp >= l.minXp && xp <= l.maxXp);
  if (current) return current;
  if (xp > XP_LEVELS[XP_LEVELS.length - 1].maxXp) {
    return XP_LEVELS[XP_LEVELS.length - 1];
  }
  return XP_LEVELS[0];
}

export function getNextLevel(xp: number): XpLevel | null {
  const current = getUserLevel(xp);
  const nextIdx = XP_LEVELS.findIndex((l) => l.level === current.level) + 1;
  return nextIdx < XP_LEVELS.length ? XP_LEVELS[nextIdx] : null;
}

export function getXpProgress(xp: number): { currentXpInLevel: number; requiredXpInLevel: number; percentage: number } {
  const current = getUserLevel(xp);
  const next = getNextLevel(xp);
  
  if (!next) {
    return { currentXpInLevel: xp - current.minXp, requiredXpInLevel: current.maxXp - current.minXp, percentage: 100 };
  }

  const range = current.maxXp - current.minXp;
  const inLevel = Math.max(0, xp - current.minXp);
  const percentage = Math.min(100, Math.round((inLevel / range) * 100));

  return {
    currentXpInLevel: inLevel,
    requiredXpInLevel: range,
    percentage,
  };
}

export const XP_ACTIVITIES = [
  { action: 'Watch Educational Lesson', xp: 20, icon: 'Play' },
  { action: 'Complete Chapter Quiz', xp: 30, icon: 'HelpCircle' },
  { action: 'Solve Coding Challenge', xp: 25, icon: 'Code2' },
  { action: 'Mark Daily Attendance Check-In', xp: 15, icon: 'UserCheck' },
  { action: 'Generate Project Blueprint', xp: 40, icon: 'FolderGit2' },
  { action: 'Maintain 7-Day Streak', xp: 50, icon: 'Flame' },
];
