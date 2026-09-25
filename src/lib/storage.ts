import type { QuestionnaireDraft } from '../types/questionnaire';

const STORAGE_KEY = 'leadlinked_ctq_draft_v1';

export const getDefaultDraft = (): QuestionnaireDraft => ({
  currentStep: 0, // 0 = Intro
  clientBasics: {
    clientName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
  },
  answers: {},
  externalMediaLinks: {},
  lastSavedAt: new Date().toISOString(),
});

export const loadStoredDraft = (): QuestionnaireDraft => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultDraft();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultDraft(),
      ...parsed,
      clientBasics: {
        ...getDefaultDraft().clientBasics,
        ...(parsed.clientBasics || {}),
      },
      answers: parsed.answers || {},
      externalMediaLinks: parsed.externalMediaLinks || {},
    };
  } catch (err) {
    console.error('Failed to load draft from localStorage:', err);
    return getDefaultDraft();
  }
};

export const saveStoredDraft = (draft: Partial<QuestionnaireDraft>): void => {
  try {
    const existing = loadStoredDraft();
    const updated: QuestionnaireDraft = {
      ...existing,
      ...draft,
      lastSavedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save draft to localStorage:', err);
  }
};

export const clearStoredDraft = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear draft from localStorage:', err);
  }
};
