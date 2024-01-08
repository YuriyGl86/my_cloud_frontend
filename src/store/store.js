import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { backendUserAPI } from './backendUserAPI';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'cart',
//     storage,
//     whitelist: ['cart'],
//     blacklist: [catalogFetchAPI.reducerPath],
// };

// const rootReducer = combineReducers({
//     appState: appStateReducer,
//     cart: cartReducer,
//     [catalogFetchAPI.reducerPath]: catalogFetchAPI.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        [backendUserAPI.reducerPath]: backendUserAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(backendUserAPI.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [
//                     FLUSH,
//                     REHYDRATE,
//                     PAUSE,
//                     PERSIST,
//                     PURGE,
//                     REGISTER,
//                 ],
//             },
//         }).concat(catalogFetchAPI.middleware),
// });

// export const persistor = persistStore(store);
