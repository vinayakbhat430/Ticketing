import mongoose from "mongoose";
import { NotFoundError, OrderStatus, requireAuth, validateRequest } from "@vb430/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

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
        throw new Error('Ticket is reserved');
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

    //publish an event saying order was created

    res.send(order);
  }
);

export { router as NewOrderRouter };
