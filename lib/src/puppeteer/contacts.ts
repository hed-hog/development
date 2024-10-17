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

  await page.type('input[name="value"]', '123456789');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // editing a contact
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(contactTabSelector);
  await page.click(contactTabSelector);

  const editContactButtonSelector = 'svg[name="edit-contact"]';
  await page.waitForSelector(editContactButtonSelector);
  await page.click(editContactButtonSelector);

  await page.type('input[name="value"]', '987654321');
  await page.click(formEditButtonSelector);

  // deleting a contact
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(contactTabSelector);
  await page.click(contactTabSelector);

  const deleteContactButtonSelector = 'svg[name="delete-contact"]';
  await page.waitForSelector(deleteContactButtonSelector);
  await page.click(deleteContactButtonSelector);

  const formDeleteButtonSelector = 'button[name="delete"]';
  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

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

  await page.type('input[name="value"]', '123456789');

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // editing a document
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  const editDocumentButtonSelector = 'svg[name="edit-document"]';
  await page.waitForSelector(editDocumentButtonSelector);
  await page.click(editDocumentButtonSelector);

  await page.type('input[name="value"]', '987654321');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // deleting a document
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(documentTabSelector);
  await page.click(documentTabSelector);

  const deleteDocumentButtonSelector = 'svg[name="delete-document"]';
  await page.waitForSelector(deleteDocumentButtonSelector);
  await page.click(deleteDocumentButtonSelector);

  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

  // adding new address
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  const addressTabSelector = 'button[name="Addresses"]';
  await page.waitForSelector(addressTabSelector);
  await page.click(addressTabSelector);

  const newAddressButtonSelector = 'button[name="add-address"]';
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

  // editing an address
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(addressTabSelector);
  await page.click(addressTabSelector);

  const editAddressButtonSelector = 'svg[name="edit-address"]';
  await page.waitForSelector(editAddressButtonSelector);
  await page.click(editAddressButtonSelector);

  await page.type('input[name="street"]', 'Rua Teste Atualizada');
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // deleting an address
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

  // deleting contact
  const deleteButtonSelector = 'button:has(svg.tabler-icon-trash)';
  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);

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
