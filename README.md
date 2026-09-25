# LeadLinked-CTQ: Client Truth Questionnaire

> **Client Truth Questionnaire (CTQ)** is a reusable, strategic business-intelligence onboarding system built for **LeadLinked**.
> Designed as an editorial, high-trust digital diagnostic experience rather than a generic form, CTQ enables clients to provide comprehensive business context, strategic perspectives, and brand assets before engagement kickoff.

---

## 1. Project Overview

LeadLinked-CTQ guides clients through a section-based strategic inquiry consisting of:
- **Client Basics**: Essential business & contact coordinates.
- **30 Strategic Core Questions (Q01–Q30)**: Organized systematically into 9 thematic strategic sections (Business Foundation, Customer, Market & Competition, Brand, Marketing & Content, Sales & Conversion, Digital Presence, Assets & Execution, and Constraints & Final Input).
- **Interactive File Upload System**: Supports documents, PDFs, brand kits, images, and external cloud repository links (Google Drive, Dropbox, WeTransfer).
- **Autosave Engine**: Continuous real-time local persistence via `localStorage` with non-intrusive status indicators and draft recovery.
- **Interactive Review & Section Edit**: Complete summary screen allowing one-click jumping back to refine any answer.
- **Secure Server-side Ingestion**: Forwarding endpoint via Vercel Serverless Function `/api/submit` communicating with Google Apps Script, Google Sheets, and Google Drive without exposing secrets to the browser.

---

## 2. Tech Stack

- **Frontend Core**: React 19, TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4 with bespoke editorial tokens (`#FBFBFA` warm cream, `#111111` ink black, `#787774` stone grey, `#1F6C9F` subtle brand blue)
- **Typography**: `Bricolage Grotesque` (Headings) & `Inter` (Body) via Google Fonts
- **Deployment & Serverless Bridge**: Vercel Serverless Function (`@vercel/node`)
- **Backend Persistent Storage**: Google Sheets & Google Drive managed via deployed Google Apps Script

---

## 3. Directory Architecture

```
leadlinked-ctq/
├── api/
│   └── submit.ts                   # Vercel serverless proxy (validates & signs payload with API secret)
├── public/
│   ├── favicon.svg
│   ├── leadlinked-logo.png         # LeadLinked official brand asset
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── inputs/                 # LongText, SingleSelect, LinkFields, MultiLinks
│   │   ├── layout/                 # Minimalist editorial Header, Footer, ProgressBar
│   │   └── uploads/                # FileUploader, ExternalMediaLink
│   ├── config/
│   │   ├── brand.ts                # Centralized agency brand theme tokens & typography
│   │   └── questions.ts            # Centralized single source of truth for Q01-Q30 & sections
│   ├── hooks/
│   │   ├── useAutosave.ts          # Local draft saving & status tracking
│   │   ├── useQuestionnaire.ts     # Master questionnaire navigation & state container
│   │   └── useSubmission.ts        # API dispatcher & error handler
│   ├── lib/
│   │   ├── api.ts                  # Client fetch bridge to /api/submit
│   │   ├── storage.ts              # LocalStorage draft persistence utilities
│   │   └── validation.ts           # Human-centered validation rules
│   ├── pages/
│   │   ├── ClientBasicsStep.tsx    # System-level business & contact intake
│   │   ├── Intro.tsx               # Agency strategic onboarding welcoming briefing
│   │   ├── Questionnaire.tsx       # Dynamic question view (Q01-Q30)
│   │   ├── Review.tsx              # Pre-submission review screen with jump-to-edit
│   │   └── Success.tsx             # Post-submission confirmation & reference ID display
│   ├── types/
│   │   └── questionnaire.ts        # Type contracts for questions, submissions, answers
│   ├── App.tsx                     # Main application orchestrator
│   ├── index.css                   # Global styles & font bindings
│   └── main.tsx                    # React DOM entrypoint
├── .env.example                    # Sample environment variables
└── README.md
```

---

## 4. Environment Variables

Create a `.env` file in the root directory for local testing or configure these under **Settings > Environment Variables** on Vercel:

| Variable Name | Description | Example |
| :--- | :--- | :--- |
| `APPS_SCRIPT_WEB_APP_URL` | The deployed Apps Script Web App URL ending in `/exec` | `https://script.google.com/macros/s/AKfycb.../exec` |
| `APPS_SCRIPT_API_SECRET` | Secret token verified inside your Apps Script handler | `ll_ctq_sec_9f8d7c6b5a4` |

> **Security Guarantee**: Neither of these variables is prefixed with `VITE_`. They are **never** bundled or exposed in client-side JavaScript. Only `/api/submit` accesses them server-side.

---

## 5. Local Installation & Development

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` to explore the questionnaire.

*(Note: During local Vite development without Vercel CLI, if `APPS_SCRIPT_WEB_APP_URL` is omitted, the API handler safely falls back to a simulated dev submission with a mock `LLCTQ-YYYYMMDD-XXXXXX` reference for visual and functional verification.)*

To run both Vite and the serverless functions locally with real environment variables:
```bash
npm install -g vercel
vercel dev
```

---

## 6. How Submissions & File Uploads Work

1. **Client Draft**: Answers and files are kept in the client session. Answers are auto-persisted to `localStorage` under `leadlinked_ctq_draft_v1`.
2. **File Handling**: Uploaded files (PDFs, images, documents) are validated (up to 15MB each) and converted into base64 payloads upon submission.
3. **Large Media**: For video files or large folders, an integrated **External Cloud Link** field allows clients to paste Google Drive, Dropbox, or WeTransfer URLs.
4. **Vercel API Gateway (`/api/submit`)**:
   - Inspects client coordinates and required responses.
   - Attaches `apiKey` securely from server-side environment variables.
   - Forwards JSON payload to the Google Apps Script Web App `/exec` URL.
5. **Google Workspace Ingestion**:
   - **Submissions Sheet**: Records `submission_id`, timestamp, client contact information, and answers `q01` through `q30`.
   - **Google Drive**: Apps Script creates a dedicated submission folder `LLCTQ-YYYYMMDD-XXXXXX` inside `LeadLinked-CTQ/01 Client Submissions/`.
   - **Media Sheet**: Records metadata (`original_name`, `mime_type`, `size_bytes`, `drive_file_id`, `drive_url`) for each uploaded file.

---

## 7. How to Modify Questions or Branding

### Modifying Questions (`src/config/questions.ts`)
All 30 strategic questions and the 9 thematic sections are defined in `src/config/questions.ts`.
To alter any question's text, helper description, or file acceptance:
```typescript
{
  id: 'q04',
  sectionId: 'foundation',
  sectionTitle: 'Business Foundation',
  questionNumber: '04',
  title: 'What Makes the Business Different',
  description: 'Why should someone choose your business instead of another business offering something similar?',
  type: 'long_text',
  required: true,
  placeholder: 'Share your distinct unfair advantage, unique process...',
}
```
The UI dynamically renders inputs based on the question configuration.

### Modifying Branding (`src/config/brand.ts`)
Agency typography, colors, borders, and support links are centralized in `src/config/brand.ts`.

---

## 8. Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Import Project**.
3. Set Framework Preset to **Vite**.
4. In **Environment Variables**, add:
   - `APPS_SCRIPT_WEB_APP_URL`
   - `APPS_SCRIPT_API_SECRET`
5. Click **Deploy**.
6. Assign your custom agency domain (e.g., `ctq.leadlinked.com` or `leadlinked-ctq.vercel.app`).

---

## 9. Troubleshooting & FAQ

- **Submissions fail with 502 error**: Check that your Google Apps Script is deployed as a Web App with access set to *"Anyone"* and that `APPS_SCRIPT_API_SECRET` matches your Script Property.
- **Answers missing on refresh**: Ensure private browsing or cookies/storage blockers are not blocking `localStorage`.
- **Files failing upload**: Verify individual files are under 15MB. For video reels or large folders, encourage clients to use the provided cloud link option.
