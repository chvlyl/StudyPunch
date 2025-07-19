'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';

export async function getCoursesWithEnrollmentStatus() {
  noStore();
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { courses: [], enrolledCourseIds: new Set() };
  }

  // Fetch all public courses
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, name, short_description')
    .eq('visibility', 'public');

  if (coursesError) {
    console.error("Error fetching courses:", coursesError);
    return { courses: [], enrolledCourseIds: new Set() };
  }

  // Fetch all of the user's current enrollments
  const { data: userMemberships, error: membershipsError } = await supabase
    .from('course_members')
    .select('course_id')
    .eq('user_id', user.id);

  if (membershipsError) {
    console.error("Error fetching user memberships:", membershipsError);
    return { courses: courses ?? [], enrolledCourseIds: new Set() };
  }

  const enrolledCourseIds = new Set(userMemberships.map(m => m.course_id));

  return { courses: courses ?? [], enrolledCourseIds };
}

export async function enrollInCourse(courseId: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to enroll.' };
  }

  // Prevent duplicate enrollment
  const { data: existingMembership, error: checkError } = await supabase
    .from('course_members')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle();

  if (checkError) {
    console.error('Error checking enrollment:', checkError);
    return { error: 'Database error while checking enrollment.' };
  }

  if (existingMembership) {
    return { error: 'You are already enrolled in this course.' };
  }

  // Enroll the user
  const { error: insertError } = await supabase
    .from('course_members')
    .insert({ user_id: user.id, course_id: courseId });

  if (insertError) {
    console.error('Error enrolling in course:', insertError);
    return { error: 'Failed to enroll in the course.' };
  }
  
  revalidatePath('/find-courses');
  return { success: 'Successfully enrolled!' };
} 