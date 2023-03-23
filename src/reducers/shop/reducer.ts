import { produce } from 'immer';
import { ShopActionsType } from './actions';

export interface itemCart {
    id: number,
    name?: string,
    href?: string,
    price: number,
    inStock?: boolean,
    imageSrc?: string,
    quantity: number;
}

export interface ShopInterface {
    cart: itemCart[],
    mobileFiltersOpen: boolean,
    mobileMenuOpen: boolean,
}

interface ShopState {
    cart: itemCart[]
}

export function shopReducer(state: ShopState, action: any) {
    switch (action.type) {

        case ShopActionsType.ADD_ITEM_TO_CART: {
            const foundId = state.cart.findIndex(item => item.id === action.payload.newItem.id)
            if (foundId === -1) {
                return produce(state, (draft) => {
                    draft.cart.push(action.payload.newItem);
                });
            }
            return produce(state, (draft) => {
                draft.cart[foundId].quantity += 1;
            })
        }

        case ShopActionsType.CLEAR_CART: {
            return produce(state, (draft) => {
                draft.cart = [];
            });
        }

        case ShopActionsType.INCREASE_ITEM_TO_CART: {
            const currentProductIndex = state.cart.findIndex((item) => {
                return item.id === action.payload.id
            });

            if (currentProductIndex < 0) {
                return state
            }
            return produce(state, (draft) => {
                draft.cart[currentProductIndex].quantity += 1;
            });
        }

        case ShopActionsType.DECREASE_ITEM_TO_CART: {
            const currentProductIndex = state.cart.findIndex((item) => {
                return item.id === action.payload.id
            });

            if (currentProductIndex < 0) {
                return state
            }
            return produce(state, (draft) => {
                if (draft.cart[currentProductIndex].quantity > 0) {
                    draft.cart[currentProductIndex].quantity -= 1;
                }
            });
        }

        case ShopActionsType.REMOVE_ITEM_TO_CART: {
            const currentProductIndex = state.cart.findIndex((item) => {
                return item.id === action.payload.id
            });

            if (currentProductIndex < 0) {
                return state
            }
            return produce(state, (draft) => {
                draft.cart.splice(currentProductIndex, 1);
            });
        }
        default:
            return state
    }
}