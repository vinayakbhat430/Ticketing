import { Publisher, Subjects , TicketUpdatedEvent } from '@vb430/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated  = Subjects.TicketUpdated;

}