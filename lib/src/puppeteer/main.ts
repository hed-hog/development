import puppeteer from 'puppeteer';
import { getScreenSize } from '../__tests__/utils/getScreenSize';
import { sleep } from '../__tests__/utils/sleep';
import { contacts } from './contact';
import { customType } from './custom-type';
import { login } from './login';
import { route } from './route';
import { user } from './user';

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
      slowMo: 30,
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

    await login(page, userRootData);
    await contacts(page);
    await user(page);
    await route(page);
    await customType(page);
    await sleep(60000);
    await browser.close();
  } catch (error) {
    console.error('Error Puppeteer:', error);
  }
})();
