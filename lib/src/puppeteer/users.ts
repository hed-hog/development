export const users = async (page) => {
  // Navigate to the users page
  await page.waitForSelector('nav a[href="/management/users"]');
  await page.click('nav a[href="/management/users"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Click the "Create" button
  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.$eval('input[name="name"]', (el) => (el.value = 'Nome Exemplo'));
  await page.$eval(
    'input[name="email"]',
    (el) => (el.value = 'exemplo@hedhog.com'),
  );
  await page.$eval(
    'input[type="password"]',
    (el) => (el.value = 'senhaSegura123'),
  );

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
};
