import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';


interface SuccessProps {
  submissionId: string;
  clientName: string;
  onStartNew: () => void;
}

export const Success: React.FC<SuccessProps> = ({
  submissionId,
  clientName,
  onStartNew,
}) => {
  useEffect(() => {
    // Subtle, dignified agency celebratory confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#111111', '#787774', '#1F6C9F', '#346538'],
      });
    } catch {
      // Fallback silently if canvas unavailable
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 sm:py-24 px-4 sm:px-6 text-center">
      {/* Status Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EDF3EC] border border-[#D1E7D0] text-xs font-mono text-[#346538] mb-6">
        <span className="w-2 h-2 rounded-full bg-[#346538]" />
        <span>Diagnostic Ingested & Verified</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4">
        You're all set.
      </h1>

      <p className="text-base sm:text-lg text-[#444442] mb-8 leading-relaxed max-w-lg mx-auto">
        Your questionnaire has been received. Thank you for giving us the context we need. We'll use this information to understand the business before we start building.
      </p>

      {/* Reference Card */}
      <div className="p-6 border border-[#EAEAEA] rounded-xl bg-[#FFFFFF] max-w-md mx-auto mb-10 text-left space-y-3">
        <div className="text-xs uppercase font-mono text-[#787774]">Submission Reference</div>
        <div className="text-lg font-mono font-bold text-[#111111] bg-[#F7F6F3] p-3 rounded border border-[#EAEAEA] select-all">
          {submissionId}
        </div>
        <div className="text-xs text-[#787774] flex justify-between pt-1">
          <span>Client: <strong className="text-[#111111]">{clientName || 'LeadLinked Client'}</strong></span>
          <span>Status: <strong className="text-[#346538]">Archived to Google Sheets</strong></span>
        </div>
      </div>

      {/* Next steps timeline */}
      <div className="p-6 border border-[#EAEAEA] rounded-xl bg-[#FFFFFF] max-w-lg mx-auto text-left mb-10 space-y-3">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#787774]">
          What Happens Next
        </h2>
        <div className="space-y-3 text-xs text-[#444442]">
          <div className="flex items-start space-x-2">
            <span className="font-mono text-[#111111]">1.</span>
            <span>Our strategic directors review your answers and asset folder.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-mono text-[#111111]">2.</span>
            <span>We identify strategic opportunities, angles, and differentiators.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-mono text-[#111111]">3.</span>
            <span>We prepare our kickoff briefing based on the truth of your business.</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <button
          onClick={onStartNew}
          className="px-6 py-3 border border-[#EAEAEA] text-[#787774] hover:text-[#111111] hover:border-[#CCCCCC] text-xs font-mono rounded-md transition-all"
        >
          Submit Another Questionnaire
        </button>
      </div>
    </div>
  );
};
