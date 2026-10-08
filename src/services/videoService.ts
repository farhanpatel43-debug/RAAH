import { LearningVideo, learningVideos } from '../data/videos';

export interface VideoRecommendationCriteria {
  branch?: string;
  year?: number | string;
  careerGoal?: string;
  skills?: string[];
  currentLesson?: string;
  topic?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  quizPerformance?: number; // e.g. 0-100%
  codingPerformance?: number; // e.g. 0-100%
}

export interface VideoProgressRecord {
  videoId: string;
  completed: boolean;
  watchedSeconds: number;
  completedAt?: string;
  xpEarned: number;
}

const STORAGE_KEY_PROGRESS = 'raah_video_progress';

/**
 * Retrieves the local progress tracking map
 */
function getStoredProgress(): Record<string, VideoProgressRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredProgress(records: Record<string, VideoProgressRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save video progress to localStorage:', e);
  }
}

/**
 * Recommends an educational YouTube video based on student context:
 * branch, year, career goal, current skills, lesson topic, quiz and coding performance.
 */
export function getRecommendedVideo(criteria: VideoRecommendationCriteria): LearningVideo | null {
  if (learningVideos.length === 0) {
    return null;
  }

  const {
    branch,
    year,
    careerGoal,
    skills = [],
    currentLesson,
    topic,
    quizPerformance,
    codingPerformance,
  } = criteria;

  // Normalize year to number if string passed (e.g. "3rd Year" -> 3)
  let numericYear: number | undefined;
  if (typeof year === 'number') {
    numericYear = year;
  } else if (typeof year === 'string') {
    const matched = year.match(/\d+/);
    if (matched) numericYear = parseInt(matched[0], 10);
  }

  // Determine difficulty adaptation based on student quiz/coding performance
  let preferredDifficulty: 'Beginner' | 'Intermediate' | 'Advanced' | undefined;
  const avgPerf =
    quizPerformance !== undefined && codingPerformance !== undefined
      ? (quizPerformance + codingPerformance) / 2
      : quizPerformance !== undefined
      ? quizPerformance
      : codingPerformance;

  if (avgPerf !== undefined) {
    if (avgPerf >= 85) {
      preferredDifficulty = 'Advanced';
    } else if (avgPerf >= 50) {
      preferredDifficulty = 'Intermediate';
    } else {
      preferredDifficulty = 'Beginner';
    }
  }

  // Filter or score candidates based on relevance
  const scored = learningVideos.map((video) => {
    let score = 0;

    // Direct topic / lesson match is highest priority
    if (topic && video.topic.toLowerCase() === topic.toLowerCase()) {
      score += 100;
    } else if (
      topic &&
      (video.title.toLowerCase().includes(topic.toLowerCase()) ||
        video.topic.toLowerCase().includes(topic.toLowerCase()))
    ) {
      score += 70;
    }

    if (
      currentLesson &&
      (video.title.toLowerCase().includes(currentLesson.toLowerCase()) ||
        video.topic.toLowerCase().includes(currentLesson.toLowerCase()))
    ) {
      score += 80;
    }

    // Branch match
    if (branch && video.branch.toLowerCase().includes(branch.toLowerCase().slice(0, 10))) {
      score += 25;
    }

    // Career match
    if (careerGoal && video.career.toLowerCase().includes(careerGoal.toLowerCase().slice(0, 8))) {
      score += 25;
    }

    // Academic Year match
    if (numericYear && video.year === numericYear) {
      score += 20;
    } else if (numericYear && Math.abs(video.year - numericYear) === 1) {
      score += 10;
    }

    // Skills overlap
    if (skills && skills.length > 0) {
      const matchedSkill = skills.some(
        (s) =>
          video.title.toLowerCase().includes(s.toLowerCase()) ||
          video.topic.toLowerCase().includes(s.toLowerCase()) ||
          video.description?.toLowerCase().includes(s.toLowerCase())
      );
      if (matchedSkill) score += 15;
    }

    // Performance adaptation
    if (preferredDifficulty && video.difficulty === preferredDifficulty) {
      score += 15;
    }

    return { video, score };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  // If even the top candidate has 0 or negligible match on topic when topic was requested,
  // return null so UI can show "No verified video is currently available for this topic"
  if (topic && scored[0].score < 50) {
    // Check if there is any video with matching keyword in topic or title
    const partialMatch = learningVideos.find(
      (v) =>
        v.topic.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(v.topic.toLowerCase())
    );
    if (!partialMatch) {
      return null;
    }
  }

  return scored[0]?.video || null;
}

/**
 * Returns an alternative REAL educational video for the same topic or field
 * avoiding the current video ID. Never invents a fake ID.
 */
export function getAlternativeVideo(currentVideoId: string, topic: string): LearningVideo | null {
  // Find other videos on same topic
  const sameTopic = learningVideos.filter(
    (v) => v.videoId !== currentVideoId && v.topic.toLowerCase() === topic.toLowerCase()
  );
  if (sameTopic.length > 0) {
    return sameTopic[0];
  }

  // Find related videos where title or description mentions topic
  const related = learningVideos.filter(
    (v) =>
      v.videoId !== currentVideoId &&
      (v.title.toLowerCase().includes(topic.toLowerCase()) ||
        v.description?.toLowerCase().includes(topic.toLowerCase()))
  );
  if (related.length > 0) {
    return related[0];
  }

  // Fallback to any alternative video that is different
  const other = learningVideos.filter((v) => v.videoId !== currentVideoId);
  return other[0] || null;
}

/**
 * Marks a video as completed, stores progress in localStorage, and calculates XP.
 * Standard award: +20 XP.
 */
export function markVideoComplete(
  videoId: string,
  _userId?: string
): { xpAwarded: number; newTotalXp: number; unlockedQuiz: boolean } {
  const records = getStoredProgress();
  const existing = records[videoId];

  const XP_REWARD = 20;
  let xpAwarded = 0;

  if (!existing || !existing.completed) {
    xpAwarded = XP_REWARD;
    records[videoId] = {
      videoId,
      completed: true,
      watchedSeconds: 1200,
      completedAt: new Date().toISOString(),
      xpEarned: XP_REWARD,
    };
    saveStoredProgress(records);
  }

  // Calculate total XP earned across completed videos
  let totalVideoXp = 0;
  Object.values(records).forEach((r) => {
    if (r.completed) totalVideoXp += r.xpEarned || 20;
  });

  return {
    xpAwarded,
    newTotalXp: totalVideoXp,
    unlockedQuiz: true,
  };
}

/**
 * Reads the progress and completion status for a given video
 */
export function getVideoProgress(videoId: string): VideoProgressRecord {
  const records = getStoredProgress();
  return (
    records[videoId] || {
      videoId,
      completed: false,
      watchedSeconds: 0,
      xpEarned: 0,
    }
  );
}

/**
 * Checks whether any video for a chapter/topic has been completed, unlocking the quiz
 */
export function isQuizUnlockedForTopic(topic: string): boolean {
  const records = getStoredProgress();
  const matchingVideos = learningVideos.filter(
    (v) => v.topic.toLowerCase() === topic.toLowerCase()
  );
  if (matchingVideos.length === 0) return true; // If no video required, don't hard block
  return matchingVideos.some((v) => records[v.videoId]?.completed);
}
