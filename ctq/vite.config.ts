import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Lightweight local API mock middleware for seamless local testing without Vercel CLI
function localApiMockPlugin(): Plugin {
  return {
    name: 'local-api-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/submit' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const clientName = parsed.clientName || 'LeadLinked Client';

              // Generate standardized LLCTQ ID
              const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
              const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
              const submissionId = `LLCTQ-${dateStr}-${randomSuffix}`;

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  submissionId,
                  message: `Questionnaire for ${clientName} successfully recorded in local simulation.`,
                })
              );
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localApiMockPlugin(),
  ],
});
