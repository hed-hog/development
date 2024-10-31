export const deleteDocument = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const documentTabSelector = 'button[name="Documents"]';
  const formDeleteButtonSelector = 'button[name="delete"]';
  const deleteDocumentButtonSelector = 'svg[name="delete-document"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  await page.waitForSelector(deleteDocumentButtonSelector);
  await page.click(deleteDocumentButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);
};
