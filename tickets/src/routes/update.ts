import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@vb430/common';
import express , { Request, Response } from 'express';
import { Ticket } from '../models/tickets';
import { body } from 'express-validator';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-update-publisher';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.put('/api/tickets/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage("Title is Required"),
        body('price')
          .isFloat({ gt: 0 })
          .withMessage("Price must be greater than 0"),
    ],
    validateRequest,
    async (req:Request, res:Response)=>{
    console.log("Current User inside update",req.currentUser)
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        throw new NotFoundError()
    }

    if(ticket.orderId){
        throw new BadRequestError('Cannot update reserved ticket!')
    }

    if( ticket.userId  !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    })

    await ticket.save()

    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        title:ticket.title,
        userId:ticket.userId,
        price: ticket.price
      })

    res.send(ticket)
})


export { router as UpdateTicketRouter };