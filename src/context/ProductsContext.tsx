import { ReactNode, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useAllCategories } from '../hooks/useAllCategories';

interface ProductsContextType {
    mobileFiltersOpen: any,
    setMobileFiltersOpen: (value: boolean) => void,
    mobileMenuOpen: any, 
    setMobileMenuOpen: (value: boolean) => void,
    categoriesData: any,
    categoriesStatus: any
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const queryCategories = useAllCategories();
    const { status: categoriesStatus, data: categoriesData } = queryCategories;


    return (
        <ProductsContext.Provider
            value={{
                mobileFiltersOpen, setMobileFiltersOpen,
                mobileMenuOpen, setMobileMenuOpen,
                categoriesData,
                categoriesStatus
            }}>
            {children}
        </ProductsContext.Provider>
    )

}