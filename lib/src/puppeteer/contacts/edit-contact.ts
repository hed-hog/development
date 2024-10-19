export const editContact = async (page) => {
  const checkboxSelector = 'div#grid-item:first-of-type';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector, { clickCount: 2 });

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.type('input[name="name"]', ' Atualizado');

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
};
