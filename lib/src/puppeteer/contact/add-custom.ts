import { createCustomType } from '../custom-type/create';

export const addCustom = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const customTabSelector = 'button[name="Custom Attributes"]';
  const formEditButtonSelector = 'button[name="save"]';
  const selectTypeIdSelector = 'select[name="type_id"]';

  await createCustomType(page);

  await page.waitForSelector('nav a[href="/contacts"]');
  await page.click('nav a[href="/contacts"]');

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(customTabSelector);
  await page.click(customTabSelector);

  await page.evaluate(() => {
    const addButton = document.querySelector(
      'button[name="add-custom"]',
    ) as HTMLElement;
    if (addButton) {
      addButton.click();
    }
  });

  await page.waitForSelector(selectTypeIdSelector);

  await page.evaluate((selector) => {
    const selectElement = document.querySelector(selector);
    const options = Array.from(selectElement.options);
    const optionToSelect = options.find(
      (option) => parseInt((option as any).value) >= 1,
    );

    if (optionToSelect) {
      selectElement.value = (optionToSelect as any).value;
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, selectTypeIdSelector);

  await page.type('input[name="name"]', 'Nome do Atributo');
  await page.type('input[name="value"]', 'Valor do Atributo');

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
