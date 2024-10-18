export const addAddress = async (page) => {
  const addressTabSelector = 'button[name="Addresses"]';
  const newAddressButtonSelector = 'button[name="add-address"]';
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(addressTabSelector);
  await page.click(addressTabSelector);

  await page.waitForSelector(newAddressButtonSelector);
  await page.click(newAddressButtonSelector);

  await page.type('input[name="street"]', 'Rua Teste');
  await page.type('input[name="number"]', '100');
  await page.type('input[name="complement"]', 'Just testing');
  await page.type('input[name="reference"]', 'Testing');
  await page.type('input[name="district"]', 'Ouriço');
  await page.type('input[name="city"]', 'Hcodelândia');
  await page.type('input[name="state"]', 'São Paulo');
  await page.type('input[name="postal_code"]', '00000-000');

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
