export const deleteContact = async (page) => {
  const formDeleteButtonSelector = 'button[name="delete"]';
  const deleteButtonSelector = 'button:has(svg.tabler-icon-trash)';

  await page.waitForSelector('nav a[href="/contacts"]');
  await page.click('nav a[href="/contacts"]');

  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

  await page.waitForFunction(
    (name) => {
      const h3Element = document.querySelector('h3');
      const nameInH3 = h3Element ? h3Element.innerText.includes(name) : false;
      return !nameInH3;
    },
    {},
    'Gabriel Lima Atualizado',
  );
};
