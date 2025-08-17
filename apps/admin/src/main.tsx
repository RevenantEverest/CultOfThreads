import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
    QueryClient, 
    QueryClientProvider
} from '@tanstack/react-query';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export type { RouteContext } from '@tanstack/react-router';
import type { BaseEditor } from 'slate'
import type { ReactEditor } from 'slate-react'

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
};

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const root = ReactDOM.createRoot(
    document.getElementById("app") as HTMLElement
);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ queryClient }} />
        </QueryClientProvider>
    </React.StrictMode>
);