export const deleteTelephone = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const contactTabSelector = 'button[name="Contacts"]';
  const deleteContactButtonSelector = 'svg[name="delete-contact"]';
  const formDeleteButtonSelector = 'button[name="delete"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(contactTabSelector);
  await page.click(contactTabSelector);

  await page.waitForSelector(deleteContactButtonSelector);
  await page.click(deleteContactButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);
};
