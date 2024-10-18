export const addDocument = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const dayButton = 'button[name="day"]:nth-of-type(1)';
  const documentTabSelector = 'button[name="Documents"]';
  const newDocumentButtonSelector = 'button[name="add-document"]';
  const issueCalendarButtonSelector = 'button[name="issued_at"]';
  const expiryCalendarButtonSelector = 'button[name="expiry_at"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  await page.waitForSelector(newDocumentButtonSelector);
  await page.click(newDocumentButtonSelector);

  await page.type('input[name="value"]', '123456789');

  await page.waitForSelector(issueCalendarButtonSelector);
  await page.click(issueCalendarButtonSelector);
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  await page.waitForSelector(expiryCalendarButtonSelector);
  await page.click(expiryCalendarButtonSelector);
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
