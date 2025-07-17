# 学霸打卡 (Study-Punch) 开发计划

## 项目概览
基于Next.js 14 + Supabase的课程学习与每周测验打卡工具，分9个阶段进行开发，每个阶段对应一次代码提交。

## 开发进度追踪

### 阶段 0 — 项目文档 (第 1 次提交) ✅
- [x] 创建项目核心文档 README.md
- [x] 定义产品概览和设计理念
- [x] 设计完整的数据库模式
- [x] 制定9个开发阶段的详细计划
- [x] 建立项目的"唯一事实来源"文档
- [x] 初始化git仓库并推送到GitHub

### 阶段 1 — 项目脚手架 (第 2 次提交) ✅
- [x] 初始化Next.js 14项目（使用src目录）
  - [x] 配置TypeScript + Tailwind CSS + ESLint
  - [x] 启用App Router
  - [x] 设置项目基础结构
- [x] 集成shadcn/ui组件库
  - [x] 安装并配置shadcn/ui
  - [x] 创建components.json配置文件
  - [x] 配置Tailwind CSS兼容性
- [x] 创建Supabase客户端配置
  - [x] 安装@supabase/supabase-js和@supabase/ssr
  - [x] 创建src/lib/supabase/client.ts（浏览器端）
  - [x] 创建src/lib/supabase/server.ts（服务器端）
  - [x] 配置开发环境占位符
- [x] 实现认证守卫组件
  - [x] 创建src/components/AuthGuard.tsx
  - [x] 添加开发环境认证绕过逻辑
  - [x] 实现加载状态和错误处理
- [x] 设置基本的App Router布局
  - [x] 创建响应式侧边栏组件(src/components/Sidebar.tsx)
  - [x] 创建应用布局组件(src/components/AppLayout.tsx)
  - [x] 更新主页面(src/app/page.tsx)
  - [x] 配置中文字体和样式
- [x] 创建环境变量模板
- [x] 测试前端网页运行
- [x] 推送代码到GitHub

### 阶段 2 — 数据库与RLS (第 3 次提交) ⏳
- [ ] 设置Supabase项目
  - [ ] 创建新的Supabase项目
  - [ ] 获取项目URL和anon key
  - [ ] 配置本地环境变量
- [ ] 创建数据库迁移文件
  - [ ] 创建supabase/migrations/目录
  - [ ] 创建0001_initial_schema.sql文件
  - [ ] 定义所有6个核心表的DDL
    - [ ] `profiles`表（用户资料）
    - [ ] `courses`表 (课程)
    - [ ] `course_members`表 (课程成员与角色: owner, moderator, member)
    - [ ] `questions`表（题库）
    - [ ] `tasks`表 (任务)
    - [ ] `punch_records`表（打卡记录）
- [ ] 实现行级安全策略(RLS)
  - [ ] 启用所有表的RLS
  - [ ] `profiles`表RLS策略
  - [ ] `courses`表RLS策略
  - [ ] `course_members`表RLS策略
  - [ ] `questions`表RLS策略
  - [ ] `tasks`表RLS策略
  - [ ] `punch_records`表RLS策略
- [ ] 创建种子数据脚本
  - [ ] 创建supabase/seed.sql文件
  - [ ] 插入示例课程、创建者、组长和成员
  - [ ] 插入三道示例题目
- [ ] 测试数据库连接
- [ ] 推送代码到GitHub

### 阶段 3 — 认证与课程流程 (第 4 次提交) ⏳
- [ ] 实现登录/注册页面 (`/login`, `/register`)
- [ ] 实现应用首页 (`/`)，登录后展示用户的所有课程
- [ ] 实现创建课程页面 (`/create-course`)
- [ ] 实现加入私有课程功能
  - [ ] 创建 `/join-course` 页面
  - [ ] 实现邀请码输入界面
- [ ] 创建Supabase RPC函数
  - [ ] 创建 `join_course(invite_code uuid)` 函数
  - [ ] 实现课程加入逻辑并分配 `member` 角色
- [ ] 更新认证守卫
  - [ ] 移除开发环境绕过逻辑
  - [ ] 集成真实的Supabase认证
  - [ ] 验证用户登录状态
- [ ] 测试认证和课程流程
- [ ] 推送代码到GitHub

### 阶段 4 — 课程管理 (第 5 次提交) ⏳
- [ ] 实现课程管理页面 (`/courses/{courseId}/settings`)
- [ ] 实现题库管理功能 (CRUD)
  - [ ] 使用shadcn/ui的Table组件展示题目
  - [ ] 实现题目增删改查
  - [ ] 添加题目表单验证
- [ ] 实现课程设置功能
  - [ ] 实现课程名称、描述等信息修改
  - [ ] 实现通关率设置
  - [ ] 实现邀请码管理
- [ ] 实现成员管理功能
  - [ ] 展示成员列表
  - [ ] 实现成员角色变更 (moderator, member) 和移除
- [ ] 创建课程管理权限检查
  - [ ] 保护管理页面路由，只允许 `owner` 和 `moderator` 访问
- [ ] 测试课程管理功能
- [ ] 推送代码到GitHub

### 阶段 5 — 每周任务生成器 (第 6 次提交) ⏳
- [ ] 创建Supabase Edge Function
  - [ ] 创建 `supabase/functions/generate-weekly-tasks/index.ts`
  - [ ] 实现每周为每个 `course` 创建 `tasks` 记录的逻辑
  - [ ] 添加错误处理和日志记录
- [ ] 配置定时任务 (Cron Job)
  - [ ] 在Supabase后台设置cron job
  - [ ] 配置每周一 00:00 UTC 触发
- [ ] 测试定时任务执行
- [ ] 本地测试Edge Function
- [ ] 推送代码到GitHub

### 阶段 6 — 成员答题流程 (第 7 次提交) ⏳
- [ ] 实现课程任务列表页面 (`/courses/{courseId}`)
  - [ ] 获取当周任务和所有题目
  - [ ] 展示任务概览信息
- [ ] 创建答题组件 (`/courses/{courseId}/task/{taskId}`)
  - [ ] 实现题目展示和选项选择
  - [ ] 实现答错后查看提示功能
  - [ ] 在重做时重新排序题目选项
- [ ] 实现评分与提交
  - [ ] 创建答题提交逻辑
  - [ ] 实现实时评分，判断是否通过
  - [ ] 将结果写入 `punch_records` 表
- [ ] 创建结果展示页面
  - [ ] 实现通过/失败界面
  - [ ] 添加重做（re-challenge）功能
- [ ] 测试答题流程
- [ ] 推送代码到GitHub

### 阶段 7 — 看板与历史记录 (第 8 次提交) ⏳
- [ ] 创建统计视图
  - [ ] 创建 `course_stats` SQL视图
  - [ ] 计算连续打卡周数、平均正确率、成员排名等
- [ ] 实现数据看板页面 (`/courses/{courseId}/dashboard`) (dummy data implemented)
  - [ ] 安装并配置Recharts
  - [ ] 展示课程级别的图表 (如社区平均分)
  - [ ] 添加成员进度对比
- [ ] 实现个人历史记录页面 (`/courses/{courseId}/history`) (dummy data implemented)
  - [ ] 展示个人在当前课程的打卡记录表格
  - [ ] 添加筛选和排序功能
- [ ] 测试看板与历史记录功能
- [ ] 推送代码到GitHub

### 阶段 8 — 提醒功能与E2E测试 (第 9 次提交) ⏳
- [ ] 创建提醒Edge Function
  - [ ] 创建 `supabase/functions/send-reminders/index.ts`
  - [ ] 实现查找当周未打卡成员的逻辑
  - [ ] 集成邮件服务并实现发送逻辑
- [ ] 配置提醒定时任务
  - [ ] 设置每周日 20:00 UTC 触发
  - [ ] 测试提醒功能
- [ ] 编写E2E测试 (Playwright)
  - [ ] 编写核心流程测试: 注册 -> 创建课程 -> 加入课程 -> 答题 -> 查看历史
- [ ] 运行完整测试套件
- [ ] 推送代码到GitHub

### 阶段 9 — 部署与交接 (第 10 次提交) ⏳
- [ ] 配置生产环境
  - [ ] 在Vercel创建项目
  - [ ] 配置环境变量
  - [ ] 连接GitHub仓库
  - [ ] 配置自动部署
- [ ] 生产环境测试
  - [ ] 验证所有功能正常
  - [ ] 测试数据库连接
  - [ ] 测试Edge Functions
  - [ ] 性能测试
- [ ] 创建项目文档
  - [ ] 创建CONTRIBUTING.md
  - [ ] 说明分支策略
  - [ ] 说明PR规范
  - [ ] 添加部署说明
- [ ] 项目交接
  - [ ] 整理项目文档
  - [ ] 创建使用说明
  - [ ] 记录已知问题
- [ ] 最终提交
- [ ] 推送代码到GitHub

## 里程碑时间规划

- **Day 1-3**: 阶段1-2 (项目初始化与数据库)
- **Day 4-6**: 阶段3 (认证与课程核心流程)
- **Day 7-9**: 阶段4-5 (课程管理与任务生成)
- **Day 10-12**: 阶段6-7 (成员核心流程与看板)
- **Day 13-14**: 阶段8-9 (自动化、测试与部署)

## 当前状态
- ✅ 阶段 0: 项目文档已完成
- ✅ 阶段 1: 项目脚手架已完成
- ⏳ 阶段 2: 数据库与RLS (进行中)

## 注意事项
- 每完成一个阶段都要进行代码提交
- 严格按照TypeScript strict模式开发
- 优先使用Supabase RPC函数处理复杂业务逻辑
- 保持代码提交信息清晰规范
