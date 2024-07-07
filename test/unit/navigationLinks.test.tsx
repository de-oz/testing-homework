import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import userEvent from '@testing-library/user-event';

import * as React from 'react';
import { Application } from '../../src/client/Application';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = { details: {}, cart: {} };
const store = mockStore(initialState);

describe('ссылки на страницы магазина отображаются и работают корректно', () => {
    test(`название магазина с ссылкой на главную страницу,
        а также ссылки на страницы каталога, доставки, контактов и корзины, отображаются`, () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Kogtetochka store' })).toBeVisible();
        expect(screen.getByRole('link', { name: 'Catalog' })).toBeVisible();
        expect(screen.getByRole('link', { name: 'Delivery' })).toBeVisible();
        expect(screen.getByRole('link', { name: /^Cart/ })).toBeVisible();
        expect(screen.getByRole('link', { name: 'Contacts' })).toBeVisible();
    });

    test('ссылка Catalog перенаправляет на страницу каталога', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeVisible();

        await userEvent.click(screen.getByRole('link', { name: 'Catalog' }));

        expect(screen.getByRole('heading', { name: 'Catalog' })).toBeVisible();
    });

    test('ссылка Delivery перенаправляет на страницу доставки', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeVisible();

        await userEvent.click(screen.getByRole('link', { name: 'Delivery' }));

        expect(screen.getByRole('heading', { name: 'Delivery' })).toBeVisible();
    });

    test('ссылка Contacts перенаправляет на страницу контактов', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeVisible();

        await userEvent.click(screen.getByRole('link', { name: 'Contacts' }));

        expect(screen.getByRole('heading', { name: 'Contacts' })).toBeVisible();
    });

    test('ссылка Cart перенаправляет на страницу корзины', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeVisible();

        await userEvent.click(screen.getByRole('link', { name: /^Cart/ }));

        expect(screen.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();
    });

    test('нажатие на название магазина перенаправляет на главную страницу', async () => {
        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();

        await userEvent.click(screen.getByRole('link', { name: 'Kogtetochka store' }));

        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeVisible();
    });
});
