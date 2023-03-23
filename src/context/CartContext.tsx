import { ReactNode, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useAllCategories } from '../hooks/useAllCategories';

interface CartContextType {
    products: [
        {
            id: number,
            name?: string,
            href?: string,
            price?: number,
            inStock?: boolean,
            imageSrc?: string,
        },]
}

export const CartContext = createContext({} as Partial<CartContextType>);

export function CartProvider({ children }: { children: ReactNode }) {
    return (
        <CartContext.Provider
            value={{
                products: [{ id: 1, }]
            }}>
            {children}
        </CartContext.Provider>
    )

}