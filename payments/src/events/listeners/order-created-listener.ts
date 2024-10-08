import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-names";
import { Order } from "../../models/orders";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
        const order = Order.build({
            id:data.id,
            price:data.ticket.price,
            status: data.status,
            userId:data.userId,
            version:data.version
        })
        
        await order.save();

        message.ack()
    }
    
}