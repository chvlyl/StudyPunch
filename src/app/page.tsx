'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Award,
  Calendar,
  Target,
  Play,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface UserCourse {
  id: number;
  name: string;
  short_description: string;
  completed_punches: number;
  total_punches: number;
}

interface CourseData {
  courses: UserCourse[];
  error: string | null;
}

const dashboardMetrics = [
  {
    title: "我的课程",
    value: "0",
    change: "本月新增",
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    trend: "up",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "完成任务",
    value: "0",
    change: "今日完成",
    icon: <Target className="h-6 w-6 text-green-600" />,
    trend: "up", 
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "学习时长",
    value: "0h",
    change: "本周累计",
    icon: <Clock className="h-6 w-6 text-purple-600" />,
    trend: "up",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "连续打卡",
    value: "0",
    change: "天",
    icon: <Award className="h-6 w-6 text-orange-600" />,
    trend: "up",
    gradient: "from-orange-500 to-orange-600"
  }
];

export default function CoursesPage() {
  const [courseData, setCourseData] = useState<CourseData>({ courses: [], error: null });
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      try {
        // Get user
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !currentUser) {
          setCourseData({ courses: [], error: 'User not logged in' });
          setIsLoading(false);
          return;
        }

        setUser(currentUser);

        // Get courses
        const { data: courses, error } = await supabase.rpc('get_courses_for_user', {
          user_id_param: currentUser.id,
        });

        setCourseData({
          courses: courses || [],
          error: error?.message || null
        });
      } catch {
        setCourseData({ courses: [], error: 'Failed to load data' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { courses, error } = courseData;

  // Update metrics with real data
  const updatedMetrics = dashboardMetrics.map((metric, index) => {
    const totalCompleted = courses?.reduce((acc, course) => acc + course.completed_punches, 0) || 0;
    
    switch (index) {
      case 0: // 我的课程
        return { ...metric, value: courses?.length.toString() || "0" };
      case 1: // 完成任务
        return { ...metric, value: totalCompleted.toString() };
      case 2: // 学习时长 (估算)
        const estimatedHours = Math.floor((totalCompleted * 30) / 60); // 假设每个任务30分钟
        return { ...metric, value: `${estimatedHours}h` };
      case 3: // 连续打卡 (示例)
        return { ...metric, value: totalCompleted > 0 ? "3" : "0" };
      default:
        return metric;
    }
  });

  if (error === 'User not logged in') {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-8"
          >
            <div className="mb-8">
              <div className="text-8xl mb-6 animate-bounce">📚</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                欢迎来到学霸打卡
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                开启您的学习之旅，追踪学习进度，成为更好的自己
              </p>
            </div>
            
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center gap-3">
                  开始学习之旅
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>
            
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">课程管理</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">任务跟踪</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">进度分析</p>
              </div>
            </div>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="loading-skeleton h-8 w-48 mb-2"></div>
              <div className="loading-skeleton h-5 w-96"></div>
            </div>

            {/* Metrics Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="modern-card p-6">
                  <div className="loading-skeleton h-6 w-6 mb-4 rounded-full"></div>
                  <div className="loading-skeleton h-8 w-16 mb-2"></div>
                  <div className="loading-skeleton h-4 w-20"></div>
                </div>
              ))}
            </div>

            {/* Courses Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="modern-card p-6">
                  <div className="loading-skeleton h-6 w-3/4 mb-3"></div>
                  <div className="loading-skeleton h-4 w-full mb-4"></div>
                  <div className="loading-skeleton h-4 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-card border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    学习仪表盘
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    欢迎回来！继续您的学习之旅
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {user?.email?.split('@')[0] || '学习者'}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date().toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg"
            >
              <strong className="font-medium">错误：</strong> {error}
            </motion.div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {updatedMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="metric-card relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${metric.gradient} rounded-lg shadow-sm`}>
                    {metric.icon}
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{index + 1}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {metric.value}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {metric.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {metric.change}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Courses Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">我的课程</h2>
            <Link href="/find-courses">
              <button className="outline-button group">
                <span className="flex items-center gap-2">
                  寻找更多课程
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </div>

          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link href={`/courses/${course.id}`}>
                    <div className="modern-card p-6 h-full group cursor-pointer hover:shadow-lg">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {course.name}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-2">
                            {course.short_description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            学习进度
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {course.completed_punches}/{course.total_punches}
                          </span>
                        </div>
                        
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${course.total_punches > 0 ? (course.completed_punches / course.total_punches) * 100 : 0}%` 
                            }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className={`text-sm font-medium ${
                            course.completed_punches === course.total_punches 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-blue-600 dark:text-blue-400'
                          }`}>
                            {course.completed_punches === course.total_punches ? '已完成' : '进行中'}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400 group-hover:text-blue-500 transition-colors">
                            <Play className="w-4 h-4" />
                            <span className="text-sm">继续学习</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                还没有课程
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                开始您的学习之旅，添加第一门课程来跟踪您的学习进度
              </p>
              <Link href="/find-courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="modern-button group"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    寻找课程
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
