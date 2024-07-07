it('на мобильных экранах навигационное меню скрывается за гамбургер', async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store');

    const hamburger = await browser.$('.navbar-toggler');

    await browser.setWindowSize(576, 800);

    await expect(hamburger).not.toBeDisplayed();

    await browser.setWindowSize(575, 800);

    await expect(hamburger).toBeDisplayed();
});

it('при нажатии на гамбургер появляется навигационное меню', async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store');

    const hamburger = await browser.$('.navbar-toggler');
    const menu = await browser.$('.navbar-nav');

    await browser.setWindowSize(575, 800);

    console.log(menu);
    await expect(hamburger).toBeDisplayed();
    await expect(menu).not.toBeDisplayed();

    await hamburger.click();

    await expect(menu).toBeDisplayed();
});

it('навигационное меню закрывается при нажатии на ссылку из него', async ({ browser }) => {
    await browser.url('http://localhost:3000/hw/store');

    await browser.setWindowSize(575, 800);

    const hamburger = await browser.$('.navbar-toggler');
    const menu = await browser.$('.navbar-nav');
    await hamburger.click();

    const navLink = await browser.$('.nav-link');
    await navLink.click();

    await expect(menu).not.toBeDisplayed();
});
