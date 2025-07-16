# 学霸打卡 (Study-Punch) 开发计划

## 项目概览
基于Next.js 14 + Supabase的学习小组日常测验打卡工具，分9个阶段进行开发，每个阶段对应一次代码提交。

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
    - [ ] profiles表（用户资料）
    - [ ] rooms表（学习空间）
    - [ ] room_members表（空间成员与角色）
    - [ ] questions表（题库）
    - [ ] daily_tasks表（每日任务）
    - [ ] punch_records表（打卡记录）
- [ ] 实现行级安全策略(RLS)
  - [ ] 启用所有表的RLS
  - [ ] profiles表RLS策略
  - [ ] rooms表RLS策略
  - [ ] room_members表RLS策略
  - [ ] questions表RLS策略
  - [ ] daily_tasks表RLS策略
  - [ ] punch_records表RLS策略
- [ ] 创建种子数据脚本
  - [ ] 创建supabase/seed.sql文件
  - [ ] 插入示例学习空间
  - [ ] 插入管理员和成员用户
  - [ ] 插入三道示例题目
- [ ] 测试数据库连接
- [ ] 推送代码到GitHub

### 阶段 3 — 认证与加入空间 (第 4 次提交) ⏳
- [ ] 实现登录注册页面
  - [ ] 创建src/app/login/page.tsx
  - [ ] 创建src/app/register/page.tsx
  - [ ] 实现邮箱密码登录
  - [ ] 实现用户注册功能
  - [ ] 添加表单验证
- [ ] 实现加入空间功能
  - [ ] 创建src/app/join-room/page.tsx
  - [ ] 实现邀请码输入界面
  - [ ] 创建用户空间检查逻辑
  - [ ] 实现自动重定向逻辑
- [ ] 创建Supabase RPC函数
  - [ ] 创建join_room(invite_code uuid)函数
  - [ ] 实现空间加入逻辑
  - [ ] 添加角色分配逻辑
- [ ] 更新认证守卫
  - [ ] 移除开发环境绕过逻辑
  - [ ] 集成真实的Supabase认证
  - [ ] 添加空间成员身份验证
- [ ] 测试认证流程
- [ ] 推送代码到GitHub

### 阶段 4 — 管理员控制台 (第 5 次提交) ⏳
- [ ] 实现题库管理页面
  - [ ] 创建src/app/admin/questions/page.tsx
  - [ ] 使用shadcn/ui的Table组件
  - [ ] 实现题目列表展示
  - [ ] 实现题目增删改查功能
  - [ ] 添加题目表单验证
- [ ] 实现空间设置页面
  - [ ] 创建src/app/admin/settings/page.tsx
  - [ ] 实现空间名称修改
  - [ ] 实现通关率设置
  - [ ] 实现邀请码管理
- [ ] 创建管理员权限检查
  - [ ] 实现管理员路由保护
  - [ ] 添加权限验证中间件
- [ ] 优化管理员界面
  - [ ] 添加操作确认对话框
  - [ ] 实现批量操作
  - [ ] 添加操作结果提示
- [ ] 测试管理员功能
- [ ] 推送代码到GitHub

### 阶段 5 — 每日任务生成器 (第 6 次提交) ⏳
- [ ] 创建Supabase Edge Function
  - [ ] 创建supabase/functions/generate-daily-tasks/index.ts
  - [ ] 实现每日任务生成逻辑
  - [ ] 为每个room创建daily_tasks记录
  - [ ] 添加错误处理和日志记录
- [ ] 配置定时任务
  - [ ] 在Supabase后台设置cron job
  - [ ] 配置每日00:00 UTC触发
  - [ ] 测试定时任务执行
- [ ] 创建任务状态检查
  - [ ] 实现任务重复创建检查
  - [ ] 添加任务状态监控
- [ ] 本地测试Edge Function
  - [ ] 使用Supabase CLI测试
  - [ ] 验证函数正常执行
- [ ] 推送代码到GitHub

### 阶段 6 — 成员答题流程 (第 7 次提交) ⏳
- [ ] 实现今日任务页面
  - [ ] 创建src/app/today/page.tsx
  - [ ] 获取当天任务和题目
  - [ ] 展示任务概览信息
- [ ] 创建答题组件
  - [ ] 创建答题界面组件
  - [ ] 实现分步或列表式答题
  - [ ] 添加选项重新排序功能
  - [ ] 实现答题进度显示
- [ ] 实现评分系统
  - [ ] 创建答题提交逻辑
  - [ ] 实现实时评分计算
  - [ ] 判断是否通过门槛
- [ ] 创建结果展示页面
  - [ ] 实现通过/失败界面
  - [ ] 添加重新挑战功能
  - [ ] 显示详细得分情况
- [ ] 数据持久化
  - [ ] 将结果写入punch_records表
  - [ ] 实现答题历史记录
- [ ] 测试答题流程
- [ ] 推送代码到GitHub

### 阶段 7 — 看板与历史记录 (第 8 次提交) ⏳
- [ ] 创建统计视图
  - [ ] 创建punch_stats SQL视图
  - [ ] 计算连续打卡天数
  - [ ] 计算平均正确率
  - [ ] 实现成员排名统计
- [ ] 实现数据看板页面
  - [ ] 创建src/app/dashboard/page.tsx
  - [ ] 安装并配置Recharts
  - [ ] 实现空间级别图表展示
  - [ ] 添加成员进度对比
- [ ] 实现历史记录页面
  - [ ] 创建src/app/history/page.tsx
  - [ ] 展示个人打卡记录表格
  - [ ] 添加筛选和排序功能
  - [ ] 实现分页显示
- [ ] 优化数据展示
  - [ ] 添加实时数据更新
  - [ ] 实现数据加载状态
  - [ ] 添加空状态处理
- [ ] 测试看板功能
- [ ] 推送代码到GitHub

### 阶段 8 — 提醒功能与E2E测试 (第 9 次提交) ⏳
- [ ] 创建提醒Edge Function
  - [ ] 创建supabase/functions/send-reminders/index.ts
  - [ ] 实现邮件发送逻辑
  - [ ] 查找当天未打卡成员
  - [ ] 集成邮件服务提供商
- [ ] 配置提醒定时任务
  - [ ] 设置每日20:00 UTC触发
  - [ ] 测试提醒功能
- [ ] 编写E2E测试
  - [ ] 安装配置Playwright
  - [ ] 编写用户注册测试
  - [ ] 编写加入空间测试
  - [ ] 编写答题通过测试
  - [ ] 编写查看历史测试
- [ ] 创建测试数据
  - [ ] 准备测试环境
  - [ ] 创建测试用户和空间
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

- **Day 1-3**: 阶段1-2 (项目初始化与认证)
- **Day 4-6**: 阶段3 (认证与空间加入)
- **Day 7-9**: 阶段4-5 (管理员核心功能)
- **Day 10-12**: 阶段6-7 (成员核心流程与看板)
- **Day 13-14**: 阶段8-9 (自动化与测试)

## 当前状态
- ✅ 阶段 0: 项目文档已完成
- ✅ 阶段 1: 项目脚手架已完成
- ⏳ 阶段 2: 数据库与RLS (进行中)

## 注意事项
- 每完成一个阶段都要进行代码提交
- 严格按照TypeScript strict模式开发
- 优先使用Supabase RPC函数处理复杂业务逻辑
- 保持代码提交信息清晰规范 