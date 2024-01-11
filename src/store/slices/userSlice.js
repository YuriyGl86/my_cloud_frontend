import { createSlice } from '@reduxjs/toolkit';
import { backendUserAPI } from '../backendUserAPI';

const initialState = {
    token: null,
    first_name: null,
    username: null,
    email: null,
    id: null,
    is_staff: null,
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
            state.id = action.payload.id;
            state.is_stuff = action.payload.is_stuff;
        },
        removeUser: state => {
            state.first_name = null;
            state.username = null;
            state.email = null;
            state.token = null;
            state.id = null;
            state.is_stuff = null;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            backendUserAPI.endpoints.getUserInfo.matchFulfilled,
            (state, { payload }) => {
                console.log(payload);
                state.first_name = payload.first_name;
                state.username = payload.username;
                state.email = payload.email;
                state.id = payload.id;
                state.is_staff = payload.is_staff;
            },
        );
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
