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
    tagTypes: ['Files', 'Users'],
    endpoints: builder => ({
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
            providesTags: ['Files'],
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
            invalidatesTags: ['Files'],
        }),
        getUsers: builder.query({
            query: token => {
                return {
                    url: `/api/v1/auth/users/`,
                    headers: { Authorization: `Token ${token}` },
                };
            },
            providesTags: ['Users'],
        }),
        deleteFile: builder.mutation({
            query: ({ id, token }) => ({
                url: `/api/v1/files/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${token}`,
                },
            }),
            invalidatesTags: ['Files'],
        }),
        editFileName: builder.mutation({
            query: ({ id, token, body }) => {
                console.log(body);
                return {
                    url: `/api/v1/files/${id}/`,
                    method: 'PATCH',
                    body,
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                };
            },
            invalidatesTags: ['Files'],
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
    useGetUsersQuery,
    useDeleteFileMutation,
    useEditFileNameMutation,
} = backendUserAPI;
