import { ReactNode, useEffect, useReducer, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useAllCategories } from '../hooks/useAllCategories';
import { JSONStorage, ShopActionsType } from '../reducers/shop/actions';
import { itemCart, shopReducer } from '../reducers/shop/reducer';

interface ShopContextType {
    mobileFiltersOpen: any,
    setMobileFiltersOpen: (value: boolean) => void,
    mobileMenuOpen: any,
    setMobileMenuOpen: (value: boolean) => void,
    categoriesData: any,
    categoriesStatus: any
    cart?: itemCart[],
}

export const ShopContext = createContext({} as ShopContextType);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const queryCategories = useAllCategories();
    const { status: categoriesStatus, data: categoriesData } = queryCategories;


    const [shopState, dispatch] = useReducer(shopReducer,{
        cart: [],
        mobileFiltersOpen: mobileFiltersOpen,
        mobileMenuOpen: mobileMenuOpen,
    }, () => {
        const storedStateAsJSON = localStorage.getItem(JSONStorage.key);

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON);
        }
    },);

    useEffect(() => {
        const stateJSON = JSON.stringify(shopState);

        localStorage.setItem(JSONStorage.key, stateJSON);
    },[shopState])

    return (
        <ShopContext.Provider
            value={{
                mobileFiltersOpen, setMobileFiltersOpen,
                mobileMenuOpen, setMobileMenuOpen,
                categoriesData,
                categoriesStatus
            }}>
            {children}
        </ShopContext.Provider>
    )

}