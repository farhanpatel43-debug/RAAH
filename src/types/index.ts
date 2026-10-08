export type NavTab = 
  | 'home' 
  | 'public-roadmap' 
  | 'careers' 
  | 'public-projects' 
  | 'about' 
  | 'login' 
  | 'signup' 
  | 'setup' 
  | 'dashboard' 
  | 'roadmap' 
  | 'learning' 
  | 'quizzes' 
  | 'coding' 
  | 'projects' 
  | 'career-guidance' 
  | 'ai-agent'
  | 'attendance'
  | 'certificates'
  | 'journey'
  | 'settings';

export type ThemeMode = 'light' | 'dark';

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  currentYear: string;
  targetCareer: string;
  skills: string[];
  dailyStudyTime: string;
  interests: string[];
  readinessScore: number;
  streakDays: number;
  xp: number;
}

export interface SubjectAttendance {
  id: string;
  subjectCode: string;
  name: string;
  teacher?: string;
  totalClasses: number;
  attendedClasses: number;
  minimumRequired: number; // typically 75%
  lastAction?: 'present' | 'absent' | 'cancelled';
  credits?: number;
}

export interface XpLevel {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badge: string;
  color: string;
  perks: string[];
}

export interface GeneratedProject {
  id: string;
  title: string;
  codename: string;
  category: string;
  yearTarget: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  duration: string;
  problemStatement: string;
  architectureSummary: string;
  phases: {
    phase: string;
    title: string;
    deliverables: string[];
  }[];
  resumeBulletPoints: string[];
  interviewQuestions: {
    question: string;
    answerKey: string;
  }[];
  githubTemplateUrl?: string;
}

export interface DigitalCertificate {
  certificateId: string;
  studentName: string;
  degree: string;
  college: string;
  trackTitle: string;
  issueDate: string;
  honors: string;
  readinessScore: number;
  xpEarned: number;
  verificationCode: string;
}

export interface RoadmapYear {
  year: number;
  title: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  semesters: {
    semester: number;
    title: string;
    topics: {
      id: string;
      title: string;
      status: 'completed' | 'in-progress' | 'pending';
      hours: number;
      category: string;
    }[];
  }[];
}

export interface CourseChapter {
  id: number;
  title: string;
  completed: boolean;
  active?: boolean;
  duration?: string;
  summary?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CodingProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: string;
  solvedCount: string;
  status: 'Solved' | 'Attempted' | 'Todo';
  description: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; output: string }[];
}

export interface RecommendedProject {
  id: number;
  title: string;
  badge: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  stepsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  techStack: string[];
  duration: string;
  overview: string;
  keyFeatures: string[];
  steps: string[];
}
