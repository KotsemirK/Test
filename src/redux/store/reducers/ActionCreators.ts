import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITicket } from "../../../models/ITicket";

export const fetchTickets = createAsyncThunk(
    'ticket/fetch/All',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITicket[]>('http://localhost:3001/posts')
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Неможливо завантажити квитки.")
        }
    }
)