import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { ProductsByCategory } from "../pages/category/[slug]";
import { Home } from "../pages/home";
import ProductById from "../pages/products/[id]";

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
            </Routes>
        </Router>
    </>);
}

export { AppRoutes }