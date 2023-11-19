import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query({
      query: (searchTerm) => `people/?search=${searchTerm}`,
    }),
  }),
});

export const { useFetchPeopleQuery } = apiSlice;
