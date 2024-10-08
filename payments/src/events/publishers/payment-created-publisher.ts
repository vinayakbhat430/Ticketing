import { PaymentCreatedEvent, Publisher, Subjects } from "@vb430/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

}