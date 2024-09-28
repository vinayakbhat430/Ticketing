
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';


import { CurrentUser, errorHandler, NotFoundError } from '@vb430/common';
import { CreateTicketRouter } from './routes/new';
import { ShowTicket } from './routes/show';
import { IndexTicketsRoute } from './routes';
import { UpdateTicketRouter } from './routes/update';




const app = express()
app.set('trust proxy',true)

app.use(express.json())

app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !== 'test'
    })
)


//declare routes here
app.use(CurrentUser)

app.use(CreateTicketRouter)
app.use(UpdateTicketRouter)
app.use(ShowTicket)
app.use(IndexTicketsRoute)

app.all('*',async ()=>{
    throw new NotFoundError()
})


//error handler should be used in end after all the usage of routes else error handler wont work
app.use(errorHandler)


export { app };