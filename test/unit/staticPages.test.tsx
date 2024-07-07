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

describe('страницы главная, доставка и контакты имеют статическое содержимое', () => {
    test('главная страница имеет статическое содержимое', () => {
        const { container } = render(
            <MemoryRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('страница доставки имеет статическое содержимое', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/delivery']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('страница контактов имеет статическое содержимое', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/contacts']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});
