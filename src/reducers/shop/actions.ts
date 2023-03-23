import { itemCart } from "./reducer";

export enum ShopActionsType {
    ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
    INCREASE_ITEM_TO_CART = "INCREASE_ITEM_TO_CART",
    DECREASE_ITEM_TO_CART = "DECREASE_ITEM_TO_CART",
    REMOVE_ITEM_TO_CART = "REMOVE_ITEM_TO_CART",
    CLEAR_CART = "CLEAR_CART",
}

export const JSONStorage = {
    key: '@shop-teste@v.1.0'
}

export function addItemToCart(newItem: itemCart) {
    return {
        type: ShopActionsType.ADD_ITEM_TO_CART,
        payload: {
            newItem,
        }
    }
}

export function removeItemToCart(id: number) {
    return {
        type: ShopActionsType.REMOVE_ITEM_TO_CART,
        payload: {
            id
        }
    }
}

export function increaseItemToCart(id: number) {
    return {
        type: ShopActionsType.INCREASE_ITEM_TO_CART,
        payload: {
            id
        }
    }
}

export function decreaseItemToCart(id: number) {
    return {
        type: ShopActionsType.DECREASE_ITEM_TO_CART,
        payload: {
            id
        }
    }
}

export function clearCart() {
    return {
        type: ShopActionsType.CLEAR_CART,
    }
}