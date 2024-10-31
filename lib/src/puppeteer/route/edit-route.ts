export const editRoute = async (page) => {
  const checkboxSelector = 'table tbody tr:last-of-type td button';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.type('input[name="url"]', '-atualizado');

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  await page.waitForFunction(
    (url) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const urlExists = tdElements.some((td) => td.innerText.includes(url));
      return urlExists;
    },
    {},
    '/exemplo-atualizado',
  );
};
