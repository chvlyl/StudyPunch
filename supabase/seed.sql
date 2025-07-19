-- Supabase Seed Script

-- Ensure the user does not already exist
DELETE FROM auth.users WHERE email = 'seed-user@example.com';

-- 1. Create a specific user for seeding data
-- This user is not intended for interactive login.
INSERT INTO auth.users (id, email, encrypted_password, role)
VALUES ('599f1a13-4096-48d5-b495-1e367b6b585d', 'seed-user@example.com', crypt('password123', gen_salt('bf')), 'authenticated');

-- The trigger automatically creates a profile. We can update it with a specific username.
UPDATE public.profiles
SET username = 'Test User', email = 'seed-user@example.com'
WHERE id = '599f1a13-4096-48d5-b495-1e367b6b585d';

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
  (3, 'RL: Reinforcement Learning', 'Learn the fundamentals of RL.', 'Sharing knowledge about reinforcement learning.', null, 'public', 0.75, null);

-- 3. Create Course Memberships
-- Make the user an owner of Course 1 and a member of Course 2.
-- They will not be a member of Course 3.
INSERT INTO public.course_members (course_id, user_id)
VALUES
  (1, '599f1a13-4096-48d5-b495-1e367b6b585d'),
  (2, '599f1a13-4096-48d5-b495-1e367b6b585d');

-- 4. Create Punches for "CS 336" Course
-- Due dates are calculated by adding 6 days to the presentation date.
INSERT INTO public.punches (course_id, topic, due_date)
VALUES
  (1, 'Lecture 1: Overview, tokenization', '2025-08-01'::date),
  (1, 'Lecture 2: PyTorch, resource accounting', '2025-08-07'::date),
  (1, 'Lecture 3: Architectures, hyperparameters', '2025-08-14'::date),
  (1, 'Lecture 4: Mixture of expert', '2025-08-22'::date),
  (1, 'Lecture 5: GPUs', '2025-08-29'::date),
  (1, 'Lecture 6: Kernels, Triton', '2025-09-05'::date),
  (1, 'Lecture 7: Parallelism', '2025-09-12'::date),
  (1, 'Lecture 8: Parallelism', '2025-09-19'::date),
  (1, 'Lecture 9: Scaling laws', '2025-09-26'::date),
  (1, 'Lecture 10: Inference', '2025-10-03'::date),
  (1, 'Lecture 11: Scaling laws', '2025-10-10'::date),
  (1, 'Lecture 12: Evaluation', '2025-10-17'::date),
  (1, 'Lecture 13: Data', '2025-10-24'::date),
  (1, 'Lecture 14: Data', '2025-10-31'::date),
  (1, 'Lecture 15: Alignment - SFT/RLHF', '2025-11-07'::date),
  (1, 'Lecture 16: Alignment - RL', '2025-11-14'::date),
  (1, 'Lecture 17: Alignment - RL', '2025-11-21'::date),
  (1, 'Lecture 18: Guest Lecture by Junyang Lin', '2025-11-28'::date),
  (1, 'Lecture 19: Guest lecture by Mike Lewis', '2025-12-05'::date);
  
-- Reset sequences to prevent primary key conflicts if we re-run the seed.
SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses), true);
SELECT setval('punches_id_seq', (SELECT MAX(id) FROM punches), true); 