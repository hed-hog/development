export const users = async (page) => {
  await page.waitForSelector('nav a[href="/management/users"]');
  await page.click('nav a[href="/management/users"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);
  const inputSelectors = await page.$$('form input');
  await inputSelectors[0].type('Nome Exemplo');
  await inputSelectors[1].type('exemplo@hedhog.com');
  await inputSelectors[2].type('senhaSegura123');

  const formCreateButtonSelector = 'form button[type=submit]';
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
