import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const inStore = state.items.find(i => {
                return (
                    i.id === action.payload.id && i.size === action.payload.size
                );
            });
            if (inStore) {
                inStore.count += action.payload.count;
            } else {
                state.items.push(action.payload);
            }
        },
        deleteFromCart: (state, action) => {
            state.items = [...state.items].filter(i => {
                return !(
                    i.id === action.payload.id && i.size === action.payload.size
                );
            });
        },
        resetCart: state => {
            state.items = [];
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
