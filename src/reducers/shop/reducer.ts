import { produce } from 'immer';

export interface itemCart {
    id: number,
    name?: string,
    href?: string,
    price?: number,
    inStock?: boolean,
    imageSrc?: string,
}

export interface ShopInterface {
    cart: itemCart[]
}

interface ShopState {
    cart: itemCart[]
}

export function shopReducer(state: ShopState, action: any) {
    switch (action.type) {
        default:
            return state
    }
}