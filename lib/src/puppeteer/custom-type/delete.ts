export const deleteCustomType = async (page) => {
  const checkboxSelector = 'table tbody tr:last-of-type td button';
  const deleteButtonSelector = 'button:has(svg.tabler-icon-trash)';
  const formDeleteButtonSelector = 'button[name="delete"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

  await page.waitForFunction(
    (name) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      return !nameExists;
    },
    {},
    'Exemplo Atualizado',
  );
};
