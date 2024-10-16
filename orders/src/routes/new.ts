import mongoose from "mongoose";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@vb430/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

const EXPIRATION_WINDOW_TIME = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body('ticketId').not().isEmpty()
    .custom((input:string)=> mongoose.Types.ObjectId.isValid(input))
    .withMessage('Ticket Id must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId)

    if(!ticket) {
        throw new NotFoundError()
    }

    //make sure that ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if(isReserved){
        throw new BadRequestError('Ticket is reserved');
    }

    //calculate and expiration date for order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_TIME)

    //Build the order and save it to database
    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticket
        
    })

    await order.save()


    //publish an event saying order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status:order.status as OrderStatus,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        version: order.version,
        ticket : {
            id:ticket.id,
            price:ticket.price
        }
    })

    res.status(201).send(order);
  }
);

export { router as NewOrderRouter };
