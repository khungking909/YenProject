import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from 'src/constants/apiPath';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath.host,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Products', 'Carts', 'Token', 'User', 'Coupons', 'Register'],
  endpoints: () => ({}),
});
