import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

interface HeaderProps {
  currentSectionTitle?: string;
  progressPercent?: number;
  autosaveStatus?: 'saved' | 'saving' | 'idle';
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSectionTitle,
  progressPercent = 0,
  autosaveStatus = 'idle',
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#EAEAEA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={onLogoClick}
          className="flex items-center space-x-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onLogoClick?.()}
        >
          <img
            src={BRAND_CONFIG.logoUrl}
            alt={BRAND_CONFIG.name}
            className="h-7 w-auto object-contain rounded-sm"
          />
          <div className="h-4 w-px bg-[#EAEAEA] hidden sm:block" />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-[#111111] uppercase font-mono">
              CTQ
            </span>
            <span className="text-[10px] text-[#787774] leading-none">
              Client Truth Questionnaire
            </span>
          </div>
        </div>

        {/* Center / Section badge if active */}
        {currentSectionTitle && (
          <div className="hidden md:flex items-center space-x-2 text-xs text-[#666663]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="font-medium text-[#111111]">{currentSectionTitle}</span>
          </div>
        )}

        {/* Right side: Autosave status & completion rate */}
        <div className="flex items-center space-x-4">
          {/* Subtle autosave indicator */}
          <div className="text-[11px] text-[#787774] flex items-center space-x-1.5 font-mono">
            {autosaveStatus === 'saving' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                <span>Saving...</span>
              </>
            )}
            {autosaveStatus === 'saved' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>Saved</span>
              </>
            )}
          </div>

          {/* Progress badge */}
          {progressPercent > 0 && (
            <div className="flex items-center space-x-2 pl-3 border-l border-[#EAEAEA]">
              <div className="w-16 sm:w-20 bg-[#EAEAEA] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#111111] h-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                />
              </div>
              <span className="text-xs font-mono font-medium text-[#111111]">
                {Math.round(progressPercent)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
