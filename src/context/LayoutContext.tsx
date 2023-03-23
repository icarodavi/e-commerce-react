import { ReactNode, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useAllCategories } from '../hooks/useAllCategories';

interface LayoutContextType {
    mobileFiltersOpen: any,
    setMobileFiltersOpen: (value: boolean) => void,
    mobileMenuOpen: any, 
    setMobileMenuOpen: (value: boolean) => void,
    categoriesData: any,
    categoriesStatus: any
}

export const LayoutContext = createContext({} as LayoutContextType);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const queryCategories = useAllCategories();
    const { status: categoriesStatus, data: categoriesData } = queryCategories;


    return (
        <LayoutContext.Provider
            value={{
                mobileFiltersOpen, setMobileFiltersOpen,
                mobileMenuOpen, setMobileMenuOpen,
                categoriesData,
                categoriesStatus
            }}>
            {children}
        </LayoutContext.Provider>
    )

}