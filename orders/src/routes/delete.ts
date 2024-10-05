import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from '@vb430/common';
import express ,  { Request , Response } from 'express';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from '../events/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Ticket } from '../models/ticket';


const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth, async (req:Request , res: Response)=>{
    const order =await Order.findById(req.params.id).populate('ticket');
    if(!order) {
        return new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id ){
        throw new NotAuthorizedError()
    }
    order.status = OrderStatus.Cancelled
    await order.save(); 

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id:order.ticket.id
        }
    })
    res.status(204).send({});
})

export {router as DeleteOrderRouter};