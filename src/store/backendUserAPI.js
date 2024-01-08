import {
    createApi,
    defaultSerializeQueryArgs,
    fetchBaseQuery,
    retry,
} from '@reduxjs/toolkit/query/react';

export const backendUserAPI = createApi({
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: process.env.REACT_APP_BACKEND,
        }),
        { maxRetries: 0 },
    ),
    reducerPath: 'api',
    endpoints: builder => ({
        // getCategories: builder.query({
        //     query: () => `/categories`,
        // }),
        // getHits: builder.query({
        //     query: () => `/top-sales`,
        // }),
        // getCatalogItems: builder.query({
        //     query: ({ selected, q, offset }) => {
        //         return {
        //             url: '/items',
        //             params: {
        //                 ...(selected && { categoryId: selected }),
        //                 ...(q && { q }),
        //                 ...(offset && { offset }),
        //             },
        //         };
        //     },
        //     keepUnusedDataFor: 0,
        //     serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        //         // Для себя: исключаем из ключа кэширования offset
        //         const { selected, q } = queryArgs;
        //         return defaultSerializeQueryArgs({
        //             endpointName,
        //             queryArgs: { selected, q },
        //             endpointDefinition,
        //         });
        //     },
        //     merge: (currentCache, newItems) => {
        //         // Для себя: данные нового запроса пушим к данным прошлых
        //         currentCache.push(...newItems);
        //     },
        //     forceRefetch({ currentArg, previousArg }) {
        //         return currentArg !== previousArg;
        //     },
        // }),
        // getCatalogItemDetails: builder.query({
        //     query: id => `/items/${id}`,
        // }),
        register: builder.mutation({
            query: body => ({
                url: '/api/v1/auth/users/',
                method: 'POST',
                body,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        login: builder.mutation({
            query: body => ({
                url: '/auth/token/login/',
                method: 'POST',
                body,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        getUsers: builder.query({
            query: () => `/api/v1/auth/users/`,
        }),
    }),
});

export const { useGetUsersQuery, useRegisterMutation, useLoginMutation } = backendUserAPI;
