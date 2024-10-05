
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';


import { CurrentUser, errorHandler, NotFoundError } from '@vb430/common';
import { IndexOrderRouter } from './routes/index';
import { DeleteOrderRouter } from './routes/delete';
import { NewOrderRouter } from './routes/new';
import { ShowOrderRouter } from './routes/show';


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

app.use(IndexOrderRouter)
app.use(NewOrderRouter)
app.use(DeleteOrderRouter)
app.use(ShowOrderRouter)

app.all('*',async ()=>{
    throw new NotFoundError()
})


//error handler should be used in end after all the usage of routes else error handler wont work
app.use(errorHandler)


export { app };