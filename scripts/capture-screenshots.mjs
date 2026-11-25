import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const possibleChromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

const chromePath = possibleChromePaths.find(p => fs.existsSync(p));

if (!chromePath) {
  console.error('No suitable Chrome or Edge binary found.');
  process.exit(1);
}

// Simple static HTTP server to avoid file:// security quirks and networkidle hangs
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    console.log(`[404] ${filePath}`);
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

async function capture() {
  await new Promise(resolve => server.listen(3456, '127.0.0.1', resolve));
  console.log('Local server listening at http://127.0.0.1:3456');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ]
  });

  try {
    const page = await browser.newPage();
    console.log('Navigating to http://127.0.0.1:3456/index.html');
    await page.goto('http://127.0.0.1:3456/index.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
    console.log('DOM content loaded.');

    // Wait for fonts & dismiss splash screen & enforce Dark Mode initially
    await page.evaluate(async () => {
      try {
        await document.fonts.ready;
      } catch (e) {}
      const splash = document.querySelector('.splash-screen');
      if (splash) splash.classList.add('hidden');
      const toggle = document.querySelector('#theme-switch-checkbox');
      if (toggle && !toggle.checked) {
        toggle.click();
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (toggle) toggle.checked = true;
      }
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    // 1. Dark Mode Screenshot
    const darkPath = path.join(rootDir, 'Screenshot-dark.png');
    const heroPath = path.join(rootDir, 'Screenshot.png');
    await page.screenshot({ path: darkPath, type: 'png' });
    fs.copyFileSync(darkPath, heroPath);
    console.log(`Captured Dark Mode screenshot -> ${darkPath}`);

    // 2. Switch to Light Mode via CoolThemeSwitch toggle
    await page.evaluate(() => {
      const toggle = document.querySelector('#theme-switch-checkbox');
      if (toggle) {
        toggle.click();
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    // 3. Light Mode Screenshot
    const lightPath = path.join(rootDir, 'Screenshot-light.png');
    await page.screenshot({ path: lightPath, type: 'png' });
    console.log(`Captured Light Mode screenshot -> ${lightPath}`);

    console.log('All screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err);
  server.close();
  process.exit(1);
});
