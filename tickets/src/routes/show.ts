import express, { Request , Response } from 'express';
import { Ticket } from '../models/tickets';
import { NotFoundError } from '@vb430/common';


const router  = express.Router();

router.get('/api/tickets/:id', async (req: Request, res:Response) =>{
    console.log("Came to show", req.params.id)
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        throw new NotFoundError()
    }

    res.status(200).send(ticket)
})

export {router as ShowTicket};