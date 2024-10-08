import { Subjects } from "./subjects";
import { OrderStatus } from "./types/types";


export interface OrderCancelledEvent{
    subject: Subjects.OrderCancelled;
    data:{
        id:string;
        version:number
        ticket:{
            id:string
        }
    }
}