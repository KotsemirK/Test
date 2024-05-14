export interface ITicket {
    id: number;
    price: number;
    currency: string;
    airline_logo: string;
    stops: number;
    duration: string;
    reverse_duration: string;
    schedule: string;
    reverse_schedule: string;
    route: string;
    reverse_route: string;
    terminals: string;
}