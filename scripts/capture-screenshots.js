import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
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

console.log(`Using browser executable: ${chromePath}`);

async function capture() {
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
      '--disable-dev-shm-usage',
      '--allow-file-access-from-files'
    ]
  });

  try {
    const page = await browser.newPage();
    const indexUrl = 'file:///' + path.join(rootDir, 'index.html').replace(/\\/g, '/');
    console.log(`Navigating to: ${indexUrl}`);
    await page.goto(indexUrl, { waitUntil: 'networkidle0', timeout: 15000 });

    // Ensure splash screen is hidden and fonts/animations settled
    await page.evaluate(() => {
      const splash = document.querySelector('.splash-screen');
      if (splash) splash.classList.add('hidden');
      document.documentElement.setAttribute('data-theme', 'dark');
      const toggle = document.querySelector('#theme-toggle-cb');
      if (toggle) toggle.checked = false;
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    // 1. Dark Mode Screenshot
    const darkPath = path.join(rootDir, 'Screenshot-dark.png');
    const heroPath = path.join(rootDir, 'Screenshot.png');
    await page.screenshot({ path: darkPath, type: 'png' });
    fs.copyFileSync(darkPath, heroPath);
    console.log(`Captured Dark Mode screenshot -> ${darkPath} & ${heroPath}`);

    // 2. Switch to Light Mode
    await page.evaluate(() => {
      const toggle = document.querySelector('#theme-toggle-cb');
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
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
  }
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
