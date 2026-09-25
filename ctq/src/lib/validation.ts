import type { ClientBasics, QuestionConfig } from '../types/questionnaire';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateClientBasics = (basics: ClientBasics): { isValid: boolean; errors: Partial<Record<keyof ClientBasics, string>> } => {
  const errors: Partial<Record<keyof ClientBasics, string>> = {};

  if (!basics.clientName || !basics.clientName.trim()) {
    errors.clientName = 'Please provide your company or business name.';
  }

  if (!basics.contactName || !basics.contactName.trim()) {
    errors.contactName = 'Please provide the name of the primary contact person.';
  }

  if (!basics.contactEmail || !basics.contactEmail.trim()) {
    errors.contactEmail = 'Please provide an email address where we can reach you.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(basics.contactEmail.trim())) {
      errors.contactEmail = 'Please enter a valid email address.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateQuestionAnswer = (
  question: QuestionConfig,
  answer: any,
  hasFilesOrLinks: boolean = false
): ValidationResult => {
  if (!question.required) {
    return { isValid: true };
  }

  if (question.type === 'file_upload') {
    if (!hasFilesOrLinks) {
      return {
        isValid: false,
        message: 'Please upload at least one relevant asset or provide an external link to continue.',
      };
    }
    return { isValid: true };
  }

  if (question.type === 'links') {
    // E.g. Q26
    const website = answer?.website;
    if (!website || !String(website).trim()) {
      return {
        isValid: false,
        message: 'Please provide at least your primary website URL before proceeding.',
      };
    }
    return { isValid: true };
  }

  if (question.type === 'single_select_with_other') {
    const selected = answer?.selected;
    if (!selected) {
      return {
        isValid: false,
        message: 'Please select the primary conversion action for your business.',
      };
    }
    if (selected === 'Other' && (!answer?.otherText || !String(answer.otherText).trim())) {
      return {
        isValid: false,
        message: 'Please specify your conversion action in the field provided.',
      };
    }
    return { isValid: true };
  }

  // long_text and long_text_with_links
  if (typeof answer !== 'string' || !answer.trim()) {
    return {
      isValid: false,
      message: 'Tell us a little more about this before continuing. Every detail helps us build context.',
    };
  }

  if (answer.trim().length < 5) {
    return {
      isValid: false,
      message: 'A bit more detail will help us deliver a much sharper strategic result.',
    };
  }

  return { isValid: true };
};
