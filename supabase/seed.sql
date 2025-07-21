-- Supabase Seed Script

-- Clean up existing data in correct order (respecting foreign key constraints)
-- Delete all existing seed data to ensure clean state
DELETE FROM quiz_attempts;
DELETE FROM quizzes;
DELETE FROM punch_records;
DELETE FROM punches;
DELETE FROM course_members;
DELETE FROM courses WHERE creator_id = '599f1a13-4096-48d5-b495-1e367b6b585d' OR id IN (1, 2, 3);
DELETE FROM public.profiles WHERE id = '599f1a13-4096-48d5-b495-1e367b6b585d';
DELETE FROM auth.users WHERE email = 'seed-user@example.com';

-- 1. Create a specific user for seeding data
-- This user is not intended for interactive login.
INSERT INTO auth.users (id, email, encrypted_password, role)
VALUES ('599f1a13-4096-48d5-b495-1e367b6b585d', 'seed-user@example.com', crypt('password123', gen_salt('bf')), 'authenticated')
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  role = EXCLUDED.role;

-- The trigger automatically creates a profile. We can update it with a specific username.
INSERT INTO public.profiles (id, username, email)
VALUES ('599f1a13-4096-48d5-b495-1e367b6b585d', 'Test User', 'seed-user@example.com')
ON CONFLICT (id) DO UPDATE SET 
  username = EXCLUDED.username,
  email = EXCLUDED.email;

-- 2. Create Courses
-- Assign creator_id to the user created above.
INSERT INTO public.courses (id, name, short_description, description, creator_id, visibility, pass_rate_threshold, resources)
VALUES
  (1, 
  'CS 336: 从0构建大模型', 
  'A hardcode course to build a language model from scratch.', 
  'Language models serve as the cornerstone of modern natural language processing (NLP) applications and open up a new paradigm of having a single general purpose system address a range of downstream tasks. As the field of artificial intelligence (AI), machine learning (ML), and NLP continues to grow, possessing a deep understanding of language models becomes essential for scientists and engineers alike. This course is designed to provide students with a comprehensive understanding of language models by walking them through the entire process of developing their own. Drawing inspiration from operating systems courses that create an entire operating system from scratch, we will lead students through every aspect of language model creation, including data collection and cleaning for pre-training, transformer model construction, model training, and evaluation before deployment.', 
  '599f1a13-4096-48d5-b495-1e367b6b585d', 'public', 0.8, '[{"title": "Course Website", "url": "https://stanford-cs336.github.io/spring2025/"}]'),
  (2, 'AgentX: AI Agents', 'A course on building intelligent agents.', 'Sharing knowledge about AI agents.', '599f1a13-4096-48d5-b495-1e367b6b585d', 'public', 0.9, null),
  (3, 'RL: Reinforcement Learning', 'Learn the fundamentals of RL.', 'Sharing knowledge about reinforcement learning.', null, 'public', 0.75, null)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  creator_id = EXCLUDED.creator_id,
  visibility = EXCLUDED.visibility,
  pass_rate_threshold = EXCLUDED.pass_rate_threshold,
  resources = EXCLUDED.resources;

-- 3. Create Course Memberships
-- Make the user an owner of Course 1 and a member of Course 2.
-- They will not be a member of Course 3.
INSERT INTO public.course_members (course_id, user_id)
VALUES
  (1, '599f1a13-4096-48d5-b495-1e367b6b585d'),
  (2, '599f1a13-4096-48d5-b495-1e367b6b585d')
ON CONFLICT (course_id, user_id) DO NOTHING;

-- 4. Create Punches for "CS 336" Course
-- Due dates are set to every Sunday at 11:00 PM PT, starting from July 27, 2025.
INSERT INTO public.punches (id, course_id, topic, due_date)
VALUES
  (1, 1, 'Lecture 1: Overview, tokenization', '2025-07-27 23:00:00-07'),
  (2, 1, 'Lecture 2: PyTorch, resource accounting', '2025-08-03 23:00:00-07'),
  (3, 1, 'Lecture 3: Architectures, hyperparameters', '2025-08-10 23:00:00-07'),
  (4, 1, 'Lecture 4: Mixture of expert', '2025-08-17 23:00:00-07'),
  (5, 1, 'Lecture 5: GPUs', '2025-08-24 23:00:00-07'),
  (6, 1, 'Lecture 6: Kernels, Triton', '2025-08-31 23:00:00-07'),
  (7, 1, 'Lecture 7: Parallelism', '2025-09-07 23:00:00-07'),
  (8, 1, 'Lecture 8: Parallelism', '2025-09-14 23:00:00-07'),
  (9, 1, 'Lecture 9: Scaling laws', '2025-09-21 23:00:00-07'),
  (10, 1, 'Lecture 10: Inference', '2025-09-28 23:00:00-07'),
  (11, 1, 'Lecture 11: Scaling laws', '2025-10-05 23:00:00-07'),
  (12, 1, 'Lecture 12: Evaluation', '2025-10-12 23:00:00-07'),
  (13, 1, 'Lecture 13: Data', '2025-10-19 23:00:00-07'),
  (14, 1, 'Lecture 14: Data', '2025-10-26 23:00:00-07'),
  (15, 1, 'Lecture 15: Alignment - SFT/RLHF', '2025-11-02 23:00:00-07'),
  (16, 1, 'Lecture 16: Alignment - RL', '2025-11-09 23:00:00-08'), -- Note: PT changes to PST
  (17, 1, 'Lecture 17: Alignment - RL', '2025-11-16 23:00:00-08'),
  (18, 1, 'Lecture 18: Guest Lecture by Junyang Lin', '2025-11-23 23:00:00-08'),
  (19, 1, 'Lecture 19: Guest lecture by Mike Lewis', '2025-11-30 23:00:00-08')
ON CONFLICT (id) DO UPDATE SET 
  course_id = EXCLUDED.course_id,
  topic = EXCLUDED.topic,
  due_date = EXCLUDED.due_date;

-- 5. Create a Quiz for the "CS 336" Course
-- The due date is set to 11:01 PM on the first Sunday.
-- The file_path now references the local quiz file structure.
INSERT INTO public.quizzes (id, course_id, title, description, due_date, file_path)
VALUES
  (1, 1, 'Week 1 Quiz', 'A quiz on the first week''s lecture on tokenization.', '2025-07-27 23:01:00-07', 'quiz/cs336/week1.json')
ON CONFLICT (id) DO UPDATE SET 
  course_id = EXCLUDED.course_id,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  due_date = EXCLUDED.due_date,
  file_path = EXCLUDED.file_path;

-- Reset sequences to prevent primary key conflicts if we re-run the seed.
SELECT setval('courses_id_seq', (SELECT COALESCE(MAX(id), 0) FROM courses), true);
SELECT setval('punches_id_seq', (SELECT COALESCE(MAX(id), 0) FROM punches), true);
SELECT setval('quizzes_id_seq', (SELECT COALESCE(MAX(id), 0) FROM quizzes), true);
SELECT setval('course_members_id_seq', (SELECT COALESCE(MAX(id), 0) FROM course_members), true); 