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

  // adding new contact
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  const contactTabSelector = 'button[name="Contacts"]';
  await page.waitForSelector(contactTabSelector);
  await page.click(contactTabSelector);

  const newContactButtonSelector = 'button[name="add-contact"]';
  await page.waitForSelector(newContactButtonSelector);
  await page.click(newContactButtonSelector);

  await page.type('input[name="value"', '123456789');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // adding new document
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  const documentTabSelector = 'button[name="Documents"]';
  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  const newDocumentButtonSelector = 'button[name="add-document"]';
  await page.waitForSelector(newDocumentButtonSelector);
  await page.click(newDocumentButtonSelector);

  await page.type('input[name="value"', '123456789');

  const issueCalendarButtonSelector = 'button[name="issued_at"]';
  await page.waitForSelector(issueCalendarButtonSelector);
  await page.click(issueCalendarButtonSelector);
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  const expiryCalendarButtonSelector = 'button[name="expiry_at"]';
  await page.waitForSelector(expiryCalendarButtonSelector);
  await page.click(expiryCalendarButtonSelector);
  await page.waitForSelector(dayButton);
  await page.click(dayButton);

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // deleting contact
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
      const h3Element = document.querySelector('h3');
      const nameInH3 = h3Element ? h3Element.innerText.includes(name) : false;
      return !nameInH3;
    },
    {},
    'Gabriel Lima Atualizado',
  );
};
