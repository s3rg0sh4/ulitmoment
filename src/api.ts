import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Course } from './types/course';
import { User, UserModel } from './types/user';
import { Login } from './types/auth';
import { roles } from './types/roles';
import { url } from 'inspector';
import { School } from './types/school';

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
            onQueryStarted: async ({ email, password }) => {//Buffer.from(str, 'base64') andbuf.toString('base64')
                localStorage.setItem('auth', btoa(email + ":" + password))
            }
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            }),
            transformResponse: (user: User) => {
                switch (user.role) {
                    case roles[0].value:
                        user.role = roles[0].label
                        break;
                    case roles[1].value:
                        user.role = roles[1].label
                        break;
                    case roles[2].value:
                        user.role = roles[2].label
                        break;
                    case roles[3].value:
                        user.role = roles[3].label
                        break;
                }

                return user;
            },
        }),
        courseList: builder.query<Course[], void>({
            query: () => ({
                url: '/courses',
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
        userList: builder.query<User[], void>({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
            transformResponse: (users: User[]) => {
                for (let user of users) {
                    switch (user.role) {
                        case roles[0].value:
                            user.role = roles[0].label
                            break;
                        case roles[1].value:
                            user.role = roles[1].label
                            break;
                        case roles[2].value:
                            user.role = roles[2].label
                            break;
                        case roles[3].value:
                            user.role = roles[3].label
                            break;
                    }
                }

                return users;
            }
        }),
        signOn: builder.mutation<void, UserModel>({
            query: (data) => ({
                url: '/signon',
                method: 'POST',
                body: data
            })
        }),
        schoolList: builder.query<School[], void>({
            query: () => ({
                url: '/schools',
                method: 'GET',
            })
        }),
        addSchool: builder.mutation<void, School>({
            query: (data) => ({
                url: '/addschool',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { } = api;