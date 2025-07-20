'use client'

import React from 'react';
import { Punch } from '@/lib/types';
import { Button } from "@/components/ui/button";

interface QuizFlowProps {
  task: Punch;
}

export default function QuizFlow({ task }: QuizFlowProps) {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{task.topic}</h1>
      <p className="text-gray-500 mb-6">Quiz functionality coming soon</p>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">Quiz Not Yet Implemented</h2>
        <p className="text-gray-600 mb-4">
          This task is marked as a quiz ({task.task_type}), but the quiz system hasn&apos;t been implemented yet.
        </p>
        <p className="text-gray-600 mb-6">
          {task.description || "No description available."}
        </p>
        
        <Button size="lg" className="w-full" disabled>
          Quiz Coming Soon
        </Button>
      </div>
    </div>
  );
}
