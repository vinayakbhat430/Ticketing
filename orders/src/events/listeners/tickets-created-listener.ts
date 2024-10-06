import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@vb430/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queuegroup-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName ;
    async onMessage(data: TicketCreatedEvent['data'], message: Message): Promise<void> {
        const {title, price, id} = data
        const ticket = Ticket.build({
            id,
            title,
            price
        });

        await ticket.save()

        message.ack()
    }

}