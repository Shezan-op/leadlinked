import React, { useState } from 'react';
import type { ClientBasics } from '../types/questionnaire';
import { validateClientBasics } from '../lib/validation';

interface ClientBasicsProps {
  basics: ClientBasics;
  onUpdate: (basics: ClientBasics) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ClientBasicsStep: React.FC<ClientBasicsProps> = ({
  basics,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof ClientBasics, string>>>({});

  const handleChange = (field: keyof ClientBasics, val: string) => {
    onUpdate({
      ...basics,
      [field]: val,
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateClientBasics(basics);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto py-10 sm:py-16 px-4 sm:px-6">
      {/* Step tag */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F7F6F3] border border-[#EAEAEA] text-xs font-mono text-[#666663] mb-6">
        <span>Prerequisite • System Record</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] mb-3">
        Client Basics
      </h1>
      <p className="text-sm sm:text-base text-[#666663] mb-8 leading-relaxed">
        Before we dive into the strategic questionnaire, tell us who we are speaking with and which enterprise or brand this diagnostic is for.
      </p>

      <form onSubmit={handleContinue} className="space-y-5">
        {/* Client / Business Name */}
        <div>
          <label htmlFor="clientName" className="block text-xs font-medium text-[#111111] mb-1.5">
            Client / Business Name <span className="text-[#9F2F2D]">*</span>
          </label>
          <input
            id="clientName"
            type="text"
            value={basics.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            placeholder="e.g. Acme Studio / Horizon Capital"
            className="w-full text-sm px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#94938F]"
          />
          {errors.clientName && (
            <p className="mt-1 text-xs text-[#9F2F2D]">{errors.clientName}</p>
          )}
        </div>

        {/* Primary Contact Name */}
        <div>
          <label htmlFor="contactName" className="block text-xs font-medium text-[#111111] mb-1.5">
            Primary Contact Person <span className="text-[#9F2F2D]">*</span>
          </label>
          <input
            id="contactName"
            type="text"
            value={basics.contactName}
            onChange={(e) => handleChange('contactName', e.target.value)}
            placeholder="e.g. Alex Morgan (Founder / Head of Brand)"
            className="w-full text-sm px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#94938F]"
          />
          {errors.contactName && (
            <p className="mt-1 text-xs text-[#9F2F2D]">{errors.contactName}</p>
          )}
        </div>

        {/* Grid: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactEmail" className="block text-xs font-medium text-[#111111] mb-1.5">
              Contact Email <span className="text-[#9F2F2D]">*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              value={basics.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              placeholder="alex@yourbusiness.com"
              className="w-full text-sm px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#94938F]"
            />
            {errors.contactEmail && (
              <p className="mt-1 text-xs text-[#9F2F2D]">{errors.contactEmail}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactPhone" className="block text-xs font-medium text-[#111111] mb-1.5">
              Phone / WhatsApp
            </label>
            <input
              id="contactPhone"
              type="tel"
              value={basics.contactPhone}
              onChange={(e) => handleChange('contactPhone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full text-sm px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#94938F]"
            />
          </div>
        </div>

        {/* Primary Website */}
        <div>
          <label htmlFor="website" className="block text-xs font-medium text-[#111111] mb-1.5">
            Current Website
          </label>
          <input
            id="website"
            type="url"
            value={basics.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourbusiness.com"
            className="w-full text-sm px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#94938F] font-mono"
          />
        </div>

        {/* Form controls */}
        <div className="pt-6 flex items-center justify-between border-t border-[#EAEAEA]">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 text-xs font-medium text-[#787774] hover:text-[#111111] transition-colors"
          >
            ← Back to Overview
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-[#111111] text-[#FFFFFF] text-xs font-semibold rounded-md hover:bg-[#2A2A2A] active:scale-[0.99] transition-all flex items-center space-x-2"
          >
            <span>Proceed to Strategic Questions</span>
            <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
};
