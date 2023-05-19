import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Course } from './types/course';
import { User } from './types/user';
import { Login } from './types/auth';

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/", prepareHeaders: (headers) => {
            const auth = localStorage.getItem("auth");
            if (auth) {
                headers.set('authorization', `Basic ${auth}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation<boolean, Login>({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                body: data,
            }),
            onQueryStarted: async ({email, password}) => {
                localStorage.setItem('auth', btoa(email + ":" + password))
            }
        }),

        getUser: builder.query<User, void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            })
        }),
        courseList: builder.query<Course[], void>({
            query: () => ({
                url: '/course',
                method: 'GET'
            }),
        }),
        addCourse: builder.mutation<void, FormData>({
            query: (data) => ({
                url: '/course',
                method: 'POST',
                body: data,
            })
        }),
    })
})

export const { } = api;