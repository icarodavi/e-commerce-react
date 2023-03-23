import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './providers/ReactQuery';
import { ShopProvider } from './context/ShopContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ShopProvider>
                    <App />
            </ShopProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
