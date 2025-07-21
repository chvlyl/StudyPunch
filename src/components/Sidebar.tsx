'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calendar, BookCopy, LogOut, User as UserIcon, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Profile } from '@/lib/types';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems = [
  { name: '我的任务', href: '/all-tasks', icon: Calendar },
  { name: '我的课程', href: '/', icon: BookCopy },
  { name: '寻找课程', href: '/find-courses', icon: Search },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.log('Sidebar: Auth error (treating as no user):', error);
        // Treat any auth error as no user logged in
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setLoading(true);
        fetchProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200 w-64">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 cursor-pointer">
          <h1 className="text-xl font-bold text-gray-900">学霸打卡</h1>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User/Logout Section */}
      <div className="p-4 border-t border-gray-200">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center w-full text-left">
              <div className="flex items-center gap-3">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.username}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                    <UserIcon className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <span className="truncate font-semibold text-gray-800">
                  {profile.username}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth" className="flex items-center justify-center w-full p-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            <LogOut className="w-5 h-5 mr-2 transform -rotate-180" />
            登陆
          </Link>
        )}
      </div>
    </div>
  );
} 