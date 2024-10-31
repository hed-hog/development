export const deleteAddress = async (page) => {
  const addressTabSelector = 'button[name="Addresses"]';
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formDeleteButtonSelector = 'button[name="delete"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(addressTabSelector);
  await page.click(addressTabSelector);

  const deleteAddressButtonSelector = 'svg[name="delete-address"]';
  await page.waitForSelector(deleteAddressButtonSelector);
  await page.click(deleteAddressButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);
};
