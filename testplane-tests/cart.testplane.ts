it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async ({
    browser,
}) => {
    await browser.url('http://localhost:3000/hw/store/catalog');

    const productLink = await browser.$('.ProductItem .card-link');
    await productLink.click();

    const addToCart = await browser.$('.ProductDetails-AddToCart');
    await addToCart.click();

    await browser.url('http://localhost:3000/hw/store/cart');

    const table = await browser.$('.table');

    await expect(table).toBeDisplayed();

    const clearBtn = await browser.$('.Cart-Clear');
    await clearBtn.click();

    await expect(table).not.toBeDisplayed();
});
