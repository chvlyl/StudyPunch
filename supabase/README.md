需要按以下步骤来填充数据库：

## 数据库填充步骤：

### 1. 运行数据库迁移（创建表结构）
首先，您需要在 Supabase 控制台中运行迁移文件来创建所有必需的表：

1. 打开您的 Supabase 项目控制台
2. 进入左侧菜单的 **SQL Editor**
3. 复制 `supabase/migrations/0000_consolidated_schema.sql` 文件的全部内容
4. 粘贴到 SQL Editor 中并点击 **Run** 执行

### 2. 填充初始数据
接下来运行种子数据文件来创建示例数据：

1. 在同一个 SQL Editor 中
2. 复制 `supabase/seed.sql` 文件的全部内容  
3. 粘贴并点击 **Run** 执行

### 3. 验证数据填充
执行完成后，您可以在 Supabase 控制台的 **Table Editor** 中查看以下表是否已创建并包含数据：

- `profiles` - 用户资料
- `courses` - 课程（包含 CS 336 等示例课程）
- `course_members` - 课程成员关系
- `punches` - 打卡任务（CS 336 的讲座列表）
- `quizzes` - 测验（包含第一周测验）
- `punch_records` - 打卡记录
- `quiz_attempts` - 测验尝试记录

### 4. 启动应用
完成数据库设置后，回到项目目录运行：

```bash
npm install
npm run dev
```

### 数据库包含的示例数据：
- **CS 336 课程**：从0构建大模型的课程，包含19个讲座的打卡任务
- **AgentX 课程**：AI Agents 相关课程
- **RL 课程**：强化学习基础课程
- **测验系统**：CS 336 第一周测验（文件路径：`quiz/cs336/week1.json`）


## 需要在 Supabase 控制台中启用 Google 认证。
1. 在 Supabase 控制台启用 Google 认证
打开您的 Supabase 项目控制台
进入左侧菜单的 "Authentication"
点击 "Providers" 选项卡
找到 "Google" 提供商并点击启用
2. 配置 Google OAuth
参考: https://supabase.com/docs/guides/auth/social-login/auth-google
启用 Google 提供商后，您需要配置 OAuth 设置：
获取 Google OAuth 凭据：
访问 Google Cloud Console
创建或选择一个项目
启用 Google+ API
创建 OAuth 2.0 客户端 ID
设置授权重定向 URI 为：https://your-project-ref.supabase.co/auth/v1/callback
在 Supabase 中配置：
将 Google 的 Client ID 和 Client Secret 填入 Supabase 的 Google 提供商设置中
