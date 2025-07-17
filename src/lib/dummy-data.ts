import { Task, Course } from './types';

export const courses: Course[] = [
  { 
    id: 1, 
    name: 'CS 336: 从0构建大模型', 
    description: 'Language models serve as the cornerstone of modern natural language processing (NLP) applications and open up a new paradigm of having a single general purpose system address a range of downstream tasks. As the field of artificial intelligence (AI), machine learning (ML), and NLP continues to grow, possessing a deep understanding of language models becomes essential for scientists and engineers alike. This course is designed to provide students with a comprehensive understanding of language models by walking them through the entire process of developing their own. Drawing inspiration from operating systems courses that create an entire operating system from scratch, we will lead students through every aspect of language model creation, including data collection and cleaning for pre-training, transformer model construction, model training, and evaluation before deployment.', 
    shortDescription: 'Build a full-stack LLM from scratch, from data to deployment.',
    role: 'owner',
    resources: 'https://stanford-cs336.github.io/spring2025/'
  },
  { id: 2, name: 'AgentX: AI Agents', description: 'Sharing knowledge about AI agents.', shortDescription: 'Explore the latest in AI agent technology and applications.', role: 'moderator' },
  { id: 3, name: 'RL: Reinforcement Learning', description: 'Sharing knowledge about reinforcement learning.', shortDescription: 'Master the fundamentals of reinforcement learning.', role: 'member' },
]

export const roleDisplay: { [key: string]: { text: string; bgColor: string; textColor: string } } = {
  owner: { text: 'Owner', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  moderator: { text: 'Moderator', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  member: { text: 'Member', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
};

export const tasks: Task[] = [
  { 
    id: 1, 
    courseId: 1, 
    title: 'Week 1: Foundations of Large Language Models', 
    description: 'Understand the basic architecture and principles of LLMs.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'todo', 
    questionCount: 10,
    type: 'quiz-multiple-choice',
    questions: [
      {
        id: 1,
        question: 'What is the core component of a Large Language Model?',
        choices: [
          { id: 'a', text: 'Transformer Architecture' },
          { id: 'b', text: 'Convolutional Neural Network' },
          { id: 'c', text: 'Recurrent Neural Network' },
          { id: 'd', text: 'Support Vector Machine' }
        ],
        correctAnswer: 'a',
        hint: 'This architecture, introduced in "Attention Is All You Need", is key.'
      },
      {
        id: 2,
        question: 'Which company developed the GPT series of models?',
        choices: [
          { id: 'a', text: 'Google' },
          { id: 'b', text: 'Facebook' },
          { id: 'c', text: 'OpenAI' },
          { id: 'd', text: 'Microsoft' }
        ],
        correctAnswer: 'c',
        hint: 'This company was co-founded by Elon Musk and Sam Altman.'
      }
    ]
  },
  {
    id: 5,
    courseId: 1,
    title: 'Week 1: Acknowledge Course Outline',
    description: 'Review and acknowledge the course outline for the semester.',
    dueDate: '2024-08-20',
    status: 'todo',
    type: 'punch',
  },
  { 
    id: 2, 
    courseId: 2, 
    title: 'Share a Paper on Multi-Agent Systems', 
    description: 'Find and share a recent paper on multi-agent collaboration.',
    dueDate: '2024-08-15', 
    status: 'todo', 
    type: 'punch',
  },
  { 
    id: 3, 
    courseId: 3, 
    title: 'Implement Q-Learning from Scratch', 
    description: 'Code a simple Q-Learning algorithm in a Colab notebook.',
    dueDate: '2024-08-12', 
    status: 'overdue', 
    questionCount: 5,
    type: 'quiz-multiple-choice',
    questions: [
      {
        id: 3,
        question: "What is the 'Q' in Q-Learning?",
        choices: [
          { id: 'a', text: 'Quality' },
          { id: 'b', text: 'Quantity' },
          { id: 'c', text: 'Query' },
          { id: 'd', text: 'State' }
        ],
        correctAnswer: 'a',
        hint: 'It represents the quality of an action taken from a particular state.'
      }
    ],
  },
  { 
    id: 4, 
    courseId: 1, 
    title: 'Week 2: Setup Development Environment', 
    description: 'Complete the environment setup for our upcoming project.',
    dueDate: '2024-08-27', 
    status: 'todo', 
    type: 'punch',
  },
];

export const taskStatusDisplay: { [key: string]: { text: string; bgColor: string; textColor: string } } = {
  todo: { text: 'Todo', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  complete: { text: 'Complete', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  overdue: { text: 'Overdue', bgColor: 'bg-red-100', textColor: 'text-red-800' },
}; 