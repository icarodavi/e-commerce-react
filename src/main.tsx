import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import { queryClient } from "./providers/ReactQuery";
import { ShopProvider } from "./context/ShopContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ShopProvider>
                <App />
                <ToastContainer
                    autoClose={1000}
                    theme="light"
                    position="top-right"
                    closeOnClick
                />
            </ShopProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
