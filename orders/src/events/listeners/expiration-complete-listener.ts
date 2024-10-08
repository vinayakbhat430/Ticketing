import { ExpirationCompletedEvent, Listener, NotFoundError, Subjects, OrderStatus } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queuegroup-name";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompletedEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;
    async onMessage(data: { orderId: string; }, message: Message): Promise<void> {
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new NotFoundError();
        }

        if(order.status === OrderStatus.Completed){
            return message.ack()
        }

        order.set({
            status: OrderStatus.Cancelled,
        })

        await order.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket:{
                id: order.ticket.id
            }
        })

        message.ack()

    }

}