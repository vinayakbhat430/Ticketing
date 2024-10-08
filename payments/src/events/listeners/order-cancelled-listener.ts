import { Listener, NotFoundError, OrderCancelledEvent, OrderStatus, Subjects } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-names";
import { Order } from "../../models/orders";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], message: Message): Promise<void> {
        const order = await Order.findOne({
            _id:data.id,
            version: data.version
        });

        if(!order){
            throw new NotFoundError();
        }

        order.set({
            status: OrderStatus.Cancelled
        });
        await order.save()

        message.ack()
    }
    
}