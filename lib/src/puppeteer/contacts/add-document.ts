export const addDocument = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const dayButton = 'button[name="day"]:nth-of-type(1)';
  const documentTabSelector = 'button[name="Documents"]';
  const issueCalendarButtonSelector = 'button[name="issued_at"]';
  const expiryCalendarButtonSelector = 'button[name="expiry_at"]';
  const inputValueSelector = 'input[name="value"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  await page.evaluate(() => {
    const addButton = document.querySelector(
      'button[name="add-document"]',
    ) as HTMLElement;
    if (addButton) {
      addButton.click();
    }
  });

  const isInputVisible = await page.evaluate(() => {
    const input = document.querySelector('input[name="value"]');
    return input !== null;
  });

  if (isInputVisible) {
    await page.click(inputValueSelector);
    await page.type(inputValueSelector, '123456789');
  }

  await page.waitForSelector(issueCalendarButtonSelector);
  await page.click(issueCalendarButtonSelector);
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  await page.waitForSelector(expiryCalendarButtonSelector);
  await page.click(expiryCalendarButtonSelector);
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  await page.evaluate(() => {
    const saveButton = document.querySelector(
      'button[name="save"]',
    ) as HTMLElement;
    if (saveButton) {
      saveButton.click();
    }
  });
};
