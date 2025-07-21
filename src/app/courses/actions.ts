'use server'

import { createClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

export async function getCourse(courseId: number) {
  noStore();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth');
  }

  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (courseError || !course) {
    console.error('Error fetching course:', courseError);
    return { course: null, punches: [], quizzes: [] };
  }

  const { data: punches, error: punchesError } = await supabase
    .from('punches')
    .select('*')
    .eq('course_id', courseId);
    
  if (punchesError) {
    console.error('Error fetching punches:', punchesError);
    return { course, punches: [], quizzes: [] };
  }
  
  const { data: quizzes, error: quizzesError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('course_id', courseId);

  if (quizzesError) {
    console.error('Error fetching quizzes:', quizzesError);
    return { course, punches: punches || [], quizzes: [] };
  }

  const punchIds = punches.map(p => p.id);
  const { data: punchRecords } = await supabase
    .from('punch_records')
    .select('punch_id')
    .in('punch_id', punchIds)
    .eq('user_id', user.id);
  
  const completedPunchIds = new Set(punchRecords?.map(pr => pr.punch_id));

  const punchesWithStatus = punches.map(punch => {
    const isComplete = completedPunchIds.has(punch.id);
    const isOverdue = punch.due_date ? new Date(punch.due_date) < new Date() && !isComplete : false;
    let status: 'complete' | 'overdue' | 'todo' = 'todo';
    if (isComplete) {
      status = 'complete';
    } else if (isOverdue) {
      status = 'overdue';
    }
    return { ...punch, status };
  });

  // Get quiz attempts for each quiz
  const quizzesWithAttempts = [];
  if (quizzes && quizzes.length > 0) {
    for (const quiz of quizzes) {
      const attempts = await getQuizAttempts(quiz.id, user.id);
      // Load quiz questions to get total question count
      let totalQuestions = 0;
      if (quiz.file_path) {
        const questions = await getQuizQuestions(quiz.file_path);
        totalQuestions = questions ? questions.length : 0;
      }
      quizzesWithAttempts.push({
        ...quiz,
        attempts,
        totalQuestions
      });
    }
  }

  // Combine punches and quizzes into a single array
  const allItems = [
    ...punchesWithStatus.map(punch => ({
      ...punch,
      type: 'punch' as const,
      title: punch.topic,
    })),
    ...quizzesWithAttempts.map(quiz => ({
      ...quiz,
      type: 'quiz' as const,
    }))
  ];

  // Sort by due date (earliest first)
  allItems.sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return { course, items: allItems, punches: punchesWithStatus, quizzes: quizzesWithAttempts };
}

export async function getQuizQuestions(filePath: string) {
  noStore();
  try {
    const fullPath = path.join(process.cwd(), filePath);
    console.log('Attempting to load quiz from:', fullPath);
    console.log('Working directory:', process.cwd());
    console.log('File path parameter:', filePath);
    
    // Check if file exists
    try {
      await fs.access(fullPath);
      console.log('File exists at:', fullPath);
    } catch (accessError) {
      console.error('File does not exist at:', fullPath);
      
      // Try different possible paths
      const altPaths = [
        path.join(process.cwd(), 'public', filePath),
        path.join(process.cwd(), 'src', filePath),
        path.join(__dirname, '..', '..', '..', filePath),
      ];
      
      for (const altPath of altPaths) {
        try {
          await fs.access(altPath);
          console.log('Found file at alternative path:', altPath);
          const data = await fs.readFile(altPath, 'utf8');
          return JSON.parse(data);
        } catch (e) {
          console.log('Not found at:', altPath);
        }
      }
      
      throw accessError;
    }
    
    const data = await fs.readFile(fullPath, 'utf8');
    console.log('Successfully loaded quiz data, length:', data.length);
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load quiz data from local path:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      code: (error as any)?.code,
      path: (error as any)?.path
    });
    return null;
  }
}

export async function completePunch(taskId: number) {
  'use server';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to punch in.' };
  }

  const { error } = await supabase
    .from('punch_records')
    .insert({
      punch_id: taskId,
      user_id: user.id,
    });

  if (error) {
    console.error('Error punching in:', error);
    if (error.code === '23505') { // Unique constraint violation
      return { error: 'You have already punched in for this task.' };
    }
    return { error: 'Failed to punch in. Please try again.' };
  }

  return { success: 'Successfully punched in!' };
}

export async function getQuizAttempts(quizId: number, userId: string) {
  noStore();
  const supabase = await createClient();
  
  const { data: attempts, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('quiz_id', quizId)
    .eq('user_id', userId)
    .order('score', { ascending: false });

  if (error) {
    console.error('Error fetching quiz attempts:', error);
    return [];
  }

  return attempts || [];
}

export async function submitQuizAttempt(quizId: number, score: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({
      quiz_id: quizId,
      user_id: user.id,
      score: score
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting quiz attempt:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}