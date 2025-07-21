export interface Profile {
  id: string; // Corresponds to Supabase auth.users.id
  username: string;
  email?: string;
  avatar_url?: string;
}

export interface Course {
  id: number;
  name: string;
  short_description: string | null;
  description: string | null;
  resources: CourseResource[] | null;
  invite_code: string;
  visibility: 'public' | 'private';
  pass_rate_threshold: number;
  creator_id: string | null;
}

export type Punch = {
  id: number;
  course_id: number;
  topic: string;
  due_date: string | null;
  status: 'complete' | 'overdue' | 'todo';
};

export type CourseResource = {
  title: string;
  url: string;
};

export type Question = {
  problem_numer: number;
  type: string;
  question: string;
  options: {
    [key: string]: string;
  };
  answer: string;
  explaination: string;
};

export type Quiz = Question[];

export interface CourseMember {
  id: number;
  course_id: number;
  user_id: string;
} 