import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ITicket } from "../models/ITicket";

interface GetTicketsParams {
    stops?: number; 
}

export const ticketsApi = createApi({
    reducerPath: 'ticketsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Ticket'],
    endpoints: (builder) => ({
        getTickets: builder.query<ITicket[], GetTicketsParams>({
            query: (params) => ({
                url: `/posts`,
                params: {
                    stops: params.stops
                }
            }),
            providesTags: result => ['Ticket']
        }),
    })
});

export const { useGetTicketsQuery } = ticketsApi;