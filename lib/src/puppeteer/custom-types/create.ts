export const createCustomType = async (page) => {
  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  const formCreateButtonSelector = 'form button[type="submit"]';

  await page.waitForSelector('nav a[href="/management/persons/custom-types"]');
  await page.click('nav a[href="/management/persons/custom-types"]');

  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="name"]', 'Exemplo');

  await page.waitForSelector(formCreateButtonSelector);
  await page.click(formCreateButtonSelector);

  await page.waitForFunction(
    (name) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      return nameExists;
    },
    {},
    'Exemplo',
  );
};
