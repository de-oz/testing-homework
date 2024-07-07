it('в каталоге отображаются товары, список которых приходит с сервера', async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store/catalog');

    const products = await browser.$$('.ProductItem');

    await expect(products).toBeDisplayed();
});

it(`для каждого товара в каталоге отображается название,
    цена и ссылка на страницу с подробной информацией о товаре`, async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store/catalog');

    const products = await browser.$$('.ProductItem');

    for (const product of products) {
        const [title, text, link] = await Promise.all([
            product.$('.card-title'),
            product.$('.card-text'),
            product.$('.card-link'),
        ]);

        await Promise.all([
            expect(title).toHaveTextContaining(/\S/),
            expect(text).toHaveTextContaining(/\S/),
            expect(link).toHaveTextContaining(/\S/),
        ]);
    }
});

it(`на странице с подробной информацией отображаются: название товара,
    его описание, цена, цвет, материал и кнопка "добавить в корзину"`, async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store/catalog');

    const productLink = await browser.$('.ProductItem .card-link');
    await productLink.click();

    const [name, description, price, addToCart, color, material] = await Promise.all([
        browser.$('.ProductDetails-Name'),
        browser.$('.ProductDetails-Description'),
        browser.$('.ProductDetails-Price'),
        browser.$('.ProductDetails-AddToCart'),
        browser.$('.ProductDetails-Color'),
        browser.$('.ProductDetails-Material'),
    ]);

    await Promise.all([
        expect(name).toHaveTextContaining(/\S/),
        expect(description).toHaveTextContaining(/\S/),
        expect(price).toHaveTextContaining(/\S/),
        expect(addToCart).toHaveTextContaining(/\S/),
        expect(color).toHaveTextContaining(/\S/),
        expect(material).toHaveTextContaining(/\S/),
    ]);
});

it(`если товар уже добавлен в корзину, в каталоге и на странице
    товара должно отображаться сообщение об этом`, async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store/catalog');

    const productLink = await browser.$('.ProductItem .card-link');
    await productLink.click();

    const addToCart = await browser.$('.ProductDetails-AddToCart');
    await addToCart.click();

    const itemInCart = await browser.$('.CartBadge');
    await expect(itemInCart).toHaveTextContaining('Item in cart');
});
