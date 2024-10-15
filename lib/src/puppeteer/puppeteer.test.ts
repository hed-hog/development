import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false }); // Set to true for headless mode
  const page = await browser.newPage();

  // Navigate to a URL
  await page.goto('https://developer.chrome.com/');

  // Set viewport size
  await page.setViewport({ width: 1280, height: 800 });

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait for the first result and click
  await page.waitForSelector('.devsite-result-item-link'); // Changed to waitForSelector
  await page.click('.devsite-result-item-link');

  // Wait for the title and get its text using CSS selector
  await page.waitForSelector('.gs-title'); // Substitua pelo seletor correto do título
  const fullTitle = await page.$eval('.gs-title', (el) => el.textContent);

  // Print the title
  console.log('The title of this blog post is "%s".', fullTitle.trim());

  // Close the browser
  await browser.close();
})();
