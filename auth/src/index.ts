
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';


import { CurrentUserRouter } from "./routes/current-user";
import { SignInRouter } from "./routes/signin";
import { SignOutRouter } from "./routes/signout";
import { SignUpRouter } from "./routes/signup";
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session';



const app = express()
app.set('trust proxy',true)

app.use(express.json())

app.use(
    cookieSession({
        signed:false,
        secure:true
    })
)


app.use(SignInRouter)
app.use(SignOutRouter)
app.use(SignUpRouter)
app.use(CurrentUserRouter)

app.all('*',async ()=>{
    throw new NotFoundError()
})


//error handler should be used in end after all the usage of routes else error handler wont work
app.use(errorHandler)

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_SECRET Must be defined')
    }
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to mongo db')
    }
    catch(err){
        console.log(err)
    }
}

app.listen(3000,()=>{
    console.log("listening -> auth -> 3000");
})
start();