export const editRoleRoute = async (page) => {
  const checkboxSelector = 'table tbody tr:last-of-type td button';
  const editButtonSelector = 'button:has(svg.tabler-icon-edit)';
  const formEditButtonSelector = 'button[name="save"]';
  const roleButtonSelector = 'button[name="Roles"]';
  const checkboxListSelector = 'button#list-item';

  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  await page.waitForSelector(editButtonSelector);
  await page.click(editButtonSelector);

  await page.waitForSelector(roleButtonSelector);
  await page.click(roleButtonSelector);

  await page.waitForSelector(checkboxListSelector);
  await page.click(checkboxListSelector);

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);
};
