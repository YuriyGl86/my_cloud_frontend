import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { catalogFetchAPI } from './catalogFetchAPI';
import appStateReducer from './slices/appStateSlice';
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
        appState: appStateReducer,
        cart: cartReducer,
        [catalogFetchAPI.reducerPath]: catalogFetchAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(catalogFetchAPI.middleware),
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
