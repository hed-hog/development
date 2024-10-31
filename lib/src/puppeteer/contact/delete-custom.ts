export const deleteCustom = async (page) => {
  const customTabSelector = 'button[name="Custom Attributes"]';
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formDeleteButtonSelector = 'button[name="delete"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(customTabSelector);
  await page.click(customTabSelector);

  const deleteCustomButtonSelector = 'svg[name="delete-custom"]';
  await page.waitForSelector(deleteCustomButtonSelector);
  await page.click(deleteCustomButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);
};
