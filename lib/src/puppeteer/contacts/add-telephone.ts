export const addTelephone = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const contactTabSelector = 'button[name="Contacts"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(contactTabSelector);
  await page.click(contactTabSelector);

  await page.evaluate(() => {
    const addButton = document.querySelector(
      'button[name="add-contact"]',
    ) as HTMLElement;
    if (addButton) {
      addButton.click();
    }
  });

  await page.type('input[name="value"]', '123456789');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
