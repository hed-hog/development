export const customType = async (page) => {
  // Creating custom type
  await page.waitForSelector('nav a[href="/management/persons/custom-types"]');
  await page.click('nav a[href="/management/persons/custom-types"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="name"]', 'Exemplo');

  const formCreateButtonSelector = 'form button[type="submit"]';
  await page.waitForSelector(formCreateButtonSelector);
  await page.click(formCreateButtonSelector);

  await page.waitForFunction(
    (name) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      return nameExists;
    },
    {},
    'Exemplo',
  );

  // editing custom type
  const checkboxSelector = 'table tbody tr:last-of-type td button';
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.type('input[name="name"]', ' Atualizado');

  const formEditButtonSelector = 'button[name="save"]';
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  await page.waitForFunction(
    (name) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      return nameExists;
    },
    {},
    'Exemplo Atualizado',
  );

  // deleting custom type
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  const deleteButtonSelector = 'button:has(svg.tabler-icon-trash)';
  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);

  const formDeleteButtonSelector = 'button[name="delete"]';
  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

  await page.waitForFunction(
    (name) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      return !nameExists;
    },
    {},
    'Exemplo Atualizado',
  );
};
