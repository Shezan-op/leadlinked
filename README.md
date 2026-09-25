# LeadLinked — Digital Ecosystem

This repository is the central home for all **LeadLinked** digital products and applications.

LeadLinked is a Strategic Creative & Growth Agency.

---

## Repository Structure

`
leadlinked/
├── ctq/          ← Client Truth Questionnaire (live)
├── main/         ← Main LeadLinked website (future)
├── portfolio/    ← Portfolio showcase (future)
└── ...           ← Additional internal/client-facing tools
`

Each application lives in its own subdirectory as a self-contained unit with its own:

- package.json
- README.md
- ercel.json
- source code and assets

---

## Applications

### /ctq — Client Truth Questionnaire

The LeadLinked CTQ is a proprietary 30-question strategic business intelligence diagnostic.  
Clients complete it during onboarding to provide structured context for strategic creative work.

→ [See ctq/README.md](./ctq/README.md)

**Stack:** React 19 · Vite 8 · TypeScript 6 · Tailwind CSS 4 · Vercel Serverless · Google Apps Script

---

## Development

Each application is developed independently. Navigate into the relevant subdirectory:

`ash
cd ctq
npm install
npm run dev
`

---

## Deployment

Applications are deployed independently to Vercel.  
Each application has its own Vercel project pointing to its subdirectory.

---

## Contributing

This is a private agency repository. Internal use only.

---

*LeadLinked — Strategic Creative & Growth Agency*