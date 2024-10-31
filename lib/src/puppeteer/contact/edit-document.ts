export const editDocument = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const documentTabSelector = 'button[name="Documents"]';
  const editDocumentButtonSelector = 'svg[name="edit-document"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  await page.waitForSelector(editDocumentButtonSelector);
  await page.click(editDocumentButtonSelector);

  await page.type('input[name="value"]', '987654321');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
