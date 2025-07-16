# 项目名称: 学霸打卡 (Study-Punch)

## 1. 产品概览

**核心目标**: 帮助小型学习小组巩固在线课程视频内容。我们通过强制成员每天回答**所有**相关的选择题，并将"通过测验"作为打卡成功的唯一标准，来解决"学完就忘"和"缺少外部监督"的核心痛点。

**核心设计理念**:
- **先测后卡 (Answer-to-Pass)**: 简单的"签到"没有意义，必须通过知识检验才算数。
- **公开透明 (Public Transparency)**: 所有成员都能看到彼此的打卡状态和学习进度，营造积极的同伴压力。
- **轻度游戏化 (Lightweight Gamification)**: 通过连续打卡记录等方式激励成员保持习惯。

## 2. 核心功能 (MVP)

### 管理员 (Admin)
- **创建学习空间 (Room)**: 可以创建独立的学习空间，设置名称、起止日期和通关所需的最低正确率。
- **题库管理 (CRUD)**: 在空间内，增删改查完整的题库（选择题），MVP阶段不设随机抽题。
- **自动生成任务**: 系统在每日零点，自动使用题库中的**所有题目**为当天创建一个新的打卡任务。
- **共享数据看板**: 与成员看到同样的数据看板，了解整体进度。

### 普通成员 (Member)
- **注册/登录**: 支持邮箱密码或魔法链接 (Magic Link) 登录。
- **加入空间**: 通过邀请码加入一个特定的学习空间。
- **今日任务**: 首页清晰展示"今日打卡任务"，点击后进入答题流程。
- **答题与即时反馈**: 必须答完所有题目后提交，系统立即评分。只有正确率达到门槛才算通过；否则可重新挑战（选项会重新排序）。
- **个人历史**: 查看自己所有的打卡记录（日期、得分、是否通过）。
- **共享数据看板**: 查看整个空间的打卡统计，如成员的连续打卡天数、平均正确率等。

### 系统自动化
- **定时任务 (Edge Function Cron)**:
  - 每日 `00:00` 创建当天的 `daily_tasks` 记录。
  - 每日 `20:00` 向当天未完成打卡的成员发送提醒邮件。
- **安全策略 (RLS)**: 基于用户在每个空间内的角色（`admin` | `member`），严格实施Supabase的行级安全策略。

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

-- 2. 学习空间表
CREATE TABLE rooms (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  invite_code UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  pass_rate_threshold NUMERIC(3, 2) NOT NULL DEFAULT 0.80 CHECK (pass_rate_threshold BETWEEN 0.00 AND 1.00),
  creator_id UUID NOT NULL REFERENCES auth.users(id)
);

-- 3. 空间成员与角色表
CREATE TABLE room_members (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'admin' or 'member'
  UNIQUE (room_id, user_id)
);

-- 4. 题库表
CREATE TABLE questions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- e.g., [{"text": "A", "is_correct": true}, ...]
  explanation TEXT
);

-- 5. 每日打卡任务表
CREATE TABLE daily_tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  task_date DATE NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE (room_id, task_date)
);

-- 6. 打卡记录表
CREATE TABLE punch_records (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  task_id BIGINT NOT NULL REFERENCES daily_tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score NUMERIC(3, 2) NOT NULL,
  is_passed BOOLEAN NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, user_id)
);
```

**行级安全策略 (RLS) 纲要**:
- `profiles`: 用户只能读写自己的信息。
- `rooms`: 所有认证用户可读，只有创建者可修改。
- `room_members`: 用户只能看到自己所属空间的成员列表，只有admin可以增删成员。
- `questions`: 只有同一空间的成员可读，只有admin可增删改查。
- `daily_tasks`: 只有同一空间的成员可读。
- `punch_records`: 用户只能读写自己的记录，同一空间的admin可以读取所有记录。

## 5. 目录与路由规划

- `/login`, `/register`: 认证页面
- `/join-room`: 用户登录后若无空间，则跳转至此页输入邀请码
- `/today`: 当日打卡任务页面
- `/history`: 个人历史记录
- `/dashboard`: 共享数据看板
- `/admin/*`: 管理员后台，包含 `/admin/questions`, `/admin/settings` 等

## 6. 里程碑计划 (14天)

- **Day 1-3: 项目初始化与认证**
  - 完成阶段1和2，搭建好项目基础，实现数据库结构和RLS。
- **Day 4-6: 认证与空间加入**
  - 完成阶段3，实现完整的注册、登录、凭邀请码加入空间的流程。
- **Day 7-9: 管理员核心功能**
  - 完成阶段4和5，实现题库管理、空间设置和每日任务自动生成。
- **Day 10-12: 成员核心流程与看板**
  - 完成阶段6和7，实现完整的答题流程、个人历史和共享数据看板。
- **Day 13-14: 自动化与测试**
  - 完成阶段8和9，实现邮件提醒功能，编写E2E测试，并部署到Vercel。

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

### 阶段 5 — 每日任务生成器 (第 6 次提交)
1. 创建Supabase Edge Function `generate-daily-tasks`，逻辑为：为每个`room`在`daily_tasks`表中创建一条记录。
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