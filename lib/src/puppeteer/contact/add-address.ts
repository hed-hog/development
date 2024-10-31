const fillInputIfVisible = async (page, selector, value) => {
  const isInputVisible = await page.evaluate((sel) => {
    const input = document.querySelector(sel);
    return input !== null;
  }, selector);

  if (isInputVisible) {
    await page.click(selector);
    await page.type(selector, value);
  }
};

export const addAddress = async (page) => {
  const addressTabSelector = 'button[name="Addresses"]';
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(addressTabSelector);
  await page.click(addressTabSelector);

  await page.evaluate(() => {
    const addButton = document.querySelector(
      'button[name="add-address"]',
    ) as HTMLElement;
    if (addButton) {
      addButton.click();
    }
  });

  await fillInputIfVisible(page, 'input[name="street"]', 'Rua Teste');
  await fillInputIfVisible(page, 'input[name="number"]', '100');
  await fillInputIfVisible(page, 'input[name="complement"]', 'Just testing');
  await fillInputIfVisible(page, 'input[name="reference"]', 'Testing');
  await fillInputIfVisible(page, 'input[name="district"]', 'Ouriço');
  await fillInputIfVisible(page, 'input[name="city"]', 'Hcodelândia');
  await fillInputIfVisible(page, 'input[name="state"]', 'São Paulo');
  await fillInputIfVisible(page, 'input[name="postal_code"]', '00000-000');

  await page.evaluate(() => {
    const saveButton = document.querySelector(
      'button[name="save"]',
    ) as HTMLElement;
    if (saveButton) {
      saveButton.click();
    }
  });
};
