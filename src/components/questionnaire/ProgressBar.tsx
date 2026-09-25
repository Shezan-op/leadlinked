import React from 'react';

interface ProgressBarProps {
  currentQuestionIndex: number; // 0 to 29
  totalQuestions: number; // 30
  currentSectionTitle: string;
  currentSectionNumber: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
  currentSectionTitle,
  currentSectionNumber,
}) => {
  const stepNumber = currentQuestionIndex + 1;
  const progressRatio = stepNumber / totalQuestions;
  const percent = Math.round(progressRatio * 100);

  return (
    <div className="w-full mb-8 pt-2">
      {/* Top Meta info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2.5">
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-mono text-[#787774] uppercase tracking-wider">
            Part {currentSectionNumber}
          </span>
          <span className="text-[#CCCCCC]">•</span>
          <span className="font-semibold text-[#111111] uppercase tracking-wider text-[11px]">
            {currentSectionTitle}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#787774]">
          <span className="text-[#111111] font-semibold">
            {String(stepNumber).padStart(2, '0')}
          </span>
          <span>/</span>
          <span>{String(totalQuestions).padStart(2, '0')}</span>
          <span className="text-[#CCCCCC]">•</span>
          <span>{percent}% Complete</span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-[#EAEAEA] h-1 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#111111] transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
