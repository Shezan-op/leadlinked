import { useState, useCallback, useRef } from 'react';
import type {
  ClientBasics,
  QuestionnaireAnswers,
  UploadedFileItem,
  ExternalMediaLinks,
  SubmissionPayload,
} from '../types/questionnaire';
import { QUESTIONS_CONFIG } from '../config/questions';
import {
  loadStoredDraft,
  saveStoredDraft,
  clearStoredDraft,
  getDefaultDraft,
} from '../lib/storage';
import { submitQuestionnaire } from '../lib/api';

export type QuestionnaireView = 'intro' | 'basics' | 'questionnaire' | 'review' | 'success';

export const useQuestionnaire = () => {
  const [view, setView] = useState<QuestionnaireView>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const draft = loadStoredDraft();
    const hasBasics = Boolean(draft.clientBasics?.clientName || draft.clientBasics?.contactEmail);
    const hasAnswers = Object.keys(draft.answers || {}).length > 0;
    if ((hasBasics || hasAnswers) && draft.currentStep >= 2 && draft.currentStep <= 31) {
      return draft.currentStep - 2;
    }
    return 0;
  });
  const [clientBasics, setClientBasics] = useState<ClientBasics>(() => {
    const draft = loadStoredDraft();
    const hasBasics = Boolean(draft.clientBasics?.clientName || draft.clientBasics?.contactEmail);
    const hasAnswers = Object.keys(draft.answers || {}).length > 0;
    return (hasBasics || hasAnswers) ? draft.clientBasics : getDefaultDraft().clientBasics;
  });
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(() => {
    const draft = loadStoredDraft();
    const hasBasics = Boolean(draft.clientBasics?.clientName || draft.clientBasics?.contactEmail);
    const hasAnswers = Object.keys(draft.answers || {}).length > 0;
    return (hasBasics || hasAnswers) ? draft.answers : {};
  });
  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [externalLinks, setExternalLinks] = useState<ExternalMediaLinks>(() => {
    const draft = loadStoredDraft();
    const hasBasics = Boolean(draft.clientBasics?.clientName || draft.clientBasics?.contactEmail);
    const hasAnswers = Object.keys(draft.answers || {}).length > 0;
    return (hasBasics || hasAnswers) ? draft.externalMediaLinks : {};
  });

  const [hasExistingDraft] = useState<boolean>(() => {
    const draft = loadStoredDraft();
    return Boolean(draft.clientBasics?.clientName || draft.clientBasics?.contactEmail || Object.keys(draft.answers || {}).length > 0);
  });
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string>('');

  const saveTimerRef = useRef<any>(null);


  // Autosave handler debounced
  const triggerAutosave = useCallback(
    (
      updatedBasics: ClientBasics,
      updatedAnswers: QuestionnaireAnswers,
      updatedLinks: ExternalMediaLinks,
      step: number
    ) => {
      setAutosaveStatus('saving');
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

      saveTimerRef.current = setTimeout(() => {
        saveStoredDraft({
          clientBasics: updatedBasics,
          answers: updatedAnswers,
          externalMediaLinks: updatedLinks,
          currentStep: step,
        });
        setAutosaveStatus('saved');
        setTimeout(() => setAutosaveStatus('idle'), 2000);
      }, 600);
    },
    []
  );

  const updateClientBasics = (newBasics: ClientBasics) => {
    setClientBasics(newBasics);
    triggerAutosave(newBasics, answers, externalLinks, 1);
  };

  const updateAnswer = (questionId: string, value: any) => {
    const nextAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(nextAnswers);
    triggerAutosave(clientBasics, nextAnswers, externalLinks, currentQuestionIndex + 2);
  };

  const updateExternalLink = (questionId: string, link: string) => {
    const nextLinks = {
      ...externalLinks,
      [questionId]: link,
    };
    setExternalLinks(nextLinks);
    triggerAutosave(clientBasics, answers, nextLinks, currentQuestionIndex + 2);
  };

  const addFiles = (newFiles: UploadedFileItem[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Navigation methods
  const startFresh = () => {
    clearStoredDraft();
    const fresh = getDefaultDraft();
    setClientBasics(fresh.clientBasics);
    setAnswers({});
    setFiles([]);
    setExternalLinks({});
    setCurrentQuestionIndex(0);
    setView('basics');
  };

  const resumeDraft = () => {
    const draft = loadStoredDraft();
    if (draft.currentStep === 1) {
      setView('basics');
    } else if (draft.currentStep >= 2 && draft.currentStep <= 31) {
      setCurrentQuestionIndex(draft.currentStep - 2);
      setView('questionnaire');
    } else if (draft.currentStep === 32) {
      setView('review');
    } else {
      setView('basics');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS_CONFIG.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      triggerAutosave(clientBasics, answers, externalLinks, nextIdx + 2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('basics');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final submission action
  const handleFinalSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    // Format all 30 questions into the structured answers dictionary
    const formattedAnswers: Record<string, string> = {};

    QUESTIONS_CONFIG.forEach((q) => {
      const val = answers[q.id];
      const cloudLink = externalLinks[q.id];

      let answerString = '';

      if (q.type === 'single_select_with_other') {
        if (val?.selected) {
          answerString = val.selected === 'Other' && val.otherText
            ? `Other: ${val.otherText}`
            : val.selected;
        }
      } else if (q.type === 'links') {
        if (typeof val === 'object' && val !== null) {
          answerString = Object.entries(val)
            .filter(([, url]) => !!url && String(url).trim().length > 0)
            .map(([k, u]) => `${k}: ${u}`)
            .join(' | ');
        }
      } else if (typeof val === 'string') {
        answerString = val.trim();
      }

      // Append external cloud link if provided for this question
      if (cloudLink && cloudLink.trim().length > 0) {
        answerString = answerString
          ? `${answerString}\n\n[Cloud Assets Link]: ${cloudLink.trim()}`
          : `[Cloud Assets Link]: ${cloudLink.trim()}`;
      }

      formattedAnswers[q.id] = answerString;
    });

    const payload: SubmissionPayload = {
      clientName: clientBasics.clientName.trim(),
      contactName: clientBasics.contactName.trim(),
      contactEmail: clientBasics.contactEmail.trim(),
      contactPhone: clientBasics.contactPhone.trim(),
      website: clientBasics.website.trim(),
      answers: formattedAnswers,
      files: files.map((f) => ({
        questionId: f.questionId,
        name: f.name,
        mimeType: f.mimeType,
        size: f.size,
        data: f.data,
      })),
    };

    const res = await submitQuestionnaire(payload);

    if (res.success) {
      setSubmissionId(res.submissionId || `LLCTQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-OK`);
      clearStoredDraft();
      setView('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmissionError(res.error || 'Submission failed. Your answers are saved.');
    }

    setIsSubmitting(false);
  };

  // Calculate overall completion percent
  const calculateProgress = (): number => {
    if (view === 'intro') return 0;
    if (view === 'basics') return 5;
    if (view === 'review' || view === 'success') return 100;

    // In questionnaire: weight basics + answered questions
    const answeredCount = QUESTIONS_CONFIG.filter((q) => {
      const val = answers[q.id];
      const hasFiles = files.some((f) => f.questionId === q.id);
      const hasLink = Boolean(externalLinks[q.id]);
      if (hasFiles || hasLink) return true;
      if (typeof val === 'string' && val.trim().length > 0) return true;
      if (val?.selected) return true;
      if (typeof val === 'object' && val !== null && Object.keys(val).length > 0) return true;
      return false;
    }).length;

    return Math.round((answeredCount / QUESTIONS_CONFIG.length) * 95) + 5;
  };

  return {
    view,
    setView,
    currentQuestionIndex,
    clientBasics,
    updateClientBasics,
    answers,
    updateAnswer,
    files,
    addFiles,
    removeFile,
    externalLinks,
    updateExternalLink,
    hasExistingDraft,
    autosaveStatus,
    isSubmitting,
    submissionError,
    submissionId,
    startFresh,
    resumeDraft,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    handleFinalSubmit,
    progressPercent: calculateProgress(),
  };
};
