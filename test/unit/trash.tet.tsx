import { describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import events from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as React from 'react';
import { initStore } from '../../src/client/store';

const getUser = () => {
  return Promise.resolve({ id: '1', name: 'Robin' });
};

function App() {
    const [search, setSearch] = React.useState('');
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        loadUser();
    }, []);

    function handleChange(event: any) {
        setSearch(event.target.value);
    }

    return (
        <div>
            {user ? <p>Signed in as {user.name}</p> : null}

            <input
                value={search}
                onChange={handleChange} />

            <p>Searches for {search ? search : '...'}</p>
        </div>
    );
}

describe('true is truthy and false is falsy', () => {
    // test('renders Application component', async () => {
    // const store = initStore();
    // const component = <div>Trash</div>;

    // render(
    // <Provider store={store}>
    // component
    // </Provider>
    // );

    // expect(await screen.findByText('Trash')).toBeInTheDocument();
    test('najd', async () => {
        render(<App />);

        expect(screen.queryByText(/Signed in as/)).toBeNull();

        screen.debug();

        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();

        screen.debug();
    });
});
