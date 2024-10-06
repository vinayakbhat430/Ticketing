import { Listener, OrderCreatedEvent, Subjects } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from '../../models/tickets';
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
        const ticket = await Ticket.findById(data.ticket.id);

        if(!ticket){
            throw new Error('Ticket not found');
        }

        ticket.set({orderId: data.id});

        await ticket.save()

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            orderId: ticket.orderId
        })

        message.ack()
    }
    
}