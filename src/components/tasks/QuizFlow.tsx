'use client'

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from "@/components/ui/button";
import QuizResult from './QuizResult'; // Import the new component

interface QuizFlowProps {
  task: Task;
}

export default function QuizFlow({ task }: QuizFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const questions = task.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    // Save the current answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedChoice;
    setUserAnswers(newAnswers);
    setSelectedChoice(null); // Reset for next question

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    setSelectedChoice(null);
  }
  
  if (isSubmitted) {
    return <QuizResult questions={questions} userAnswers={userAnswers} onRestart={handleRestart} />
  }

  if (!currentQuestion) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Not Available</h1>
        <p className="text-gray-600">This quiz does not have any questions yet. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
      <p className="text-gray-500 mb-6">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion?.question}</h2>
        
        <div className="space-y-3 my-4">
          {currentQuestion.choices.map((choice) => (
            <label 
              key={choice.id}
              className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
                selectedChoice === choice.id 
                  ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-300' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <input 
                type="radio" 
                name={`question-${currentQuestion.id}`}
                value={choice.id}
                checked={selectedChoice === choice.id}
                onChange={() => setSelectedChoice(choice.id)}
                className="hidden"
              />
              <span className="ml-2 text-gray-700">{choice.text}</span>
            </label>
          ))}
        </div>

        <Button 
          size="lg" 
          className="w-full mt-6" 
          onClick={handleNextQuestion}
          disabled={!selectedChoice}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
