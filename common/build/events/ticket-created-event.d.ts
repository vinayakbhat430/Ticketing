import { Subjects } from "./subjects";
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: TicketsData;
}
interface TicketsData {
    id: string;
    title: string;
    price: number;
    userId: string;
}
export {};
