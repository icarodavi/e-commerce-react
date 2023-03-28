import { itemCart } from "../reducers/shop/reducer";

export const sumItem = (data: itemCart[]) => {
    const sum = data.reduce((previousValues, currentValue) => (previousValues + (Number(currentValue.price) * Number(currentValue.quantity)), 0));
    return sum;
};
