export const createUser = async (page) => {
  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  const formCreateButtonSelector = 'form button[type="submit"]';

  await page.waitForSelector('nav a[href="/management/users"]');
  await page.click('nav a[href="/management/users"]');

  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="name"]', 'Nome Exemplo');
  await page.type('input[name="email"]', 'exemplo@hedhog.com');
  await page.type('input[type="password"', 'senhaSegura123');

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
};
