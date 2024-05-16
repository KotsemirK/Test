import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITicket } from "../../../models/ITicket";

const getDurationInMinutes = (duration: string): number => {
    const [hours, minutes] = duration.split("h ");
    return parseInt(hours) * 60 + parseInt(minutes);
};

const getSortedTicketsByDuration = (tickets: ITicket[]): ITicket[] => {
    return tickets.slice().sort((a, b) => {
        const durationA = getDurationInMinutes(a.duration);
        const durationB = getDurationInMinutes(b.duration);
        return durationA - durationB;
    });
};

const getSortedTickets = (tickets: ITicket[], order: string): ITicket[] => {
    switch (order) {
        case "cheapest":
            return tickets.slice().sort((a, b) => a.price - b.price);
        case "fastest":
            return getSortedTicketsByDuration(tickets);
        case "optimal":
            const sortedTicketsByDuration = getSortedTicketsByDuration(tickets);
            const sortedTicketsByStops = sortedTicketsByDuration.slice().sort((a, b) => a.stops - b.stops);
            return sortedTicketsByStops.slice().sort((a, b) => a.price - b.price);
        default:
            return tickets;
    }
};

const getFiltredByTransfersNumber = (tickets: ITicket[], transfersNumber: number | null): ITicket[] => {
    if (transfersNumber === null) {
        return tickets;
    }
    return tickets.filter(ticket => ticket.stops === transfersNumber);
};

interface sortingData {
    transfersNumber: number | null,
    orederBy: string,
    startIndex: number
};

export const fetchTickets = createAsyncThunk(
    'ticket/fetch/All',
    async (sortingData: sortingData, thunkAPI) => {
        try {
            //this sorting logic should be on the backend side
            const data = await require('../../../ticketList.json')
            const filtredData = getFiltredByTransfersNumber(data, sortingData.transfersNumber);
            const sortedData = getSortedTickets(filtredData, sortingData.orederBy);
            const result = sortedData.slice(sortingData.startIndex, sortingData.startIndex + 5);
            const canLoadMore = data && sortingData.startIndex + 5 < sortedData.length;

            return {result, canLoadMore};
        } catch (error) {
            return thunkAPI.rejectWithValue("Неможливо завантажити квитки.")
        }
    }
)
