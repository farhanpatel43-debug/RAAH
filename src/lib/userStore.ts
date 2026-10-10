import { UserProfile } from '../types';
import { defaultUserProfile } from '../data/mockData';

export const USER_SESSION_KEY = 'raah_user';
export const USER_REGISTRY_KEY = 'raah_users_db';

/**
 * Cleanly format name from email if user didn't provide one
 * e.g., 'rahul.sharma@gmail.com' -> 'Rahul Sharma'
 */
export function formatNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) return 'Student';
  const prefix = email.split('@')[0];
  const parts = prefix.split(/[._-]/).filter(Boolean);
  if (parts.length > 0) {
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

/**
 * Extract clean engineering branch from degree title
 */
export function extractBranchFromDegree(degree: string): string {
  if (!degree) return 'Computer Science & Engineering (CSE)';
  const d = degree.toLowerCase();
  if (d.includes('ai/ml') || d.includes('artificial intelligence') || d.includes('machine learning')) {
    return 'Artificial Intelligence & Machine Learning (AI/ML)';
  }
  if (d.includes('data science')) {
    return 'Data Science & Analytics';
  }
  if (d.includes('information technology') || d.includes('it')) {
    return 'Information Technology (IT)';
  }
  if (d.includes('bca') || d.includes('mca')) {
    return 'Computer Applications (BCA/MCA)';
  }
  if (d.includes('electronics') || d.includes('ece')) {
    return 'Electronics & Communication (ECE)';
  }
  if (d.includes('mechanical')) {
    return 'Mechanical Engineering';
  }
  if (d.includes('civil')) {
    return 'Civil Engineering';
  }
  if (d.includes('computer') || d.includes('cse')) {
    return 'Computer Science & Engineering (CSE)';
  }
  return degree.replace(/^B\.Tech\s*-\s*|^B\.E\.\s*-\s*/i, '').trim() || 'Computer Science & Engineering';
}

/**
 * Get starter skills tailored to target career
 */
export function getStarterSkillsForCareer(targetCareer: string, interests: string[] = []): string[] {
  const c = targetCareer.toLowerCase();
  if (c.includes('data science') || c.includes('data scientist') || c.includes('analyst')) {
    return ['Python', 'SQL', 'Statistics', 'Pandas'];
  }
  if (c.includes('machine learning') || c.includes('ai/ml') || c.includes('ai')) {
    return ['Python', 'Linear Algebra', 'NumPy', 'Scikit-Learn'];
  }
  if (c.includes('web') || c.includes('full stack') || c.includes('frontend') || c.includes('backend')) {
    return ['HTML/CSS', 'JavaScript', 'React', 'Git/GitHub'];
  }
  if (c.includes('cyber') || c.includes('security')) {
    return ['Networking Basics', 'Linux Commands', 'Python', 'Cryptography'];
  }
  if (c.includes('cloud') || c.includes('devops')) {
    return ['Linux', 'Cloud Basics', 'Docker', 'Git/GitHub'];
  }
  return ['C++', 'Python', 'Logic Design', 'DSA'];
}

/**
 * Derive target career role from primary interests
 */
export function deriveTargetCareerFromInterests(interests: string[] = []): string {
  const primary = interests[0] || 'Software Development';
  if (primary === 'Data Science') return 'Data Scientist';
  if (primary === 'AI/ML') return 'Machine Learning Engineer';
  if (primary === 'Web Development') return 'Full Stack Engineer';
  if (primary === 'Cyber Security') return 'Cybersecurity Specialist';
  if (primary === 'Cloud Computing' || primary === 'Cloud') return 'Cloud Architect';
  if (primary === 'App Development') return 'Mobile App Engineer';
  return 'Software Engineer';
}

/**
 * Create a pristine, completely new user profile matching the user's exact sign-in/up info
 */
export function createNewUserProfile(params: {
  name: string;
  email: string;
  college?: string;
  degree?: string;
  currentYear?: string;
  targetCareer?: string;
  interests?: string[];
  skills?: string[];
}): UserProfile {
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = params.name.trim() || formatNameFromEmail(cleanEmail);
  const college = params.college?.trim() || 'Engineering Institute';
  const degree = params.degree?.trim() || 'B.Tech - Computer Science & Engineering (CSE)';
  const currentYear = params.currentYear?.trim() || '1st Year';
  const branch = extractBranchFromDegree(degree);

  const interests = params.interests && params.interests.length > 0 ? params.interests : ['Software Development'];
  const targetCareer = params.targetCareer || deriveTargetCareerFromInterests(interests);
  const starterSkills = params.skills && params.skills.length > 0 ? params.skills : getStarterSkillsForCareer(targetCareer, interests);

  // Realistic starter readiness based on year
  let initialReadiness = 30;
  if (currentYear.includes('1st')) initialReadiness = 25;
  else if (currentYear.includes('2nd')) initialReadiness = 38;
  else if (currentYear.includes('3rd')) initialReadiness = 50;
  else if (currentYear.includes('4th')) initialReadiness = 65;

  return {
    name: cleanName,
    email: cleanEmail,
    college,
    degree,
    branch,
    currentYear,
    targetCareer,
    skills: starterSkills,
    dailyStudyTime: '2 hours',
    interests,
    readinessScore: initialReadiness,
    streakDays: 1, // Start on Day 1 for new sign in!
    xp: 50, // Welcome Starter XP Bonus!
  };
}

/**
 * Save user to active session and multi-user local registry
 */
export function saveUserToStorage(user: UserProfile): void {
  try {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    const cleanEmail = user.email.toLowerCase().trim();
    const existingRegistry = JSON.parse(localStorage.getItem(USER_REGISTRY_KEY) || '{}');
    existingRegistry[cleanEmail] = user;
    localStorage.setItem(USER_REGISTRY_KEY, JSON.stringify(existingRegistry));
  } catch (e) {
    console.warn('Failed to save user to storage:', e);
  }
}

/**
 * Retrieve user from multi-user local registry by email
 */
export function getUserFromStorageByEmail(email: string): UserProfile | null {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const registry = JSON.parse(localStorage.getItem(USER_REGISTRY_KEY) || '{}');
    if (registry[cleanEmail]) {
      return registry[cleanEmail];
    }
  } catch {}
  return null;
}

/**
 * Load active session user or fallback
 */
export function loadActiveUserFromStorage(): UserProfile | null {
  try {
    const saved = localStorage.getItem(USER_SESSION_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return null;
}

/**
 * Clear current active user session (on logout)
 */
export function clearActiveUserSession(): void {
  try {
    localStorage.removeItem(USER_SESSION_KEY);
  } catch {}
}
