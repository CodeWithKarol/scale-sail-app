import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { config } from 'dotenv';
import express from 'express';
import { join } from 'node:path';

// Load .env file if available
config();

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
app.get('/api/gumroad/products', async (req, res) => {
  const token = process.env['GUMROAD_ACCESS_TOKEN'];
  if (!token) {
    console.error(
      'Error: GUMROAD_ACCESS_TOKEN is missing. Set it in .env (local) or Vercel Dashboard (production).'
    );
    res.status(500).json({ error: 'Server configuration error: Missing Access Token' });
    return;
  }
  try {
    const response = await fetch(`https://api.gumroad.com/v2/products?access_token=${token}`);
    if (!response.ok) {
      const text = await response.text();
      console.error('Gumroad API Error:', response.status, text);
      res.status(response.status).json({ error: 'Gumroad API failed', details: text });
      return;
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: String(error) });
  }
});

app.get('/api/gumroad/products/:id', async (req, res) => {
  const { id } = req.params;
  const token = process.env['GUMROAD_ACCESS_TOKEN'];
  if (!token) {
    console.error(
      'Error: GUMROAD_ACCESS_TOKEN is missing. Set it in .env (local) or Vercel Dashboard (production).'
    );
    res.status(500).json({ error: 'Server configuration error: Missing Access Token' });
    return;
  }
  try {
    const response = await fetch(`https://api.gumroad.com/v2/products/${id}?access_token=${token}`);
    if (!response.ok) {
      const text = await response.text();
      console.error('Gumroad API Error:', response.status, text);
      res.status(response.status).json({ error: 'Gumroad API failed', details: text });
      return;
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch product', details: String(error) });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
