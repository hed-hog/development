import puppeteer from 'puppeteer';
import { sleep } from '../__tests__/utils/sleep';
import { getScreenSize } from '../__tests__/utils/getScreenSize';

const userRootData = {
  email: 'root@hedhog.com',
  password: 'hedhog',
  token: '',
  id: 0,
};

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized'],
      timeout: 0,
      slowMo: 10,
    });
    const page = await browser.newPage();
    const pages = await browser.pages();

    if (pages.length > 1) {
      pages[0].close();
    }

    const { height, width } = getScreenSize();

    await page.setViewport({ width, height: height - 100 });

    await page.goto('http://localhost:3100', {
      timeout: 0,
    });

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', userRootData.email);

    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', userRootData.password);

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('nav a[href="/management/users"]');
    await page.click('nav a[href="/management/users"]');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await sleep(60000);

    await browser.close();
  } catch (error) {
    console.error('Error Puppeteer:', error);
  }
})();
