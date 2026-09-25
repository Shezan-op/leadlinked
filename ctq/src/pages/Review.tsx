import React from 'react';
import type { ClientBasics, QuestionConfig, UploadedFileItem } from '../types/questionnaire';
import { SECTIONS } from '../config/questions';
import { BRAND_CONFIG } from '../config/brand';

interface ReviewProps {
  clientBasics: ClientBasics;
  answers: Record<string, any>;
  files: UploadedFileItem[];
  externalLinks: Record<string, string>;
  questions: QuestionConfig[];
  onEditClientBasics: () => void;
  onEditQuestion: (questionIndex: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submissionError?: string | null;
}

export const Review: React.FC<ReviewProps> = ({
  clientBasics,
  answers,
  files,
  externalLinks,
  questions,
  onEditClientBasics,
  onEditQuestion,
  onSubmit,
  isSubmitting,
  submissionError,
}) => {
  const getAnswerDisplay = (question: QuestionConfig) => {
    const val = answers[question.id];
    const qFiles = files.filter((f) => f.questionId === question.id);
    const cloudLink = externalLinks[question.id];

    if (question.type === 'single_select_with_other') {
      if (!val || !val.selected) return <span className="text-[#94938F] italic">No answer provided</span>;
      return (
        <span className="font-medium text-[#111111]">
          {val.selected}
          {val.selected === 'Other' && val.otherText ? ` (${val.otherText})` : ''}
        </span>
      );
    }

    if (question.type === 'links') {
      if (!val || typeof val !== 'object') return <span className="text-[#94938F] italic">No links provided</span>;
      const entries = Object.entries(val).filter(([, url]) => !!url && String(url).trim().length > 0);
      if (entries.length === 0) return <span className="text-[#94938F] italic">No links provided</span>;

      return (
        <div className="space-y-1 font-mono text-xs">
          {entries.map(([k, v]) => (
            <div key={k} className="flex items-center space-x-2">
              <span className="text-[#787774] capitalize">{k.replace('_', ' ')}:</span>
              <span className="text-[#111111] truncate">{String(v)}</span>
            </div>
          ))}
        </div>
      );
    }

    const hasText = typeof val === 'string' && val.trim().length > 0;

    return (
      <div className="space-y-2">
        {hasText ? (
          <p className="text-sm text-[#2A2A28] whitespace-pre-wrap leading-relaxed">{val}</p>
        ) : (
          !qFiles.length && !cloudLink && (
            <span className="text-xs text-[#94938F] italic">
              {question.required ? 'Required answer missing' : 'Optional answer left blank'}
            </span>
          )
        )}

        {/* Display attached files if any */}
        {qFiles.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {qFiles.map((file) => (
              <span
                key={file.id}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#F7F6F3] border border-[#EAEAEA] text-xs font-mono text-[#444442]"
              >
                <span>📎</span>
                <span className="truncate max-w-[200px]">{file.name}</span>
              </span>
            ))}
          </div>
        )}

        {/* Display cloud link if any */}
        {cloudLink && (
          <div className="pt-1 text-xs font-mono text-[#1F6C9F] flex items-center space-x-1">
            <span>🔗 Cloud Folder:</span>
            <a href={cloudLink} target="_blank" rel="noreferrer" className="underline truncate max-w-md">
              {cloudLink}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-10 sm:py-16 px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F7F6F3] border border-[#EAEAEA] text-xs font-mono text-[#666663] mb-4">
          <span>Final Verification • Strategic Review</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mb-3">
          Review Your Truth Diagnostic
        </h1>
        <p className="text-sm sm:text-base text-[#666663] max-w-2xl leading-relaxed">
          Take a moment to review your answers. You can edit any individual question before final dispatch. Once submitted, your intelligence payload will be securely stored and routed to the {BRAND_CONFIG.name} creative directors.
        </p>
      </div>

      {/* SECTION: CLIENT BASICS */}
      <div className="mb-8 border border-[#EAEAEA] rounded-xl bg-[#FFFFFF] overflow-hidden">
        <div className="p-5 bg-[#FBFBFA] border-b border-[#EAEAEA] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#787774]">00</span>
            <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wide">
              Client Basics & Identity
            </h2>
          </div>
          <button
            onClick={onEditClientBasics}
            className="text-xs font-medium text-[#111111] hover:underline underline-offset-4"
          >
            Edit
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#787774] block mb-0.5">Business Name</span>
            <span className="font-medium text-[#111111] text-sm">{clientBasics.clientName || '—'}</span>
          </div>
          <div>
            <span className="text-[#787774] block mb-0.5">Primary Contact</span>
            <span className="font-medium text-[#111111] text-sm">{clientBasics.contactName || '—'}</span>
          </div>
          <div>
            <span className="text-[#787774] block mb-0.5">Email</span>
            <span className="font-mono text-[#111111]">{clientBasics.contactEmail || '—'}</span>
          </div>
          <div>
            <span className="text-[#787774] block mb-0.5">Phone / WhatsApp</span>
            <span className="font-mono text-[#111111]">{clientBasics.contactPhone || '—'}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-[#787774] block mb-0.5">Website</span>
            <span className="font-mono text-[#111111]">{clientBasics.website || '—'}</span>
          </div>
        </div>
      </div>

      {/* 8 STRATEGIC SECTIONS */}
      <div className="space-y-6 mb-12">
        {SECTIONS.map((section) => {
          const sectionQuestions = questions.filter((q) => q.sectionId === section.id);

          return (
            <div
              key={section.id}
              className="border border-[#EAEAEA] rounded-xl bg-[#FFFFFF] overflow-hidden"
            >
              {/* Section Title Bar */}
              <div className="p-5 bg-[#FBFBFA] border-b border-[#EAEAEA] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs text-[#787774]">{section.number}</span>
                  <div>
                    <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wide">
                      {section.title}
                    </h2>
                    <span className="text-[11px] text-[#787774] hidden sm:inline">
                      {section.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Questions within this section */}
              <div className="divide-y divide-[#EAEAEA]">
                {sectionQuestions.map((q) => {
                  const qIndex = questions.findIndex((item) => item.id === q.id);

                  return (
                    <div key={q.id} className="p-5 hover:bg-[#FAF9F7]/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="font-mono text-[11px] text-[#787774] uppercase mr-2">
                            {q.id}
                          </span>
                          <span className="text-xs font-semibold text-[#111111]">{q.title}</span>
                          {q.required && <span className="text-[#9F2F2D] text-xs ml-1">*</span>}
                        </div>
                        <button
                          onClick={() => onEditQuestion(qIndex)}
                          className="text-xs text-[#787774] hover:text-[#111111] hover:underline underline-offset-2 shrink-0"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="pl-6 border-l-2 border-[#EAEAEA] mt-2">
                        {getAnswerDisplay(q)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Error Banner */}
      {submissionError && (
        <div className="mb-6 p-4 rounded-lg bg-[#FDEBEC] border border-[#FAD2D4] text-xs text-[#9F2F2D] space-y-1">
          <p className="font-medium">We couldn't submit the questionnaire yet.</p>
          <p>{submissionError}</p>
          <p className="text-[#787774] pt-1">
            Note: Your draft answers are securely preserved in your browser.
          </p>
        </div>
      )}

      {/* Submission Card */}
      <div className="p-6 border border-[#EAEAEA] rounded-xl bg-[#FFFFFF] space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#111111]">Ready to send?</h3>
          <p className="text-xs text-[#666663] leading-relaxed mt-1">
            Your answers and uploaded assets will be securely routed through the LeadLinked Vercel bridge into Google Sheets and Google Drive so we can thoroughly examine your business before we begin building.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#EAEAEA]">
          <span className="text-xs text-[#787774] font-mono">
            {files.length} attached files • 30 answers compiled
          </span>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs font-semibold rounded-md transition-all flex items-center justify-center space-x-2 ${
              isSubmitting
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:bg-[#2A2A2A] active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Submitting Intelligence Payload...</span>
              </>
            ) : (
              <>
                <span>Submit Questionnaire</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
