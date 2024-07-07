import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';

import * as React from 'react';
import { Application } from '../../src/client/Application';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = { details: {}, cart: {} };
const store = mockStore(initialState);

// Helper function to resize window
const resizeWindow = (width: number) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
};

describe('страница адаптируется под ширину экрана', () => {
    test('container max-width changes based on breakpoints', () => {
        const { container } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        // expect(container).toBeInTheDocument();

        const wrapper = container.querySelector('.container')!;

        // Initial width
        resizeWindow(1024);
        expect(window.getComputedStyle(container).width).toBe('600px');

        // Tablet breakpoint
        resizeWindow(768);
        expect(window.getComputedStyle(container).width).toBe('400px');

        // Mobile breakpoint
        resizeWindow(480);
        expect(window.getComputedStyle(container).width).toBe('200px');
    });
});
