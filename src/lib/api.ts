import type { SubmissionPayload, SubmissionResponse } from '../types/questionnaire';

export const submitQuestionnaire = async (payload: SubmissionPayload): Promise<SubmissionResponse> => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || 'Unable to submit questionnaire. Please try again.',
      };
    }

    return {
      success: true,
      submissionId: data.submissionId,
      message: data.message || 'Questionnaire successfully submitted.',
    };
  } catch (err: any) {
    console.error('Submission API error:', err);
    return {
      success: false,
      error: 'Network connection issue. Your answers are saved locally. Please try again.',
    };
  }
};
