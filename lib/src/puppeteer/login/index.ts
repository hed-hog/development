export const login = async (page, user) => {
  await page.goto('http://localhost:3100', {
    timeout: 0,
  });
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', user.email);

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', user.password);

  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });
};
