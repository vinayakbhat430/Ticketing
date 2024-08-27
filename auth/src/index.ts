
import express from 'express';
import 'express-async-errors';
import { CurrentUserRouter } from "./routes/current-user";
import { SignInRouter } from "./routes/signin";
import { SignOutRouter } from "./routes/signout";
import { SignUpRouter } from "./routes/signup";
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';



const app = express()

app.use(express.json())


app.use(SignInRouter)
app.use(SignOutRouter)
app.use(SignUpRouter)
app.use(CurrentUserRouter)

app.all('*',async ()=>{
    throw new NotFoundError()
})


//error handler should be used in end after all the usage of routes else error handler wont work
app.use(errorHandler)

app.listen(3000,()=>{
    console.log("listening -> auth -> 3000");
})