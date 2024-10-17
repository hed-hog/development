export const contacts = async (page) => {
  // Creating contact
  await page.waitForSelector('nav a[href="/contacts"]');
  await page.click('nav a[href="/contacts"]');

  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="name"]', 'Gabriel Lima');
  await page.select('select[name="type_id"]', '1');

  const calendarButtonSelector = 'button[name="birth_at"]';
  await page.waitForSelector(calendarButtonSelector);
  await page.click(calendarButtonSelector);

  const dayButton = 'button[name="day"]:nth-of-type(1)';
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  const formCreateButtonSelector = 'form button[type="submit"]';
  await page.waitForSelector(formCreateButtonSelector);
  await page.click(formCreateButtonSelector);

  await page.waitForFunction(
    (name) => {
      const h3Element = document.querySelector('h3');
      const nameInH3 = h3Element ? h3Element.innerText.includes(name) : false;
      return nameInH3;
    },
    {},
    'Gabriel Lima',
  );

  // editing contact
  const checkboxSelector = 'div#grid-item:first-of-type';
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.type('input[name="name"]', ' Atualizado');

  const formEditButtonSelector = 'button[name="save"]';
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  await page.waitForFunction(
    (name) => {
      const h3Element = document.querySelector('h3');
      const nameInH3 = h3Element ? h3Element.innerText.includes(name) : false;
      return nameInH3;
    },
    {},
    'Gabriel Lima Atualizado',
  );

  // deleting contact
  const deleteButtonSelector = 'button:has(svg.tabler-icon-trash)';
  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);

  const formDeleteButtonSelector = 'button[name="delete"]';
  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

  await page.waitForFunction(
    (name) => {
      const h3Element = document.querySelector('h3');
      const nameInH3 = h3Element ? h3Element.innerText.includes(name) : false;
      return !nameInH3;
    },
    {},
    'Gabriel Lima Atualizado',
  );
};
