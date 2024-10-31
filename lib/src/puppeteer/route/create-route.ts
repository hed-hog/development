export const createRoute = async (page) => {
  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  const formCreateButtonSelector = 'form button[type="submit"]';

  await page.waitForSelector('nav a[href="/management/route"]');
  await page.click('nav a[href="/management/route"]');

  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="url"]', '/exemplo');
  await page.type('input[name="method"]', 'GET');

  await page.waitForSelector(formCreateButtonSelector);
  await page.click(formCreateButtonSelector);

  await page.waitForSelector('nav ul li a#page-9');
  await page.click('nav ul li a#page-9');
  await page.waitForFunction(
    (url, method) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const urlExists = tdElements.some((td) => td.innerText.includes(url));
      const methodExists = tdElements.some((td) =>
        td.innerText.includes(method),
      );
      return urlExists && methodExists;
    },
    {},
    '/exemplo',
    'GET',
  );
};
