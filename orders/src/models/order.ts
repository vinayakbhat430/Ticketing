import mongoose, { mongo, Mongoose } from "mongoose";
import { OrderStatus } from "@vb430/common";
import { TicketDoc } from "./ticket";

interface OrderAttrs{
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc
}

interface OrderDoc extends mongoose.Document{
    userId: string;
    status: string;
    expiresAt: Date;
    version: number;
    ticket: TicketDoc
}

interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    status:{
        type:String,
        required: true,
        enum: OrderStatus,
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {toJSON: {
    transform(doc, ret){
        ret.id = ret._id
        delete ret._id
    }
}});


orderSchema.statics.build = (attrs: OrderAttrs) =>{
    return new Order(attrs);
}

export const Order = mongoose.model<OrderDoc, OrderModel>('Orders', orderSchema);