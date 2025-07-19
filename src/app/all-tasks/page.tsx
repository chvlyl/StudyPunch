import AppLayout from '@/components/AppLayout';
import PunchCard from '@/components/PunchCard';
import { createClient } from '@/lib/supabase/server';
import { Punch } from '@/lib/types';

interface AllTask extends Punch {
  courseName: string;
  status: 'complete' | 'todo' | 'overdue';
}

export default async function AllTasksPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: tasks, error } = await supabase
    .from('punches')
    .select('*, courses(name)');

  const { data: punchRecords } = await supabase
    .from('punch_records')
    .select('punch_id')
    .eq('user_id', user?.id);

  if (error) {
    return (
      <AppLayout>
        <div className="p-8">
          <p className="text-red-500">Error loading tasks: {error.message}</p>
        </div>
      </AppLayout>
    );
  }

  const completedTaskIds = new Set(punchRecords?.map(r => r.punch_id));

  const allTasks: AllTask[] = tasks?.map(task => {
    const isComplete = completedTaskIds.has(task.id);
    const isOverdue = task.due_date ? new Date(task.due_date) < new Date() && !isComplete : false;
    let status: 'complete' | 'todo' | 'overdue' = 'todo';
    if (isComplete) {
      status = 'complete';
    } else if (isOverdue) {
      status = 'overdue';
    }

    return {
      ...task,
      topic: task.topic, // Add this line
      // @ts-ignore
      courseName: task.courses?.name || 'Unknown Course',
      status,
    }
  }) || [];

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
          <p className="text-lg text-gray-600 mt-2">
            Here is a list of all tasks from all your courses.
          </p>
        </header>

        <div className="space-y-4">
          {allTasks.map((task) => (
            <PunchCard 
              key={task.id} 
              task={task} 
              courseName={task.courseName}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
} 