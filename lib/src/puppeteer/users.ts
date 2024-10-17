export const users = async (page) => {
  // Creating user
  await page.waitForSelector('nav a[href="/management/users"]');
  await page.click('nav a[href="/management/users"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="name"]', 'Nome Exemplo');
  await page.type('input[name="email"]', 'exemplo@hedhog.com');
  await page.type('input[type="password"', 'senhaSegura123');

  const formCreateButtonSelector = 'form button[type="submit"]';
  await page.waitForSelector(formCreateButtonSelector);
  await page.click(formCreateButtonSelector);

  await page.waitForFunction(
    (name, email) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      const emailExists = tdElements.some((td) => td.innerText.includes(email));
      return nameExists && emailExists;
    },
    {},
    'Nome Exemplo',
    'exemplo@hedhog.com',
  );

  // editing user
  const checkboxSelector = 'table tbody tr:nth-of-type(3) td button';
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
    (name, email) => {
      const tdElements = Array.from(document.querySelectorAll('td'));
      const nameExists = tdElements.some((td) => td.innerText.includes(name));
      return nameExists;
    },
    {},
    'Nome Exemplo Atualizado',
  );

  // deleting user
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
    'Nome Exemplo Atualizado',
  );
};
