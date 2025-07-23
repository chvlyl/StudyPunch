'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  BookOpen,
  Target,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

interface Task {
  id: number;
  topic: string;
  description: string;
  due_date: string;
  courses: {
    name: string;
  };
}

interface TaskWithStatus extends Task {
  type: 'punch';
  title: string;
  status: 'complete' | 'todo' | 'overdue';
}

export default function AllTasksPage() {
  const [tasks, setTasks] = useState<TaskWithStatus[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'todo' | 'complete' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      try {
        // Get user
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        if (userError || !currentUser) {
          router.push('/auth');
          return;
        }
        setUser(currentUser);

        // Get tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('punches')
          .select('*, courses(name)');

        if (tasksError) {
          setError(`加载任务失败: ${tasksError.message}`);
          setIsLoading(false);
          return;
        }

        // Get punch records
        const { data: punchRecords } = await supabase
          .from('punch_records')
          .select('punch_id')
          .eq('user_id', currentUser.id);

        const completedTaskIds = new Set(punchRecords?.map(r => r.punch_id) || []);

        // Process tasks with status
        const processedTasks: TaskWithStatus[] = (tasksData || []).map((task: Task) => {
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
            type: 'punch',
            title: task.topic,
            status,
          };
        });

        setTasks(processedTasks);
      } catch {
        setError('加载数据失败，请刷新重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Filter and search logic
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.courses?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'complete').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
  };

  const getStatusIcon = (status: 'complete' | 'todo' | 'overdue') => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: 'complete' | 'todo' | 'overdue') => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'overdue':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '无截止日期';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="modern-card p-6">
                  <div className="loading-skeleton h-6 w-6 mb-4 rounded-full"></div>
                  <div className="loading-skeleton h-8 w-16 mb-2"></div>
                  <div className="loading-skeleton h-4 w-20"></div>
                </div>
              ))}
            </div>

            {/* Tasks Skeleton */}
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="modern-card p-6">
                  <div className="loading-skeleton h-6 w-3/4 mb-3"></div>
                  <div className="loading-skeleton h-4 w-full mb-4"></div>
                  <div className="loading-skeleton h-4 w-1/3"></div>
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
        {/* Header */}
        <div className="bg-white dark:bg-card border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    所有任务
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    管理和跟踪您的学习任务进度
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {user?.email?.split('@')[0] || '学习者'}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {filteredTasks.length} 个任务
                </span>
              </div>
            </motion.div>
          </div>
        </div>

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

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: '总任务', value: stats.total, icon: <BookOpen className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
              { title: '已完成', value: stats.completed, icon: <CheckCircle2 className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
              { title: '待完成', value: stats.todo, icon: <Clock className="w-5 h-5" />, color: 'from-yellow-500 to-yellow-600' },
              { title: '已逾期', value: stats.overdue, icon: <AlertCircle className="w-5 h-5" />, color: 'from-red-500 to-red-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="metric-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg text-white shadow-sm`}>
                    {stat.icon}
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索任务或课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                {[
                  { key: 'all', label: '全部' },
                  { key: 'todo', label: '待办' },
                  { key: 'complete', label: '已完成' },
                  { key: 'overdue', label: '逾期' },
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key as 'all' | 'todo' | 'complete' | 'overdue')}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      filter === filterOption.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks List */}
          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className="modern-card p-6 hover:shadow-lg group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(task.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(task.status)}`}>
                          {task.status === 'complete' ? '已完成' : task.status === 'overdue' ? '已逾期' : '待完成'}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {task.description || '暂无描述'}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {task.courses?.name || '未知课程'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {formatDate(task.due_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <Target className="w-12 h-12 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {filter === 'all' ? '还没有任务' : `没有${filter === 'todo' ? '待完成' : filter === 'complete' ? '已完成' : '逾期'}的任务`}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {filter === 'all' ? '当您加入课程后，任务将会显示在这里' : '尝试切换其他筛选条件'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 