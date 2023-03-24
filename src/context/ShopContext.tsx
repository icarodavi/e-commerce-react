import { ReactNode, useEffect, useReducer, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useAllCategories } from '../hooks/useAllCategories';
import { addItemToCart, clearCart, decreaseItemToCart, increaseItemToCart, JSONStorage, removeItemToCart } from '../reducers/shop/actions';
import { itemCart, shopReducer } from '../reducers/shop/reducer';

interface ShopContextType {
    mobileFiltersOpen: any,
    setMobileFiltersOpen: (value: boolean) => void,
    mobileMenuOpen: any,
    setMobileMenuOpen: (value: boolean) => void,
    categoriesData: any,
    categoriesStatus: any
    cart: itemCart[],
    contextAddItemToCart: (newItem: itemCart) => void,
    contextRemoveItemToCart: (id: number) => void,
    contextClearCart: () => void,
    contextIncreaseItemToCart: (id: number) => void,
    contextDecreaseItemToCart: (id: number) => void,
    searchQuery: null | string,
    setSearchQuery: (query: string) => void,
}

export const ShopContext = createContext({} as ShopContextType);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<null | string>('');
    
    const queryCategories = useAllCategories();
    const { status: categoriesStatus, data: categoriesData } = queryCategories;

    const INITIAL_STATE = {
        cart: [],
    }
    const [shopState, dispatch] = useReducer(
        shopReducer,
        INITIAL_STATE,
        () => {
            const storedStateAsJSON = localStorage.getItem(JSONStorage.key);

            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON);
            }

            return {
                cart: [],
            };
        },
    );

    useEffect(() => {
        const stateJSON = JSON.stringify(shopState);

        localStorage.setItem(JSONStorage.key, stateJSON);
    }, [shopState])


    function contextRemoveItemToCart(id: number) {
        dispatch(removeItemToCart(id));
    }

    function contextAddItemToCart(newItem: itemCart) {
        dispatch(addItemToCart(newItem));
    }

    function contextClearCart() {
        dispatch(clearCart());
    }

    function contextIncreaseItemToCart(id: number) {
        dispatch(increaseItemToCart(id));
    }

    function contextDecreaseItemToCart(id: number) {
        dispatch(decreaseItemToCart(id));
    }

    const { cart } = shopState;
    
    const store = {
        cart,
        searchQuery, 
        setSearchQuery,
        mobileFiltersOpen,
        setMobileFiltersOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        categoriesData,
        categoriesStatus,
        contextAddItemToCart,
        contextRemoveItemToCart,
        contextClearCart,
        contextIncreaseItemToCart,
        contextDecreaseItemToCart,
    };

    return (
        <ShopContext.Provider
            value={store}>
            {children}
        </ShopContext.Provider>
    )

}