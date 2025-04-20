import { baseApi } from 'src/app/apis/baseApi';
import { AuthRequest, AuthResponse, GetUserResponse } from 'src/types/auth.types';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials: AuthRequest) => ({
        url: `/users/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Token'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);

          dispatch(authApi.util.invalidateTags(['User']));
          dispatch(authApi.util.invalidateTags(['Carts']));
        } catch (error) {
          throw new Error(`Login failed: ${error}`);
        }
      },
    }),
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials: AuthRequest) => ({
        url: `/users/register`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Token'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);

          dispatch(authApi.util.invalidateTags(['User']));
          dispatch(authApi.util.invalidateTags(['Carts']));
        } catch (error) {
          throw new Error(`Login failed: ${error}`);
        }
      },
    }),
    getUserFromToken: builder.query<GetUserResponse, void>({
      query: () => ({ url: '/users/me' }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetUserFromTokenQuery, useRegisterMutation } = authApi;
export default authApi;
