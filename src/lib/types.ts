export interface Profile {
  id: string; // Corresponds to Supabase auth.users.id
  username: string;
  avatar_url?: string;
}

export interface Course {
  id: number;
  name: string;
  shortDescription?: string;
  description: string;
  role: 'owner' | 'moderator' | 'member';
  resources?: string;
}

export interface Task {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'todo' | 'complete' | 'overdue';
  questionCount?: number; // Optional, only for quiz type
  type: 'quiz-multiple-choice' | 'punch';
  questions?: Question[]; // Optional, only for quiz type
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  correctAnswer: string;
  hint?: string;
}

export interface Choice {
  id: string; // e.g., 'a', 'b', 'c'
  text: string;
} 