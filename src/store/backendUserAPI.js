import {
    createApi,
    defaultSerializeQueryArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const backendUserAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
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
                url: '/user',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetHitsQuery,
    useGetCatalogItemsQuery,
    useGetCatalogItemDetailsQuery,
    useRegisterMutation,
} = backendUserAPI;
