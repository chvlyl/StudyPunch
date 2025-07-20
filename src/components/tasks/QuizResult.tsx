// 'use client';

// // import { Question } from '@/lib/types';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, XCircle } from 'lucide-react';

// interface QuizResultProps {
//   questions: { id: string; question: string; choices: { id: string; text: string; isCorrect: boolean }[] }[];
//   userAnswers: (string | null)[];
//   onRestart: () => void;
// }

// Placeholder component - quiz functionality commented out for now
export default function QuizResult() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Quiz Result - Coming Soon</h1>
    </div>
  );
}

// export default function QuizResult({ questions, userAnswers, onRestart }: QuizResultProps) {
//   const correctAnswersCount = userAnswers.filter(
//     (answer, index) => questions[index].correctAnswer === answer
//   ).length;
//   const score = (correctAnswersCount / questions.length) * 100;

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <div className="bg-white p-8 rounded-2xl shadow-lg border">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
//           Quiz Completed!
//         </h1>
//         <div className="text-center mb-8">
//           <p className="text-xl text-gray-600">Your Score</p>
//           <p className="text-6xl font-bold text-blue-600 my-2">{score.toFixed(0)}%</p>
//           <p className="text-gray-500">
//             You answered {correctAnswersCount} out of {questions.length} questions correctly.
//           </p>
//         </div>

//         <div className="space-y-6">
//           {questions.map((question, index) => {
//             const userAnswer = userAnswers[index];
//             const isCorrect = question.correctAnswer === userAnswer;
//             return (
//               <div
//                 key={question.id}
//                 className={`p-4 rounded-lg border-l-4 ${
//                   isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
//                   {isCorrect ? (
//                     <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
//                   ) : (
//                     <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
//                   )}
//                 </div>
//                 <p className={`mt-2 text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
//                   Your answer: {userAnswer || 'Not answered'}
//                 </p>
//                 {!isCorrect && (
//                   <div className="mt-3 pt-3 border-t border-red-200">
//                     <p className="text-sm font-semibold text-gray-700">Correct answer: {question.correctAnswer}</p>
//                     {question.hint && (
//                       <p className="text-sm text-gray-600 mt-1">
//                         <span className="font-semibold">Hint:</span> {question.hint}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="mt-10 text-center">
//           <Button onClick={onRestart} size="lg">
//             Retake Quiz
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
