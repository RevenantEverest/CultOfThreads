import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { store, persistor } from '@@client/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const root = ReactDOM.createRoot(
    document.getElementById("app") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
