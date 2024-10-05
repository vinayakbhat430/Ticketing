import { Publisher, OrderCreatedEvent, Subjects } from "@vb430/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

