import React, { useState } from 'react';
import type { QuestionConfig, UploadedFileItem } from '../types/questionnaire';
import { QuestionField } from '../components/inputs/QuestionField';
import { ProgressBar } from '../components/questionnaire/ProgressBar';
import { validateQuestionAnswer } from '../lib/validation';

interface QuestionnaireProps {
  questionIndex: number; // 0 to 29
  questions: QuestionConfig[];
  currentAnswer: any;
  onUpdateAnswer: (questionId: string, val: any) => void;
  files: UploadedFileItem[];
  onAddFiles: (files: UploadedFileItem[]) => void;
  onRemoveFile: (fileId: string) => void;
  externalLink: string;
  onUpdateExternalLink: (questionId: string, link: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onReview: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  questionIndex,
  questions,
  currentAnswer,
  onUpdateAnswer,
  files,
  onAddFiles,
  onRemoveFile,
  externalLink,
  onUpdateExternalLink,
  onNext,
  onPrevious,
  onReview,
}) => {
  const currentQuestion = questions[questionIndex];
  const [error, setError] = useState<string | null>(null);


  if (!currentQuestion) return null;

  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex === questions.length - 1;

  const handleNext = () => {
    const hasFilesOrLink = files.length > 0 || (!!externalLink && externalLink.trim().length > 0);
    const result = validateQuestionAnswer(currentQuestion, currentAnswer, hasFilesOrLink);

    if (!result.isValid) {
      setError(result.message || 'Please complete this question before continuing.');
      return;
    }

    setError(null);
    if (isLastQuestion) {
      onReview();
    } else {
      onNext();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Cmd/Ctrl + Enter to proceed
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="max-w-3xl mx-auto py-8 sm:py-14 px-4 sm:px-6 transition-all"
    >
      {/* Progress system */}
      <ProgressBar
        currentQuestionIndex={questionIndex}
        totalQuestions={questions.length}
        currentSectionTitle={currentQuestion.sectionTitle}
        currentSectionNumber={String(
          questions.findIndex((q) => q.sectionId === currentQuestion.sectionId) !== -1
            ? currentQuestion.id.slice(1)
            : '01'
        )}
      />

      {/* Question Header Card */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center space-x-2.5">
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#F7F6F3] border border-[#EAEAEA] text-[#666663] uppercase font-semibold">
            {currentQuestion.id.toUpperCase()}
          </span>
          {currentQuestion.required ? (
            <span className="text-xs text-[#9F2F2D] font-mono uppercase tracking-wider">
              Required
            </span>
          ) : (
            <span className="text-xs text-[#787774] font-mono uppercase tracking-wider">
              Optional
            </span>
          )}
        </div>

        {/* Big Question Title */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] leading-tight">
          {currentQuestion.title}
        </h1>

        {/* Strategic Guidance / Prompt */}
        <p className="text-sm sm:text-base text-[#444442] leading-relaxed max-w-2xl">
          "{currentQuestion.description}"
        </p>
      </div>

      {/* Input Field Component */}
      <div key={currentQuestion.id} className="mb-10">
        <QuestionField
          question={currentQuestion}
          value={currentAnswer}
          onChange={(val) => {
            onUpdateAnswer(currentQuestion.id, val);
            if (error) setError(null);
          }}
          files={files}
          onAddFiles={onAddFiles}
          onRemoveFile={onRemoveFile}
          externalLink={externalLink}
          onExternalLinkChange={(link) => onUpdateExternalLink(currentQuestion.id, link)}
          error={error}
        />
      </div>

      {/* Navigation Controls */}
      <div className="pt-6 border-t border-[#EAEAEA] flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2.5 text-xs font-medium text-[#787774] hover:text-[#111111] transition-colors flex items-center space-x-1.5"
        >
          <span>←</span>
          <span>{isFirstQuestion ? 'Client Basics' : 'Previous Question'}</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onReview}
            className="hidden sm:inline-block px-3 py-2 text-xs font-mono text-[#787774] hover:text-[#111111] hover:underline underline-offset-4 transition-colors"
          >
            Jump to Review
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-[#111111] text-[#FFFFFF] text-xs font-semibold rounded-md hover:bg-[#2A2A2A] active:scale-[0.99] transition-all flex items-center space-x-2"
          >
            <span>{isLastQuestion ? 'Review Answers' : 'Next Question'}</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Subtle keyboard hint */}
      <div className="mt-4 text-center hidden sm:block">
        <span className="text-[11px] text-[#94938F] font-mono">
          Tip: Press <kbd className="px-1.5 py-0.5 border border-[#EAEAEA] rounded bg-[#F7F6F3]">Cmd/Ctrl + Enter</kbd> to proceed
        </span>
      </div>
    </div>
  );
};
