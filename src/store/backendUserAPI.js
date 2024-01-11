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
        // params: {
        //     ...(selected && { categoryId: selected }),
        //     ...(q && { q }),
        //     ...(offset && { offset }),
        // },
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
        logout: builder.mutation({
            query: token => ({
                url: '/auth/token/logout/',
                method: 'POST',
                headers: { Authorization: `Token ${token}` },
            }),
        }),
        getUserInfo: builder.query({
            query: token => {
                return {
                    url: `/api/v1/auth/users/me`,
                    headers: { Authorization: `Token ${token}` },
                };
            },
        }),
        getFiles: builder.query({
            query: ({ token, id }) => {
                return {
                    url: `/api/v1/files/`,
                    headers: { Authorization: `Token ${token}` },
                    params: {
                        ...(id && { id }),
                    },
                };
            },
        }),
        sendFile: builder.mutation({
            query: ({ body, token }) => ({
                url: '/api/v1/files/',
                method: 'POST',
                body,
                headers: {
                    Authorization: `Token ${token}`,
                },
                formData: true,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserInfoQuery,
    useGetFilesQuery,
    useSendFileMutation,
} = backendUserAPI;
