import { Listener, NotFoundError, OrderStatus, PaymentCreatedEvent, Subjects } from "@vb430/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queuegroup-name";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName  = queueGroupName;
    async onMessage(data: { id: string; orderId: string; stripeId: string; }, message: Message): Promise<void> {
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new NotFoundError();
        }

        order.set({
            status: OrderStatus.Completed
        });

        await order.save();

        message.ack()
    }
    
}