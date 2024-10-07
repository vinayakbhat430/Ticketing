import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queue/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
        await expirationQueue.add({
            orderId: data.id
        }, {
            delay: delay,
        })
        
        message.ack()

    }
    
}