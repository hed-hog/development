export const verifyInvalidMethod = async (page) => {
    const createButtonSelector = 'button:has(svg.tabler-icon-plus)';
    const formCreateButtonSelector = 'form button[type="submit"]';
    
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
  
};
