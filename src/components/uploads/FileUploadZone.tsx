import React, { useRef, useState } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import type { UploadedFileItem } from '../../types/questionnaire';

interface FileUploadZoneProps {
  questionId: string;
  files: UploadedFileItem[];
  onAddFiles: (files: UploadedFileItem[]) => void;
  onRemoveFile: (fileId: string) => void;
  externalLink: string;
  onExternalLinkChange: (link: string) => void;
  maxFiles?: number;
  suggestedUploads?: string[];
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  questionId,
  files,
  onAddFiles,
  onRemoveFile,
  externalLink,
  onExternalLinkChange,
  maxFiles = BRAND_CONFIG.limits.maxTotalFilesPerQuestion,
  suggestedUploads,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const processFileList = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage(null);

    const remainingSlots = maxFiles - files.length;
    if (remainingSlots <= 0) {
      setErrorMessage(`Maximum limit of ${maxFiles} files reached for this item.`);
      return;
    }

    const filesToProcess = Array.from(fileList).slice(0, remainingSlots);
    const validItems: UploadedFileItem[] = [];

    for (const file of filesToProcess) {
      if (file.size > BRAND_CONFIG.limits.maxSingleFileSizeMB * 1024 * 1024) {
        setErrorMessage(
          `"${file.name}" exceeds ${BRAND_CONFIG.limits.maxSingleFileSizeMB}MB. For larger files or videos, please paste a cloud link below.`
        );
        continue;
      }

      try {
        const base64Data = await readFileAsBase64(file);
        validItems.push({
          id: crypto.randomUUID(),
          questionId,
          name: file.name,
          mimeType: file.type || 'application/octet-stream',
          size: file.size,
          data: base64Data,
        });
      } catch (err) {
        console.error('Failed reading file:', err);
      }
    }

    if (validItems.length > 0) {
      onAddFiles(validItems);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  };

  return (
    <div className="mt-5 space-y-4">
      {/* Upload boundary */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border border-dashed rounded-lg p-6 sm:p-7 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-[#111111] bg-[#F7F6F3]'
            : 'border-[#EAEAEA] bg-[#FFFFFF] hover:border-[#CCCCCC] hover:bg-[#FAF9F7]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => processFileList(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-md bg-[#F7F6F3] border border-[#EAEAEA] flex items-center justify-center text-[#111111]">
            <svg
              className="w-5 h-5 text-[#666663]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>

          <div className="text-sm font-medium text-[#111111]">
            Drop assets here or <span className="underline decoration-1 underline-offset-2">browse files</span>
          </div>
          <p className="text-xs text-[#787774] max-w-sm">
            PDFs, images, decks, docs (Up to {BRAND_CONFIG.limits.maxSingleFileSizeMB}MB each. Maximum {maxFiles} files).
          </p>
        </div>
      </div>

      {/* Suggested Uploads Tags */}
      {suggestedUploads && suggestedUploads.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#787774]">
          <span className="font-medium text-[#111111]">Helpful examples:</span>
          {suggestedUploads.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-[#F7F6F3] border border-[#EAEAEA] text-[#444442]"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Error state */}
      {errorMessage && (
        <div className="p-3 text-xs text-[#9F2F2D] bg-[#FDEBEC] border border-[#FAD2D4] rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Attached Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#787774]">
            Attached Files ({files.length}/{maxFiles})
          </div>
          <div className="divide-y divide-[#EAEAEA] border border-[#EAEAEA] rounded-md bg-[#FFFFFF] overflow-hidden">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 text-sm hover:bg-[#FBFBFA] transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0 pr-3">
                  <div className="w-7 h-7 rounded bg-[#F7F6F3] border border-[#EAEAEA] flex items-center justify-center shrink-0 text-xs font-mono text-[#666663]">
                    {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#111111] truncate">{file.name}</p>
                    <p className="text-[11px] text-[#787774] font-mono">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                  className="text-xs text-[#787774] hover:text-[#9F2F2D] px-2 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Large Media Link (Google Drive / WeTransfer / Dropbox) */}
      <div className="p-4 border border-[#EAEAEA] rounded-md bg-[#FFFFFF] space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[#111111]">
            Large media or cloud folder?
          </label>
          <span className="text-[11px] text-[#787774]">Video, raw footage, or heavy files</span>
        </div>
        <input
          type="url"
          value={externalLink}
          onChange={(e) => onExternalLinkChange(e.target.value)}
          placeholder="Paste Google Drive, Dropbox, or WeTransfer URL here..."
          className="w-full text-xs px-3 py-2 bg-[#FBFBFA] border border-[#EAEAEA] rounded focus:outline-none focus:border-[#111111] focus:bg-[#FFFFFF] text-[#111111] transition-all font-mono placeholder:font-sans placeholder:text-[#94938F]"
        />
      </div>
    </div>
  );
};
