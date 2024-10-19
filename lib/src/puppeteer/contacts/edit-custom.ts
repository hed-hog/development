export const editCustom = async (page) => {
  const customTabSelector = 'button[name="Custom Attributes"]';
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const editCustomButtonSelector = 'svg[name="edit-custom"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(customTabSelector);
  await page.click(customTabSelector);

  await page.waitForSelector(editCustomButtonSelector);
  await page.click(editCustomButtonSelector);

  await page.type('input[name="value"]', ' Atualizado');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
