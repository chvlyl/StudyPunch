'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function completePunch(taskId: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'You must be logged in to complete a task.' };
  }

  // Check if a record already exists
  const { data: existingRecord, error: selectError } = await supabase
    .from('punch_records')
    .select('id')
    .eq('task_id', taskId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error('Error checking for existing punch record:', selectError);
    return { error: 'Database error.' };
  }
  
  if (existingRecord) {
    return { error: 'You have already completed this task.' };
  }
  
  // Create a new punch record
  const { error: insertError } = await supabase.from('punch_records').insert({
    task_id: taskId,
    user_id: user.id,
    score: 1.0, // For punch tasks, score is 100%
    is_passed: true,
  });

  if (insertError) {
    console.error('Error creating punch record:', insertError);
    return { error: 'Failed to complete task.' };
  }
  
  // Revalidate the page the user is on
  const headersList = await headers();
  const referer = headersList.get('referer');
  if(referer) {
    const refererPath = new URL(referer).pathname;
    revalidatePath(refererPath);
  }

  return { success: 'Task completed successfully!' };
} 