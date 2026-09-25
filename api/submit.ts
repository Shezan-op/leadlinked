import type { VercelRequest, VercelResponse } from '@vercel/node';

interface IncomingPayload {
  clientName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  answers: Record<string, string>;
  files?: {
    questionId: string;
    name: string;
    mimeType: string;
    size: number;
    data: string; // base64 string
  }[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    const payload: IncomingPayload = req.body;

    // 1. Basic field validation
    if (!payload.clientName || !payload.clientName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Client / Business Name is required.',
      });
    }

    if (!payload.contactName || !payload.contactName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Primary Contact Person is required.',
      });
    }

    if (!payload.contactEmail || !payload.contactEmail.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Contact Email is required.',
      });
    }

    // 2. Validate environment configuration
    const appsScriptUrl = process.env.APPS_SCRIPT_WEB_APP_URL;
    const appsScriptSecret = process.env.APPS_SCRIPT_API_SECRET;

    // Local / Development mock fallback if environment variables are not yet configured in local environment
    if (!appsScriptUrl || !appsScriptSecret) {
      console.warn(
        '[LeadLinked-CTQ] APPS_SCRIPT_WEB_APP_URL or APPS_SCRIPT_API_SECRET is missing. Running in development demonstration mode.'
      );

      const generatedMockId = `LLCTQ-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      return res.status(200).json({
        success: true,
        submissionId: generatedMockId,
        message: 'Submission successfully received (Simulated development environment).',
        devNotice: 'Configure APPS_SCRIPT_WEB_APP_URL and APPS_SCRIPT_API_SECRET for live Apps Script ingestion.',
      });
    }

    // 3. Prepare payload for Google Apps Script
    // Append the API secret securely server-side; NEVER expose to client
    const scriptPayload = {
      apiKey: appsScriptSecret,
      clientName: payload.clientName.trim(),
      contactName: payload.contactName.trim(),
      contactEmail: payload.contactEmail.trim(),
      contactPhone: payload.contactPhone?.trim() || '',
      website: payload.website?.trim() || '',
      answers: payload.answers || {},
      files: (payload.files || []).map((f) => ({
        questionId: f.questionId,
        originalName: f.name,
        mimeType: f.mimeType,
        sizeBytes: f.size,
        base64Data: f.data.includes(',') ? f.data.split(',')[1] : f.data,
      })),
    };

    // 4. Forward securely to Google Apps Script Web App
    const scriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scriptPayload),
      redirect: 'follow', // Apps Script web app URLs often issue 302 redirects to script.googleusercontent.com
    });

    const scriptResultText = await scriptResponse.text();
    let scriptData: any = {};

    try {
      scriptData = JSON.parse(scriptResultText);
    } catch (parseError) {
      console.error('[LeadLinked-CTQ] Non-JSON response from Apps Script:', scriptResultText, parseError);
    }

    if (!scriptResponse.ok || scriptData.status === 'error' || scriptData.success === false) {
      return res.status(502).json({
        success: false,
        error: scriptData.message || scriptData.error || 'Downstream Apps Script service error.',
      });
    }

    // 5. Clean, sanitized response (never return internal URLs or secrets)
    return res.status(200).json({
      success: true,
      submissionId: scriptData.submissionId || scriptData.id || `LLCTQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-REC`,
      message: 'Questionnaire successfully received and stored.',
    });
  } catch (error: any) {
    console.error('[LeadLinked-CTQ] Server-side submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing the submission.',
    });
  }
}
