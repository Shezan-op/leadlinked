import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { SECTIONS } from '../config/questions';

interface IntroProps {
  onStart: () => void;
  hasExistingDraft: boolean;
  onResume: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart, hasExistingDraft, onResume }) => {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-20 px-4 sm:px-6">
      {/* Agency Header Tag */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F7F6F3] border border-[#EAEAEA] text-xs font-mono text-[#666663] mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
        <span>{BRAND_CONFIG.productName} • Strategic Client Truth Diagnostic</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-6 leading-[1.15]">
        Give us the real story.
        <br />
        <span className="text-[#666663] font-normal">We build on truth, not marketing fluff.</span>
      </h1>

      <p className="text-base sm:text-lg text-[#444442] leading-relaxed mb-10 max-w-2xl">
        This is the strategic onboarding questionnaire for {BRAND_CONFIG.name}. It helps us examine your business foundation, customers, positioning, obstacles, and commercial goals so we can build tailored, high-conviction creative and strategic solutions.
      </p>

      {/* Overview Metric Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="p-5 border border-[#EAEAEA] rounded-lg bg-[#FFFFFF]">
          <div className="text-xs uppercase font-mono text-[#787774] mb-1">Time Estimate</div>
          <div className="text-xl font-bold text-[#111111]">~20–25 Mins</div>
          <p className="text-xs text-[#787774] mt-1">Deep context beats dozens of endless meetings.</p>
        </div>

        <div className="p-5 border border-[#EAEAEA] rounded-lg bg-[#FFFFFF]">
          <div className="text-xs uppercase font-mono text-[#787774] mb-1">Structure</div>
          <div className="text-xl font-bold text-[#111111]">30 Questions</div>
          <p className="text-xs text-[#787774] mt-1">Split across 8 focused strategic dimensions.</p>
        </div>

        <div className="p-5 border border-[#EAEAEA] rounded-lg bg-[#FFFFFF]">
          <div className="text-xs uppercase font-mono text-[#787774] mb-1">Draft Persistence</div>
          <div className="text-xl font-bold text-[#111111]">Autosaved</div>
          <p className="text-xs text-[#787774] mt-1">Pause anytime; your browser preserves every draft.</p>
        </div>
      </div>

      {/* 8 Strategic Dimensions Preview */}
      <div className="mb-12 border border-[#EAEAEA] rounded-xl p-6 bg-[#FFFFFF]">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#787774] mb-4">
          The 8 Strategic Areas We Will Explore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SECTIONS.map((sec) => (
            <div key={sec.id} className="flex items-start space-x-3 p-2 rounded hover:bg-[#FBFBFA] transition-colors">
              <span className="font-mono text-xs text-[#787774] mt-0.5">{sec.number}</span>
              <div>
                <p className="text-sm font-medium text-[#111111]">{sec.title}</p>
                <p className="text-xs text-[#787774] leading-snug">{sec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Call to Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {hasExistingDraft ? (
          <>
            <button
              onClick={onResume}
              className="px-6 py-3.5 bg-[#111111] text-[#FFFFFF] text-sm font-medium rounded-md hover:bg-[#2A2A2A] active:scale-[0.99] transition-all text-center"
            >
              Resume Saved Questionnaire →
            </button>
            <button
              onClick={onStart}
              className="px-5 py-3.5 bg-[#FFFFFF] border border-[#EAEAEA] text-[#666663] text-sm font-medium rounded-md hover:border-[#CCCCCC] hover:text-[#111111] transition-all text-center"
            >
              Start New Submission
            </button>
          </>
        ) : (
          <button
            onClick={onStart}
            className="px-8 py-4 bg-[#111111] text-[#FFFFFF] text-sm font-semibold rounded-md hover:bg-[#2A2A2A] active:scale-[0.99] transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>Begin Strategic Questionnaire</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Agency Privacy Footnote */}
      <div className="mt-12 pt-6 border-t border-[#EAEAEA] flex items-center justify-between text-xs text-[#787774]">
        <span>Confidential strategic material for {BRAND_CONFIG.name}</span>
        <span className="font-mono">v1.0.0</span>
      </div>
    </div>
  );
};
