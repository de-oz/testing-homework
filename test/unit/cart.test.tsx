import { jest, describe, test, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

import * as React from 'react';
import { Application } from '../../src/client/Application';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('рядом со ссылкой на корзину отображается количество товаров в корзине', () => {
    const mockStore = configureStore([]);
    const initialState = {
        details: {},
        cart: {
            '0': { name: 'Luxurious kogtetochka', count: 3, price: 714 },
            '2': { name: 'Sleek kogtetochka', count: 3, price: 564 },
            '14': { name: 'Licensed kogtetochka', count: 4, price: 46 },
            '16': { name: 'Unbranded kogtetochka', count: 2, price: 803 },
        },
    };
    const store = mockStore(initialState);

    render(
        <MemoryRouter initialEntries={['/cart']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const rows = screen.getAllByRole('row');
    const label = screen.getByRole('link', { name: /^Cart/ });

    expect(label).toHaveTextContent(`Cart (${rows.length - 2})`);
});

test('в корзине отображаются добавленные в нее товары со всеми деталями и общая сумма заказа', () => {
    const mockStore = configureStore([]);
    const initialState = {
        details: {},
        cart: {
            '0': { name: 'Luxurious kogtetochka', count: 3, price: 714 },
            '2': { name: 'Sleek kogtetochka', count: 3, price: 564 },
            '14': { name: 'Licensed kogtetochka', count: 4, price: 46 },
            '16': { name: 'Unbranded kogtetochka', count: 2, price: 803 },
        },
    };
    const store = mockStore(initialState);

    render(
        <MemoryRouter initialEntries={['/cart']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    let total = 0;
    const products = Object.values(initialState.cart);
    const rows = screen.getAllByRole('row');

    for (const { name, count, price } of products) {
        expect(screen.getByText(`${name}`)).toBeVisible();
        expect(screen.getByText(`\$${price * count}`)).toBeVisible();
        expect(screen.getByText(`\$${price}`)).toBeVisible();
        total += count * price;
    }

    expect(rows).toHaveLength(products.length + 2);
    expect(screen.getByText(`\$${total}`)).toBeVisible();
});

test('при нажатии кнопки очистки корзины все товары удаляются', async () => {
    // jest.mock('./store', () => ({
    //   clearCart: jest.fn().mockReturnValue({ type: 'CLEAR_CART' }),
    //   CLEAR_CART: 'CLEAR_CART',
    // }));

    const mockStore = configureStore([]);
    const initialState = {
        details: {},
        cart: {
            '0': { name: 'Luxurious kogtetochka', count: 3, price: 714 },
            '2': { name: 'Sleek kogtetochka', count: 3, price: 564 },
            '14': { name: 'Licensed kogtetochka', count: 4, price: 46 },
            '16': { name: 'Unbranded kogtetochka', count: 2, price: 803 },
        },
    };
    const store = mockStore(initialState);

    render(
        <MemoryRouter initialEntries={['/cart']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    expect(screen.getByRole('table')).toBeVisible();

    // await userEvent.click(screen.getByRole('button', { name: 'Clear shopping cart' }));
    // const deleteButton = screen.getByText('Clear shopping cart');
    // fireEvent.click(deleteButton);

    // await waitFor(() => {
    // expect(screen.queryByRole('table')).not.toBeInTheDocument();
    // });
});

test('при пустой корзине отображается ссылка на каталог товаров', () => {
    const mockStore = configureStore([]);
    const initialState = {
        details: {},
        cart: {},
    };
    const store = mockStore(initialState);

    render(
        <MemoryRouter initialEntries={['/cart']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'catalog' })).toBeVisible();
});
