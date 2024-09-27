import { Publisher ,TicketCreatedEvent , Subjects } from "@vb430/common";



export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}