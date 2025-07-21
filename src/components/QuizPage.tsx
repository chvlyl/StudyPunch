'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { submitQuizAttempt } from '@/app/courses/actions';

interface Question {
  problem_numer: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  explaination: string;
}

interface QuizPageProps {
  quiz: {
    id: number;
    title: string;
    description: string | null;
    course_id: number;
  };
  questions: Question[];
  courseName: string;
}

export default function QuizPage({ quiz, questions, courseName }: QuizPageProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [showAnswerExplanation, setShowAnswerExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
    // Don't show explanation immediately, wait for user to click "下一题"
  };

  const handleNext = () => {
    if (!showAnswerExplanation) {
      // First click: show answer explanation
      setShowAnswerExplanation(true);
    } else {
      // Second click: move to next question or review
      setShowAnswerExplanation(false);
      if (isLastQuestion) {
        setShowReview(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (showAnswerExplanation) {
      // If showing explanation, just hide it
      setShowAnswerExplanation(false);
    } else if (currentQuestionIndex > 0) {
      // Otherwise go to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswerExplanation(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate score
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score++;
      }
    });

    // Submit to database
    const result = await submitQuizAttempt(quiz.id, score);
    
    if (result.success) {
      setFinalScore(score);
      setIsFinished(true);
    }
    
    setIsSubmitting(false);
  };

  const handleBackToCourse = () => {
    router.push(`/courses/${quiz.course_id}`);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowReview(false);
    setShowAnswerExplanation(false);
  };

  // Review view
  if (showReview && !isFinished) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title} - 答题回顾</h1>
              <p className="text-gray-600">{courseName}</p>
            </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               {questions.map((question, index) => (
                 <div 
                   key={question.problem_numer}
                   className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                     selectedAnswers[index] 
                       ? 'border-green-200 bg-green-50' 
                       : 'border-red-200 bg-red-50'
                   }`}
                   onClick={() => goToQuestion(index)}
                 >
                   <div className="flex justify-between items-center">
                     <span className="font-medium">问题 {question.problem_numer}</span>
                     <span className={`text-sm ${
                       selectedAnswers[index] ? 'text-green-600' : 'text-red-600'
                     }`}>
                       {selectedAnswers[index] ? '已回答' : '未回答'}
                     </span>
                   </div>
                 </div>
               ))}
            </div>

            <div className="flex justify-between">
              <Button onClick={() => setShowReview(false)} variant="outline">
                继续答题
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || selectedAnswers.some(answer => !answer)}
              >
                {isSubmitting ? '提交中...' : '提交测验'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (isFinished && finalScore !== null) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">测验完成！</h1>
              <p className="text-xl text-gray-600 mb-4">
                你的得分: <span className="font-bold text-blue-600">{finalScore}/{questions.length}</span>
              </p>
              <p className="text-gray-500">
                正确率: {Math.round((finalScore / questions.length) * 100)}%
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900">答案解析</h2>
                             {questions.map((question, index) => {
                 const userAnswer = selectedAnswers[index];
                 const isCorrect = userAnswer === question.answer;
                 const optionEntries = Object.entries(question.options);
                 
                 return (
                   <div key={question.problem_numer} className="border rounded-lg p-6">
                     <div className="mb-4">
                       <h3 className="font-semibold text-gray-900 mb-2">
                         问题 {question.problem_numer}: {question.question}
                       </h3>
                       <div className="grid grid-cols-1 gap-2">
                         {optionEntries.map(([optionLetter, option]) => {
                           const isUserAnswer = userAnswer === optionLetter;
                           const isCorrectAnswer = question.answer === optionLetter;
                           
                           return (
                             <div 
                               key={optionLetter}
                               className={`p-3 rounded-lg border ${
                                 isCorrectAnswer 
                                   ? 'border-green-500 bg-green-50 text-green-800'
                                   : isUserAnswer 
                                     ? 'border-red-500 bg-red-50 text-red-800'
                                     : 'border-gray-200 bg-gray-50'
                               }`}
                             >
                               <span className="font-medium">{optionLetter}. </span>
                               {option}
                               {isCorrectAnswer && <span className="ml-2 text-green-600">✓ 正确答案</span>}
                               {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600">✗ 你的答案</span>}
                             </div>
                           );
                         })}
                       </div>
                     </div>
                     
                     <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                       <div className="flex items-center gap-2 mb-2">
                         <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                           {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
                         </span>
                       </div>
                       <p className="text-gray-700 text-sm">
                         <strong>解析:</strong> {question.explaination}
                       </p>
                     </div>
                   </div>
                 );
               })}
            </div>

            <div className="flex justify-center">
              <Button onClick={handleBackToCourse}>
                返回课程
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz taking view
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <Button onClick={handleBackToCourse} variant="outline" size="sm">
                退出测验
              </Button>
            </div>
            <p className="text-gray-600">{courseName}</p>
            {quiz.description && (
              <p className="text-gray-600 mt-2">{quiz.description}</p>
            )}
            
            <div className="mt-4 bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>问题 {currentQuestionIndex + 1} / {questions.length}</span>
                <span>已完成: {selectedAnswers.filter(a => a).length}/{questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>
            
                         <div className="space-y-3">
               {Object.entries(currentQuestion.options).map(([optionLetter, option]) => {
                 const isSelected = selectedAnswers[currentQuestionIndex] === optionLetter;
                 
                 return (
                   <button
                     key={optionLetter}
                     onClick={() => handleAnswerSelect(optionLetter)}
                     className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                       isSelected
                         ? 'border-blue-500 bg-blue-50 text-blue-900'
                         : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                     }`}
                   >
                     <span className="font-medium">{optionLetter}. </span>
                     {option}
                   </button>
                 );
               })}
                          </div>
           </div>

          {/* Answer Explanation Section */}
          {showAnswerExplanation && selectedAnswers[currentQuestionIndex] && (
            <div className="mb-8 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">答案解析</h3>
              
              {/* Show all options with correct/incorrect indicators */}
              <div className="space-y-3 mb-4">
                {Object.entries(currentQuestion.options).map(([optionLetter, option]) => {
                  const isUserAnswer = selectedAnswers[currentQuestionIndex] === optionLetter;
                  const isCorrectAnswer = currentQuestion.answer === optionLetter;
                  
                  return (
                    <div 
                      key={optionLetter}
                      className={`p-3 rounded-lg border ${
                        isCorrectAnswer 
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : isUserAnswer 
                            ? 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="font-medium">{optionLetter}. </span>
                      {option}
                      {isCorrectAnswer && <span className="ml-2 text-green-600 font-semibold">✓ 正确答案</span>}
                      {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600 font-semibold">✗ 你的答案</span>}
                    </div>
                  );
                })}
              </div>

              {/* Result indicator */}
              <div className={`p-4 rounded-lg mb-4 ${
                selectedAnswers[currentQuestionIndex] === currentQuestion.answer 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-semibold ${
                    selectedAnswers[currentQuestionIndex] === currentQuestion.answer 
                      ? 'text-green-800' 
                      : 'text-red-800'
                  }`}>
                    {selectedAnswers[currentQuestionIndex] === currentQuestion.answer 
                      ? '🎉 回答正确！' 
                      : '❌ 回答错误'}
                  </span>
                </div>
                <p className="text-gray-700">
                  <strong>解析：</strong>{currentQuestion.explaination}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 && !showAnswerExplanation}
              variant="outline"
            >
              {showAnswerExplanation ? '返回题目' : '上一题'}
            </Button>
            
            <Button onClick={() => setShowReview(true)} variant="outline">
              查看进度
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestionIndex]}
            >
              {!showAnswerExplanation 
                ? '验证答案' 
                : isLastQuestion 
                  ? '完成测验' 
                  : '下一题'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 