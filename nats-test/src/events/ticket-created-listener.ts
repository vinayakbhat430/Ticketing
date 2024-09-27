import { Message } from "node-nats-streaming";
import { Listener , TicketCreatedEvent , Subjects } from "@vb430/common";

export class TicketsCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
    onMessage(data: TicketCreatedEvent['data'], message: Message): void {
        console.log('Event data! ', data);
        message.ack()
    }
    
}