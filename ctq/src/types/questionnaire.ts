export type QuestionType =
  | 'long_text'
  | 'long_text_with_links'
  | 'single_select_with_other'
  | 'links'
  | 'file_upload';

export interface QuestionLinkField {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export interface QuestionConfig {
  id: string; // e.g. 'q01' ... 'q30'
  sectionId: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  title: string;
  description: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  acceptsFiles?: boolean;
  maxFiles?: number;
  suggestedUploads?: string[];
  options?: string[];
  linkFields?: QuestionLinkField[];
}

export interface ClientBasics {
  clientName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
}

export interface UploadedFileItem {
  id: string;
  questionId: string;
  name: string;
  mimeType: string;
  size: number;
  data: string; // base64 data URL
}

export interface QuestionnaireAnswers {
  [key: string]: any;
}

export interface ExternalMediaLinks {
  [questionId: string]: string; // URL link to Drive, Dropbox, WeTransfer etc.
}

export interface QuestionnaireDraft {
  currentStep: number; // 0 = Intro, 1 = Basics, 2..31 = Questions (q01-q30), 32 = Review, 33 = Success
  clientBasics: ClientBasics;
  answers: QuestionnaireAnswers;
  externalMediaLinks: ExternalMediaLinks;
  lastSavedAt: string;
}

export interface SubmissionPayload {
  clientName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  answers: {
    [key: string]: string | number | null | undefined;
  };
  files: {
    questionId: string;
    name: string;
    mimeType: string;
    size: number;
    data: string;
  }[];
}

export interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  message?: string;
  error?: string;
}
