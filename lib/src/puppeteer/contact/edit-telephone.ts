export const editTelephone = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const contactTabSelector = 'button[name="Contacts"]';
  const editContactButtonSelector = 'svg[name="edit-contact"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(contactTabSelector);
  await page.click(contactTabSelector);

  await page.waitForSelector(editContactButtonSelector);
  await page.click(editContactButtonSelector);

  await page.type('input[name="value"]', '987654321');
  await page.click(formEditButtonSelector);
};
