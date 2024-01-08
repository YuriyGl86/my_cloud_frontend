import { createSlice } from '@reduxjs/toolkit';
// import { catalogFetchAPI } from '../catalogFetchAPI';

const initialState = {
    token: null,
    first_name: null,
    username: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setUserInfo: (state, action) => {
            state.first_name = action.payload.first_name;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        removeUser: state => {
            state.first_name = null;
            state.username = null;
            state.email = null;
            state.token = null;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
