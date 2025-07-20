import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';
// Course type is implicitly handled by the RPC return type, but we can define it for clarity
interface UserCourse {
  id: number;
  name: string;
  short_description: string;
  completed_punches: number;
  total_punches: number;
}

async function getCourses() {
  console.log("Attempting to get courses...");
  
  // Return early for unauthenticated state without touching Supabase
  try {
    noStore();
    console.log("Creating Supabase client...");
    const supabase = await createClient();
    console.log("Supabase client created successfully.");

    console.log("Attempting to get user...");
    let user = null;
    
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Supabase getUser returned error:", error.message);
        console.log("Returning user not logged in response...");
        const response = { courses: [], error: 'User not logged in' };
        console.log("Response created:", response);
        return response;
      }
      user = data.user;
      console.log("User fetch successful:", user ? user.id : 'No user');
    } catch (authError: unknown) {
      const errorMessage = authError instanceof Error ? authError.message : 'Unknown auth error';
      console.log("Auth error caught:", errorMessage);
      // Any auth error means no valid session - treat as logged out
      return { courses: [], error: 'User not logged in' };
    }

    if (!user) {
      console.log("No user found, returning login state.");
      return { courses: [], error: 'User not logged in' };
    }

    console.log("User authenticated, fetching courses for:", user.id);
    
    try {
      const { data: courses, error } = await supabase.rpc('get_courses_for_user', {
        user_id_param: user.id,
      });

      if (error) {
        console.error('RPC Error:', error);
        return { courses: [], error: 'Failed to fetch courses.' };
      }

      console.log("Successfully fetched courses:", courses ? courses.length : 0);
      return { courses: courses || [], error: null };
    } catch (rpcError: unknown) {
      const errorMessage = rpcError instanceof Error ? rpcError.message : 'Unknown RPC error';
      console.error('RPC Exception:', errorMessage);
      return { courses: [], error: 'Failed to fetch courses.' };
    }

  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.error('!!! TOP LEVEL ERROR !!!', errorMessage);
    // If anything fails, treat as unauthenticated
    return { courses: [], error: 'User not logged in' };
  }
}

export default async function CoursesPage() {
  let courses, error;
  
  try {
    console.log("CoursesPage: Calling getCourses...");
    const result = await getCourses();
    console.log("CoursesPage: getCourses returned:", result);
    courses = result.courses;
    error = result.error;
    console.log("CoursesPage: Extracted courses:", courses?.length || 0, "error:", error);
  } catch (e) {
    console.error("!!! PAGE LEVEL ERROR !!!", e);
    courses = [];
    error = "Unable to load page. Please try again later.";
  }

  console.log("CoursesPage: About to check error condition, error =", error);
  
  if (error === 'User not logged in') {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h1 className="text-4xl font-bold text-gray-800">欢迎来到学霸打卡</h1>
          <p className="text-xl text-gray-600 mt-4">
            请登录以查看您的课程并跟踪您的学习进度。
          </p>
          <Link href="/auth">
            <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
              前往登录
            </button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">我的课程</h1>
          <p className="text-lg text-gray-600 mt-2">
            你已加入的课程都在这里。
          </p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <section>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.map((course: UserCourse) => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">{course.name}</h5>
                    <p className="font-normal text-gray-600">{course.short_description}</p>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-700">
                        进度: {course.completed_punches}/{course.total_punches}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">你还没有加入任何课程。</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
