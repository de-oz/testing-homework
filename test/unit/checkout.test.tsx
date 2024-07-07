import { test, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import userEvent from '@testing-library/user-event';

import * as React from 'react';
import { Application } from '../../src/client/Application';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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

test('кнопка оформления заказа срабатывает при валидных имени, телефоне и адресе', async () => {
    render(
        <MemoryRouter initialEntries={['/cart']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const checkoutBtn = screen.getByRole('button', { name: 'Checkout' });

    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'name');
    await userEvent.type(inputs[1], '89997278833');
    await userEvent.type(inputs[2], 'address');

    expect(inputs[0]).toHaveValue('name');
    expect(inputs[1]).toHaveValue('89997278833');
    expect(inputs[2]).toHaveValue('address');

    await userEvent.click(checkoutBtn);

    waitFor(() => {
        expect(screen.findByText('Well done!')).toBeVisible();
    });
});
