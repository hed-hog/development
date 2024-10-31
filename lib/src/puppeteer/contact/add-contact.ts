export const createContact = async (page) => {
  const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
  const calendarButtonSelector = 'button[name="birth_at"]';
  const dayButton = 'button[name="day"]:nth-of-type(1)';
  const formCreateButtonSelector = 'form button[type="submit"]';

  await page.waitForSelector('nav a[href="/contacts"]');
  await page.click('nav a[href="/contacts"]');

  await page.waitForSelector(createButtonSelector);
  await page.click(createButtonSelector);

  await page.type('input[name="name"]', 'Gabriel Lima');
  await page.select('select[name="type_id"]', '1');

  await page.waitForSelector(calendarButtonSelector);
  await page.click(calendarButtonSelector);

  await page.waitForSelector(dayButton);
  await page.click(dayButton);

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
};
