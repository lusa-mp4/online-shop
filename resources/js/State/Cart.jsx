import React, { useReducer, createContext } from "react";

function reducer(state, action) {
    switch (action.type) {
        case "add item": {
            const foundItem = state.find((v) => v.item.id === action.item.id);
            if (foundItem && foundItem.item.amount === foundItem.amount) {
                return state;
            }

            const newItem = foundItem
                ? { item: action.item, amount: foundItem.amount + 1 }
                : { item: action.item, amount: 1 };
            const newState = [
                ...state.filter((v) => v.item.id !== action.item.id),
                newItem,
            ];
            return newState;
        }
        case "remove item": {
            const foundItem = state.find((v) => v.item.id === action.item.id);
            if (foundItem.amount > 1) {
                const newItem = {
                    item: action.item,
                    amount: foundItem.amount - 1,
                };
                return [
                    ...state.filter((v) => v.item.id !== action.item.id),
                    newItem,
                ];
            } else if (foundItem.amount <= 1) {
                return state.filter((v) => v.item.id !== action.item.id);
            } else {
                return state;
            }
        }
        case "clear cart": {
            return [];
        }
        default: {
            console.log("Wrong action type");
            return state;
        }
    }
}

function wrappedReducer(state, action) {
    const newState = reducer(state, action);
    newState.sort((a, b) => a.item.id - b.item.id);
    localStorage.setItem("cart", JSON.stringify(newState));
    return newState;
}

export const CartContext = createContext([]);

export function CartProvider({ children }) {
    const getStorageCart = localStorage.getItem("cart");
    const initialCart =
        getStorageCart && getStorageCart.length > 0
            ? JSON.parse(getStorageCart)
            : [];
    const reducerVal = useReducer(wrappedReducer, initialCart);
    return (
        <CartContext.Provider value={reducerVal}>
            {children}
        </CartContext.Provider>
    );
}
