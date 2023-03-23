import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css';

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './providers/ReactQuery';
import { ShopProvider } from './context/ShopContext';
import { ToastContainer }  from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ShopProvider>
                    <App />
                    <ToastContainer 
                        autoClose={1000}
                        theme="light"
                        position='top-right'
                        closeOnClick
                    />
            </ShopProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
