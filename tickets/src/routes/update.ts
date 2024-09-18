import { NotAuthorizedError, NotFoundError, requireAuth } from '@vb430/common';
import express , { Request, Response } from 'express';
import { Ticket } from '../models/tickets';
import { body } from 'express-validator';


const router = express.Router();

router.put('/api/tickets/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage("Title is Required"),
        body('price')
          .isFloat({ gt: 0 })
          .withMessage("Price must be greater than 0"),
    ],
    async (req:Request, res:Response)=>{
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        throw new NotFoundError()
    }

    if( ticket.userId  !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    })

    await ticket.save()

    res.send(ticket)
})


export { router as UpdateTicketRouter };