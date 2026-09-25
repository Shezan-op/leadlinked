# LeadLinked CTQ — Security Notes

**Classification:** Internal Technical Reference
**Date:** 2026-09-26

---

## 1. Architecture Security Model

The CTQ system uses a three-tier security model:

`
[Browser / Client]   ← No secrets ever reach here
       |
       | POST /api/submit  (contains ONLY form data)
       |
[Vercel Serverless]  ← ONLY tier with secret access
       |
       | Appends apiKey = APPS_SCRIPT_API_SECRET (server env var)
       | POST to APPS_SCRIPT_WEB_APP_URL (server env var)
       |
[Google Apps Script] ← Validates apiKey before processing
`

---

## 2. Environment Variables

### Required (Server-Side Only)

| Variable | Location | Notes |
|---|---|---|
| APPS_SCRIPT_WEB_APP_URL | Vercel Env Vars | The /exec URL of the deployed Apps Script |
| APPS_SCRIPT_API_SECRET | Vercel Env Vars | A strong random secret, 32+ characters |

### How to generate the secret
Run in PowerShell: `[System.Web.Security.Membership]::GeneratePassword(40, 8)`
Or use: `openssl rand -base64 32`

### Where to set them
Vercel Dashboard -> Project -> Settings -> Environment Variables
Set for: Production, Preview, Development

### NEVER:
- Prefix with VITE_ (would expose to browser bundle)
- Commit a .env file to git
- Log these values in console.error() output visible to clients

---

## 3. Apps Script Security (Required Configuration)

The Google Apps Script must validate the API secret on EVERY request:

`javascript
function doPost(e) {
  const SCRIPT_SECRET = PropertiesService.getScriptProperties().getProperty('API_SECRET');
  const payload = JSON.parse(e.postData.contents);

  // REJECT immediately if secret doesn't match
  if (payload.apiKey !== SCRIPT_SECRET) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Unauthorized' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // ... process the submission
}
`

Set the script property in Apps Script editor:
Project Settings -> Script Properties -> Add Property:
  Key: API_SECRET
  Value: (same value as APPS_SCRIPT_API_SECRET in Vercel)

---

## 4. File Upload Security

- Max file size: 8MB per file (enforced client-side + can be enforced in Apps Script)
- Max files per question: 5
- Accepted MIME types: images, PDF, Office documents, plain text, CSV
- Files converted to base64 on client, transmitted in POST body
- No files stored on Vercel infrastructure (stateless function)
- No MIME type spoofing protection beyond whitelist (Apps Script should verify)

---

## 5. Data in Transit

- All requests use HTTPS (Vercel enforces TLS by default)
- Apps Script Web App URL uses HTTPS
- CORS: Not configured (not needed — Vercel function and frontend share same domain)

---

## 6. Data at Rest

- Google Sheets: Access controlled by Google Account permissions
- Google Drive (files): Access controlled by Google Account permissions
- Browser localStorage: Draft data (form answers, no files). Cleared on submit.
- No server-side database. No Vercel KV or storage.

---

## 7. Threat Model

| Threat | Mitigation |
|---|---|
| Secret exposed in browser bundle | VITE_ prefix never used; server-only env vars |
| Secret committed to git | .env in .gitignore |
| Unauthorized Apps Script calls | apiKey validation in Apps Script |
| Direct Apps Script endpoint abuse | Apps Script URL not exposed to browser; apiKey required |
| Large file DoS | 8MB per-file limit; 5 file per question limit |
| CSRF | Not applicable (no cookie-based auth) |
| Replay attacks | Not mitigated (low risk for this use case) |
| XSS | React DOM escaping by default; no dangerouslySetInnerHTML used |

---

## 8. Incident Response

If the API secret is compromised:
1. Generate a new secret (see Section 2)
2. Update APPS_SCRIPT_API_SECRET in Vercel dashboard
3. Update API_SECRET in Apps Script Script Properties
4. Redeploy Vercel (or it will pick up new env vars on next function invocation)
5. The old secret becomes immediately invalid
