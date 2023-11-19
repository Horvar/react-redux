import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query({
      query: ({ searchTerm, page }) =>
        `people/?search=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useFetchPeopleQuery } = apiSlice;
