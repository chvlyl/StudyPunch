'use server'

import { createClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation';

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
    return { course: null, tasks: [] };
  }

  const { data: tasks, error: tasksError } = await supabase
    .from('punches')
    .select('*')
    .eq('course_id', courseId);

  if (tasksError) {
    console.error('Error fetching tasks:', tasksError);
    return { course, tasks: [] };
  }

  const taskIds = tasks.map(t => t.id);
  const { data: punchRecords } = await supabase
    .from('punch_records')
    .select('punch_id')
    .in('punch_id', taskIds)
    .eq('user_id', user.id);
  
  const completedTaskIds = new Set(punchRecords?.map(pr => pr.punch_id));

  const tasksWithStatus = tasks.map(task => {
    const isComplete = completedTaskIds.has(task.id);
    const isOverdue = task.due_date ? new Date(task.due_date) < new Date() && !isComplete : false;
    let status: 'complete' | 'overdue' | 'todo' = 'todo';
    if (isComplete) {
      status = 'complete';
    } else if (isOverdue) {
      status = 'overdue';
    }
    return { ...task, status };
  });

  return { course, tasks: tasksWithStatus };
}

export async function completePunch(taskId: number) {
  'use server';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to punch in.' };
  }

  const { data, error } = await supabase
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