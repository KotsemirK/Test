import { ITicket } from '../../models/ITicket';

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

export const getSortedTickets = (tickets: ITicket[], order: string): ITicket[] => {
    switch(order) {
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