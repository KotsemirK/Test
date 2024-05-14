import { createSlice } from "@reduxjs/toolkit";

import { ITicket } from "../../../models/ITicket";

import { fetchTickets } from "./ActionCreators";


interface TicketsState {
  tickets: ITicket[];
  filteredTickets: ITicket[];
  isLoading: boolean;
  error: string;
};

const initialState: TicketsState = {
  tickets: [],
  filteredTickets: [], 
  isLoading: false,
  error: '',
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
        state.isLoading = false;
        state.tickets = action.payload;
        state.filteredTickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Помилка завантаження квитків.';
      })
  },
});

export default ticketsSlice.reducer;