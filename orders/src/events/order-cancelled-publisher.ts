import { Publisher, OrderCancelledEvent, Subjects } from "@vb430/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}