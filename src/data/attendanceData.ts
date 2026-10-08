import { SubjectAttendance } from '../types';

export const defaultSubjectsAttendance: SubjectAttendance[] = [
  {
    id: 'sub-ml',
    subjectCode: 'CS501',
    name: 'Machine Learning & Pattern Recognition',
    teacher: 'Dr. Ramesh Sharma',
    totalClasses: 38,
    attendedClasses: 32,
    minimumRequired: 75,
    credits: 4,
  },
  {
    id: 'sub-dbms',
    subjectCode: 'CS502',
    name: 'Database Management Systems (DBMS)',
    teacher: 'Prof. Ananya Iyer',
    totalClasses: 35,
    attendedClasses: 27,
    minimumRequired: 75,
    credits: 4,
  },
  {
    id: 'sub-daa',
    subjectCode: 'CS503',
    name: 'Design & Analysis of Algorithms',
    teacher: 'Dr. Vikramaditya Rao',
    totalClasses: 36,
    attendedClasses: 30,
    minimumRequired: 75,
    credits: 4,
  },
  {
    id: 'sub-web',
    subjectCode: 'CS504',
    name: 'Web Technologies & Cloud Computing',
    teacher: 'Prof. Sandeep Kulkarni',
    totalClasses: 40,
    attendedClasses: 28, // 70% - Critical! Needs 8 classes
    minimumRequired: 75,
    credits: 3,
  },
  {
    id: 'sub-cn',
    subjectCode: 'CS505',
    name: 'Computer Networks & Security',
    teacher: 'Dr. Meenakshi Sundaram',
    totalClasses: 39,
    attendedClasses: 33,
    minimumRequired: 75,
    credits: 3,
  },
];

export interface BunkCalculation {
  percentage: number;
  isSafe: boolean;
  status: 'safe' | 'warning' | 'critical';
  safeBunks: number;
  classesNeededToRecover: number;
}

export function calculateBunkSafety(
  attended: number,
  total: number,
  minimumPercentage = 75
): BunkCalculation {
  if (total === 0) {
    return {
      percentage: 100,
      isSafe: true,
      status: 'safe',
      safeBunks: 0,
      classesNeededToRecover: 0,
    };
  }

  const percentage = Number(((attended / total) * 100).toFixed(1));
  const minRatio = minimumPercentage / 100;

  if (percentage >= minimumPercentage) {
    // How many classes can be missed in future?
    // (attended) / (total + x) >= minRatio => total + x <= attended / minRatio => x <= (attended / minRatio) - total
    const maxFutureTotal = Math.floor(attended / minRatio);
    const safeBunks = Math.max(0, maxFutureTotal - total);

    return {
      percentage,
      isSafe: true,
      status: safeBunks <= 1 ? 'warning' : 'safe',
      safeBunks,
      classesNeededToRecover: 0,
    };
  } else {
    // How many consecutive classes needed?
    // (attended + y) / (total + y) >= minRatio => attended + y >= minRatio*total + minRatio*y => y*(1 - minRatio) >= minRatio*total - attended
    const needed = Math.ceil((minRatio * total - attended) / (1 - minRatio));

    return {
      percentage,
      isSafe: false,
      status: 'critical',
      safeBunks: 0,
      classesNeededToRecover: Math.max(1, needed),
    };
  }
}

export function calculateOverallAttendance(subjects: SubjectAttendance[]): {
  totalClasses: number;
  attendedClasses: number;
  overallPercentage: number;
  isCompliant: boolean;
  readinessModifier: number;
} {
  const totalClasses = subjects.reduce((sum, s) => sum + s.totalClasses, 0);
  const attendedClasses = subjects.reduce((sum, s) => sum + s.attendedClasses, 0);
  const overallPercentage = totalClasses > 0 ? Number(((attendedClasses / totalClasses) * 100).toFixed(1)) : 100;
  
  let readinessModifier = 0;
  if (overallPercentage >= 85) {
    readinessModifier = +5;
  } else if (overallPercentage >= 75) {
    readinessModifier = +2;
  } else if (overallPercentage >= 65) {
    readinessModifier = -5;
  } else {
    readinessModifier = -10;
  }

  return {
    totalClasses,
    attendedClasses,
    overallPercentage,
    isCompliant: overallPercentage >= 75,
    readinessModifier,
  };
}
