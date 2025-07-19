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

export interface CourseResource {
  title: string;
  url: string;
}

export interface CourseMember {
  id: number;
  course_id: number;
  user_id: string;
}

export interface Punch {
  id: number;
  course_id: number;
  topic: string;
  description: string | null;
  due_date: string | null;
  task_type: 'quiz-multiple-choice' | 'punch';
}

// export interface Question {
//   id: number;
//   course_id: number;
//   question_text: string;
//   options: QuestionOption[];
//   explanation: string | null;
// }

// export interface QuestionOption {
//   id: string;
//   text: string;
//   is_correct: boolean;
// } 