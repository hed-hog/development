export const editAddress = async (page) => {
  const addressTabSelector = 'button[name="Addresses"]';
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const editAddressButtonSelector = 'svg[name="edit-address"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(addressTabSelector);
  await page.click(addressTabSelector);

  await page.waitForSelector(editAddressButtonSelector);
  await page.click(editAddressButtonSelector);

  await page.type('input[name="street"]', ' Atualizada');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
