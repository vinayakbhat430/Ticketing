import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from '@vb430/common';
import express ,  { Request , Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth, async (req:Request , res: Response)=>{
    const order =await Order.findById(req.params.id);
    if(!order) {
        return new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id ){
        throw new NotAuthorizedError()
    }
    order.status = OrderStatus.Cancelled
    await order.save();
    res.status(204).send({});
})

export {router as DeleteOrderRouter};