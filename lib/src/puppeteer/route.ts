export const route = async (page) => {
  // Creating route
  await page.waitForSelector('nav a[href="/management/routes"]');
  await page.click('nav a[href="/management/routes"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="url"]', '/exemplo');
  await page.type('input[name="method"]', 'GET');

  const formCreateButtonSelector = 'form button[type="submit"]';
  await page.waitForSelector(formCreateButtonSelector);
  await page.click(formCreateButtonSelector);

  await page.waitForSelector('nav ul li a#page-9');
  await page.click('nav ul li a#page-9');
  await page.waitForFunction(
    (url, method) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const urlExists = tdElements.some((td) => td.innerText.includes(url));
      const methodExists = tdElements.some((td) =>
        td.innerText.includes(method),
      );
      return urlExists && methodExists;
    },
    {},
    '/exemplo',
    'GET',
  );

  // editing route
  const checkboxSelector = 'table tbody tr:last-of-type td button';
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.type('input[name="url"]', '-atualizado');

  const formEditButtonSelector = 'button[name="save"]';
  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  await page.waitForFunction(
    (url) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const urlExists = tdElements.some((td) => td.innerText.includes(url));
      return urlExists;
    },
    {},
    '/exemplo-atualizado',
  );

  // Verify invalid method
  await page.click(createButtonSelector);
  await page.type('input[name="url"]', '/invalid-method-test');
  await page.type('input[name="method"]', 'INVALID');
  await page.click(formCreateButtonSelector);

  const invalidMethodErrorSelector = 'div.text-sm.opacity-90:last-of-type';
  await page.waitForSelector(invalidMethodErrorSelector, { visible: true });
  const errorMessage = await page.$eval(
    invalidMethodErrorSelector,
    (el) => el.innerText,
  );
  console.log('Error Message for Invalid Method:', errorMessage);

  // editing route roles
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  const roleButtonSelector = 'button[name="Roles"]';
  await page.waitForSelector(roleButtonSelector);
  await page.click(roleButtonSelector);

  const checkboxListSelector = 'button#list-item';
  await page.waitForSelector(checkboxListSelector);
  await page.click(checkboxListSelector);

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  // editing route screens
  const screenButtonSelector = 'button[name="Screens"]';
  await page.waitForSelector(screenButtonSelector);
  await page.click(screenButtonSelector);

  await page.waitForSelector(checkboxListSelector);
  await page.click(checkboxListSelector);

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  const closeButtonSelector = 'button[name="close"]';
  await page.waitForSelector(closeButtonSelector);
  await page.click(closeButtonSelector);

  // deleting route
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  const deleteButtonSelector = 'button:has(svg.tabler-icon-trash)';
  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);

  const formDeleteButtonSelector = 'button[name="delete"]';
  await page.waitForSelector(formDeleteButtonSelector);
  await page.click(formDeleteButtonSelector);

  await page.waitForFunction(
    (url) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const urlExists = tdElements.some((td) => td.innerText.includes(url));
      return !urlExists;
    },
    {},
    '/exemplo-atualizado',
  );
};
