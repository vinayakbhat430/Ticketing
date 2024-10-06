import { Listener, OrderCancelledEvent, Subjects } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: { id: string; ticket: { id: string; }; }, message: Message): Promise<void> {
        const ticket = await Ticket.findById(data.id);

        if(!ticket){
            throw new Error('Ticket Not found')
        }
        ticket.set({orderId: undefined});
        await ticket.save()

        await new TicketUpdatedPublisher(this.client).publish({
            id:ticket.id,
            version: ticket.version,
            orderId: ticket.orderId,
            userId:ticket.userId,
            price:ticket.price,
            title: ticket.title
        })
    }
    
}