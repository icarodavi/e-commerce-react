import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { Cart } from "../pages/cart";
import { ProductsByCategory } from "../pages/category/[slug]";
import { Checkout } from "../pages/checkout";
import { Payed } from "../pages/checkout/payed";
import { Home } from "../pages/home";
import { ProductById } from "../pages/products/[id]";

function AppRoutes() {
    return (<>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />
                <Route
                    path="/category/:slug"
                    element={
                        <ProductsByCategory />
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <ProductById />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart />
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Checkout />
                    }
                />
                <Route
                    path="/payed"
                    element={
                        <Payed />
                    }
                />
            </Routes>
        </Router>
    </>);
}

export { AppRoutes }