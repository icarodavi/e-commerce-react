import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './providers/ReactQuery';
import { LayoutProvider } from './context/LayoutContext';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <LayoutProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </LayoutProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
