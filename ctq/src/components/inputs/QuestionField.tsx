import React from 'react';
import type { QuestionConfig, UploadedFileItem } from '../../types/questionnaire';
import { FileUploadZone } from '../uploads/FileUploadZone';

interface QuestionFieldProps {
  question: QuestionConfig;
  value: any;
  onChange: (val: any) => void;
  files: UploadedFileItem[];
  onAddFiles: (files: UploadedFileItem[]) => void;
  onRemoveFile: (fileId: string) => void;
  externalLink: string;
  onExternalLinkChange: (link: string) => void;
  error?: string | null;
}

export const QuestionField: React.FC<QuestionFieldProps> = ({
  question,
  value,
  onChange,
  files,
  onAddFiles,
  onRemoveFile,
  externalLink,
  onExternalLinkChange,
  error,
}) => {
  // Render based on question type
  const renderInput = () => {
    switch (question.type) {
      case 'long_text':
      case 'long_text_with_links': {
        return (
          <div className="space-y-3">
            <textarea
              id={`input-${question.id}`}
              rows={6}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder || 'Write your response here...'}
              aria-label={question.title}
              className="w-full text-base p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-[#111111] placeholder:text-[#94938F] resize-y transition-all leading-relaxed shadow-none"
            />
            {question.type === 'long_text_with_links' && (
              <p className="text-xs text-[#787774]">
                Tip: Feel free to paste direct URLs, Instagram handles, or reference links directly into your answer.
              </p>
            )}
          </div>
        );
      }

      case 'single_select_with_other': {
        const selected = value?.selected || '';
        const otherText = value?.otherText || '';

        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(question.options || []).map((option) => {
                const isChecked = selected === option;
                return (
                  <label
                    key={option}
                    className={`flex items-center space-x-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                      isChecked
                        ? 'border-[#111111] bg-[#F7F6F3] font-medium text-[#111111]'
                        : 'border-[#EAEAEA] bg-[#FFFFFF] text-[#444442] hover:border-[#CCCCCC] hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`select-${question.id}`}
                      value={option}
                      checked={isChecked}
                      onChange={() => onChange({ selected: option, otherText: isChecked ? otherText : '' })}
                      className="w-4 h-4 text-[#111111] border-[#CCCCCC] focus:ring-0 focus:outline-none"
                    />
                    <span className="text-sm select-none">{option}</span>
                  </label>
                );
              })}
            </div>

            {selected === 'Other' && (
              <div className="pt-2">
                <label className="block text-xs font-medium text-[#666663] mb-1.5">
                  Please specify your custom conversion action:
                </label>
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => onChange({ selected: 'Other', otherText: e.target.value })}
                  placeholder="e.g. Schedule a private facility tour, WhatsApp direct consultation..."
                  className="w-full text-sm px-4 py-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#94938F]"
                />
              </div>
            )}
          </div>
        );
      }

      case 'links': {
        // E.g. Q26
        const linkFields = question.linkFields || [];
        const currentLinks = (typeof value === 'object' && value !== null) ? value : {};

        const updateLinkField = (key: string, val: string) => {
          onChange({
            ...currentLinks,
            [key]: val,
          });
        };

        return (
          <div className="space-y-3.5 border border-[#EAEAEA] rounded-lg p-5 bg-[#FFFFFF]">
            {linkFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`link-${field.key}`}
                    className="text-xs font-medium text-[#111111]"
                  >
                    {field.label} {field.required && <span className="text-[#9F2F2D]">*</span>}
                  </label>
                </div>
                <input
                  id={`link-${field.key}`}
                  type="text"
                  value={currentLinks[field.key] || ''}
                  onChange={(e) => updateLinkField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#FBFBFA] border border-[#EAEAEA] rounded focus:outline-none focus:border-[#111111] focus:bg-[#FFFFFF] text-[#111111] placeholder:font-sans placeholder:text-[#94938F] transition-all"
                />
              </div>
            ))}
          </div>
        );
      }

      case 'file_upload': {
        return (
          <div className="space-y-3">
            <div className="p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg">
              <p className="text-xs text-[#666663] leading-relaxed">
                Attach whatever files, brand repositories, brochures, or recordings best communicate your business. If your files are stored in Google Drive or Dropbox, you can simply paste the share link below.
              </p>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      {renderInput()}

      {/* Inline validation error message */}
      {error && (
        <div
          role="alert"
          className="flex items-center space-x-2 text-xs text-[#9F2F2D] bg-[#FDEBEC] border border-[#FAD2D4] px-3.5 py-2.5 rounded-md transition-all"
        >
          <svg className="w-4 h-4 shrink-0 text-[#9F2F2D]" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Supplementary File Upload Zone if the question permits uploads */}
      {(question.acceptsFiles || question.type === 'file_upload') && (
        <FileUploadZone
          questionId={question.id}
          files={files}
          onAddFiles={onAddFiles}
          onRemoveFile={onRemoveFile}
          externalLink={externalLink}
          onExternalLinkChange={onExternalLinkChange}
          maxFiles={question.maxFiles}
          suggestedUploads={question.suggestedUploads}
        />
      )}
    </div>
  );
};
