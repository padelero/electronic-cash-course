
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  walletAddress?: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  price: number;
  currency: 'USD' | 'BCH';
  modules: Module[];
  estimatedHours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rewardThresholds: {
    percentage: number;
    rewardAmount: number;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'practice';
  order: number;
  duration: number; // in minutes
  completed: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'code';
  url: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // in minutes
  attempts: number;
  bestScore?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[]; // Lesson IDs
  quizScores: {
    quizId: string;
    score: number;
    attempts: number;
    lastAttemptDate: Date;
  }[];
  certificateIssued: boolean;
  certificateHash?: string;
  rewardsEarned: number; // BCH amount
  percentComplete: number;
}
