import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getQuizQuestions, submitQuizAttempt } from '@/app/courses/actions';
import QuizPage from '@/components/QuizPage';

export const dynamic = 'force-dynamic';

export default async function Quiz({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const resolvedParams = await params;
  const quizId = parseInt(resolvedParams.quizId, 10);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth');
  }

  // Get quiz data
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select(`
      *,
      courses!inner(name)
    `)
    .eq('id', quizId)
    .single();

  if (quizError || !quiz) {
    notFound();
  }

  // Check if user has access to this quiz (member of the course)
  const { data: membership } = await supabase
    .from('course_members')
    .select('id')
    .eq('course_id', quiz.course_id)
    .eq('user_id', user.id)
    .single();

  if (!membership) {
    notFound();
  }

  // Load quiz questions
  let questions = null;
  if (quiz.file_path) {
    questions = await getQuizQuestions(quiz.file_path);
  }

  if (!questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Available</h1>
          <p className="text-gray-600">Sorry, this quiz is currently unavailable.</p>
        </div>
      </div>
    );
  }

  return (
    <QuizPage 
      quiz={quiz}
      questions={questions}
      courseName={quiz.courses.name}
    />
  );
} 