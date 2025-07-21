'use client';

import { useState } from 'react';
import { Quiz } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getQuizQuestions } from '@/app/courses/actions';

interface QuizFlowProps {
  quizData: {
    id: number;
    title: string;
    description: string | null;
    file_path: string | null;
  };
  onComplete?: () => void;
}

export default function QuizFlow({ quizData, onComplete }: QuizFlowProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = async () => {
    if (!quizData.file_path) return;
    setIsLoading(true);
    const questions = await getQuizQuestions(quizData.file_path);
    if (questions) {
      setQuiz(questions);
    }
    setIsLoading(false);
  };
  
  const handleSelectAnswer = (option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      if (onComplete) {
        // Give a small delay to show the result before closing
        setTimeout(onComplete, 2000);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsFinished(false);
    setQuiz(null);
  };
  
  if (!quiz) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border w-full flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{quizData.title}</h3>
          <p className="text-gray-600">{quizData.description}</p>
        </div>
        <Button onClick={startQuiz} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Start Quiz'}
        </Button>
      </div>
    );
  }

  if (isFinished) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quiz[index].answer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200 w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
        <p className="text-xl text-gray-600 mb-6">
          You scored <span className="font-bold text-blue-600">{score}</span> out of{' '}
          <span className="font-bold">{quiz.length}</span> ({percentage}%)
        </p>
        
        <div className="text-left my-8">
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Review Your Answers</h3>
          {quiz.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.answer;
            return (
              <div key={question.problem_numer} className="mb-6 pb-4 border-b last:border-b-0">
                <p className="font-bold text-lg text-gray-800 mb-2">{question.question}</p>
                <p className={`text-md p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  Your answer: <span className="font-semibold">{userAnswer ? `${userAnswer}: ${question.options[userAnswer]}`: "No answer"}</span>
                  {!isCorrect && (
                    <span className="block mt-2">
                      Correct answer: <span className="font-semibold">{question.answer}: {question.options[question.answer]}</span>
                    </span>
                  )}
                </p>
                {!isCorrect && userAnswer && (
                   <p className="mt-3 text-sm text-gray-600 bg-yellow-100 p-3 rounded-lg">
                     <strong>Explanation:</strong> {question.explaination}
                   </p>
                )}
              </div>
            )
          })}
        </div>

        <Button onClick={handleRestart} size="lg">
          Try Again
        </Button>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border w-full">
      <h3 className="text-xl font-semibold mb-4">
        Question {currentQuestionIndex + 1} of {quiz.length}
      </h3>
      <p className="text-lg mb-6">{currentQuestion.question}</p>

      <div className="space-y-3">
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <Button
            key={key}
            onClick={() => handleSelectAnswer(key)}
            className={`w-full text-left justify-start p-4 transition-colors duration-200 
              ${selectedAnswers[currentQuestionIndex] === key 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <span className="font-bold mr-4">{key}.</span>
            {value}
          </Button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]}
        >
          {currentQuestionIndex < quiz.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
}
