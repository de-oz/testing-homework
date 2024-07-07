import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';

import * as React from 'react';
import { Application } from '../../src/client/Application';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = { details: {}, cart: {} };
const store = mockStore(initialState);

describe('магазин содержит страницы: главная, каталог, доставка, контакты, корзина', () => {
    test('главная страница существует и отображается', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeVisible();
    });

    test('страница каталога существует и отображается', async () => {
        render(
            <MemoryRouter initialEntries={['/catalog']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Catalog' })).toBeVisible();
    });

    test('страница доставки существует и отображается', async () => {
        render(
            <MemoryRouter initialEntries={['/delivery']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Delivery' })).toBeVisible();
    });

    test('страница контактов существует и отображается', async () => {
        render(
            <MemoryRouter initialEntries={['/contacts']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Contacts' })).toBeVisible();
    });

    test('страница корзины существует и отображается', async () => {
        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();
    });
});
