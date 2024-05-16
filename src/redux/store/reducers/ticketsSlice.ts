import { createSlice } from "@reduxjs/toolkit";

import { ITicket } from "../../../models/ITicket";

import { fetchTickets } from "./ActionCreators";


export interface TicketsState {
  tickets: ITicket[];
  isLoading: boolean;
  error: string;
  canLoadMore: boolean;
};

const initialState: TicketsState = {
  tickets: [],
  isLoading: false,
  error: '',
  canLoadMore: true
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          if (action.meta.arg.startIndex === 0) {
            state.tickets = action.payload.result;
          } else {
            state.tickets = [...state.tickets, ...action.payload.result];
          }
          state.canLoadMore = action.payload.canLoadMore;
        }

        state.isLoading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Помилка завантаження квитків.';
      })
  },
});

export default ticketsSlice.reducer;