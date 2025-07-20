# 项目名称: 学霸打卡 (Study-Punch)

## 1. 产品概览

**核心目标**: 帮助用户通过参与课程、完成每周测验来巩固知识。我们旨在解决学习中的两大痛点：“缺少监督”和“学后易忘”。

**核心设计理念**:
- **任务驱动 (Task-Driven)**: 必须通过每周的知识测验才算完成打卡，确保学习效果。
- **进度可视化 (Visualized Progress)**: 以图表等形式清晰展示个人和社区的学习统计数据，激励用户。
- **社区激励 (Community Motivation)**: 在课程内部，所有成员都可以看到彼此的进度，营造积极的同伴压力。

## 2. 核心功能

### 角色体系
每个课程（Course）内有三种角色，一个用户可以在不同课程中担任不同角色：
- **创建者 (Owner)**: 拥有课程的最高权限，可以修改课程设置、管理成员、管理题库，并且可以删除整个课程。
- **组长 (Moderator)**: 拥有除“删除课程”外的所有管理权限。
- **成员 (Member)**: 参与课程，完成每周打卡任务。

### 核心功能列表
- **课程创建与管理 (Owner)**
  - 创建新的课程（Course），可设置为公开或私有（凭邀请码加入）。
  - 设计课程大纲（Syllabus）和日程安排。
  - 管理课程题库（增删改查选择题）。
- **成员打卡与学习 (Member)**
  - 在首页浏览并进入自己参与的所有课程。
  - 完成每周打卡任务（必须答对所有题目）。
  - 如果答错，可查看提示并重做题目。
  - 查看个人以及课程的平均学习统计数据。
- **系统核心功能**
  - **智能提醒 (Notifications)**: 在任务截止前提醒未完成的成员。
  - **数据可视化 (Visualization)**: 将学习进度和统计数据图形化展示。

### 系统自动化
- **定时任务 (Edge Function Cron)**:
  - **每周一 `00:00`**: 为每个课程创建当周的 `weekly_tasks` 记录。
  - **每周日 `20:00`**: 向当周未完成打卡的成员发送提醒邮件。
- **安全策略 (RLS)**: 基于用户在每个课程内的角色 (`owner` | `moderator` | `member`)，严格实施Supabase的行级安全策略。

## 3. 技术栈

- **框架**: Next.js 14 (App Router, RSC, TypeScript)
- **UI & 样式**: Tailwind CSS, shadcn/ui
- **后端即服务 (BaaS)**: Supabase (Auth, Postgres, Realtime, Edge Functions, Storage)
- **图表库**: Recharts
- **端到端测试**: Playwright

## 4. 数据库模式 (SQL优先)

```sql
-- 1. 用户资料表 (与 auth.users 关联)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_url TEXT
);

-- 2. 课程表
CREATE TABLE courses (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  invite_code UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(), -- 用于私有课程
  visibility TEXT NOT NULL DEFAULT 'private', -- 'public' 或 'private'
  pass_rate_threshold NUMERIC(3, 2) NOT NULL DEFAULT 1.00 CHECK (pass_rate_threshold BETWEEN 0.00 AND 1.00),
  creator_id UUID NOT NULL REFERENCES auth.users(id)
);

-- 3. 课程成员与角色表
CREATE TABLE course_members (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'owner', 'moderator', 或 'member'
  UNIQUE (course_id, user_id)
);

-- 4. 题库表
CREATE TABLE questions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- e.g., [{"text": "A", "is_correct": true}, ...]
  explanation TEXT -- 答错时显示的提示
);

-- 5. 每周打卡任务表
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  task_type TEXT NOT NULL, -- 'quiz-multiple-choice', 'punch'
  UNIQUE (course_id, title)
);

-- 6. 打卡记录表
CREATE TABLE punch_records (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  task_id BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score NUMERIC(3, 2) NOT NULL,
  is_passed BOOLEAN NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, user_id)
);
```

**行级安全策略 (RLS) 纲要**:
- `profiles`: 用户只能读写自己的信息。
- `courses`: 所有认证用户可读，只有`owner`可删除，`owner`和`moderator`可修改。
- `course_members`: 用户只能看到自己所属课程的成员列表，只有`owner`和`moderator`可以增删改成员。
- `questions`: 只有同一课程的成员可读，只有`owner`和`moderator`可增删改查。
- `tasks`: 只有同一课程的成员可读。
- `punch_records`: 用户只能读写自己的记录，同一课程的`owner`和`moderator`可以读取所有记录。

## 5. 目录与路由规划

- **`/`**: 应用首页，登录后展示用户参与的所有课程列表。
- **`/login`, `/register`**: 认证页面。
- **`/create-course`**: 创建新课程的页面。
- **`/join-course`**: 通过邀请码加入私有课程的页面。
- **`/all-tasks`**: 展示所有任务的页面。
- **`/weekly-tasks`**: 展示未来7天内到期的任务。
- **`/courses/{courseId}`**: 课程主页，展示该课程的所有任务。
  - **`/courses/{courseId}/intro`**: 课程介绍页面。
  - **`/courses/{courseId}/task/{taskId}`**: 单个任务的答题页面。
  - **`/courses/{courseId}/history`**: 个人在此课程的历史记录。
  - **`/courses/{courseId}/dashboard`**: 课程的共享数据看板。
  - **`/courses/{courseId}/settings`**: 课程管理页面（`owner`和`moderator`访问），包括成员管理、题库管理、课程信息修改。

## 6. 里程碑计划

- **第一周: 项目基础与核心模型**
  - 搭建项目脚手架，集成UI库和Supabase。
  - 实现新的数据库结构和行级安全（RLS）策略。
- **第二周: 认证与课程流程**
  - 实现用户注册、登录。
  - 实现创建课程、通过邀请码加入私有课程的核心流程。
  - 用户登录后，首页能展示其加入的课程列表。
- **第三周: 管理功能**
  - 实现课程设置页面，允许Owner和Moderator管理题库、成员和课程信息。
  - 实现每周任务自动生成器（Edge Function）。
- **第四周: 核心用户体验**
  - 实现完整的每周答题、重做、查看提示的流程。
  - 实现个人历史记录和课程数据看板页面。
- **第五周: 自动化与部署**
  - 实现邮件提醒功能（Edge Function）。
  - 编写E2E测试，并部署到Vercel。

## 7. 本地运行

1. `npx create-next-app@latest study-punch --typescript --tailwind --eslint`
2. 配置 `.env.local` 文件，填入Supabase相关的环境变量。
3. `supabase db push` 将本地SQL schema同步到云端。
4. `npm run dev` 启动开发服务器。

## 8. 后续开发阶段

### 阶段 1 — 项目脚手架 (第 2 次提交)
1. 初始化Next.js项目（使用 `src` 目录）。
2. 集成Tailwind CSS和`shadcn/ui`。
3. 创建Supabase客户端Provider (`/lib/supabase/client.ts`, `/lib/supabase/server.ts`) 和认证守卫组件 (`/components/AuthGuard.tsx`)。
4. 设置基本的App Router布局，包含一个侧边栏。

### 阶段 2 — 数据库与RLS (第 3 次提交)
1. 在 `supabase/migrations/` 目录下创建 `0001_initial_schema.sql` 文件，包含`README.md`中定义的所有DDL。
2. 在同一个文件中，编写并启用所有描述的RLS策略。
3. 提供一个 `supabase/seed.sql` 脚本，用于插入一个示例空间、一个管理员、一个成员和三道例题。

### 阶段 3 — 认证与加入空间 (第 4 次提交)
1. 实现 `/login` 和 `/register` 页面（邮箱密码）。
2. 用户登录后，通过中间件或页面逻辑检查其是否已加入空间。若未加入，则弹窗或跳转页面，要求输入邀请码。
3. 编写一个安全的Supabase RPC函数 `join_room(invite_code uuid)`。

### 阶段 4 — 管理员控制台 (第 5 次提交)
1. 实现 `/admin/questions` 页面，使用表格组件（如`shadcn/ui`的Table）进行题库的CRUD操作。
2. 实现 `/admin/settings` 页面，用于修改空间名称、通关率等。

### 阶段 5 — 任务生成器 (第 6 次提交)
1. 创建Supabase Edge Function `generate-tasks`，逻辑为：为每个`course`在`tasks`表中创建一条记录。
2. 在Supabase后台设置cron job，每日 `00:00` (UTC) 触发此函数。

### 阶段 6 — 成员答题流程 (第 7 次提交)
1. 实现 `/today` 页面，获取当天的任务和所有题目。
2. 创建一个分步或列表式答题组件，在用户重试时，能将题目选项重新排序。
3. 提交时，计算得分，并将结果写入 `punch_records` 表。
4. 根据 `is_passed` 的结果，向用户展示成功或失败的界面。

### 阶段 7 — 看板与历史记录 (第 8 次提交)
1. 创建一个SQL视图 `punch_stats` 用于高效计算连续打卡天数、平均正确率等统计数据。
2. 实现 `/dashboard` 页面，使用Recharts展示空间级别的图表。
3. 实现 `/history` 页面，展示当前用户的个人打卡记录表格。

### 阶段 8 — 提醒功能与E2E测试 (第 9 次提交)
1. 创建Supabase Edge Function `send-reminders`，在每日 `20:00` (UTC) 运行，向当天未打卡的成员发送邮件。
2. 编写Playwright测试，覆盖核心用户流程：注册 -> 加入空间 -> 答题通过 -> 查看历史。

### 阶段 9 — 部署与交接 (第 10 次提交)
1. 在Vercel上配置生产环境变量。
2. 创建 `CONTRIBUTING.md` 文件，简要说明分支策略和PR规范。

## 9. 通用准则
- 严格使用TypeScript的strict模式。
- 提交信息保持清晰、规范，例如 `feat(auth): implement magic link login`。
- 涉及复杂业务逻辑时，优先考虑使用Supabase RPC函数或SQL视图，而非在客户端进行重度计算。
- 严格遵循里程碑计划，除非提出变更。 


# command to seed the database

psql --host=aws-0-us-west-1.pooler.supabase.com --username=postgres.uvslohnshqugtlrqefvf --dbname=postgres -f supabase/seed.sql
