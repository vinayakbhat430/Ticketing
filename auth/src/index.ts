
import express from 'express';
import { CurrentUserRouter } from "./routes/current-user";
import { SignInRouter } from "./routes/signin";
import { SignOutRouter } from "./routes/signout";
import { SignUpRouter } from "./routes/signup";



const app = express()

app.use(express.json())


app.use(SignInRouter)
app.use(SignOutRouter)
app.use(SignUpRouter)
app.use(CurrentUserRouter)



app.listen(3000,()=>{
    console.log("listening -> auth -> 3000");
})