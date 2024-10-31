export const editRouteScreen = async (page) => {
  const formEditButtonSelector = 'button[name="save"]';
  const screenButtonSelector = 'button[name="Screens"]';
  const closeButtonSelector = 'button[name="close"]';
  const checkboxListSelector = 'button#list-item';

  await page.waitForSelector(screenButtonSelector);
  await page.click(screenButtonSelector);

  await page.waitForSelector(checkboxListSelector);
  await page.click(checkboxListSelector);

  await page.waitForSelector(formEditButtonSelector);
  await page.click(formEditButtonSelector);

  await page.waitForSelector(closeButtonSelector);
  await page.click(closeButtonSelector);
};
