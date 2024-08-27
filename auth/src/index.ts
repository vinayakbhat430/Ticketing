const express = require('express');


const app = express()

app.use(express.json())


app.get('/api/users/current-user',(req:any,res:any)=>{
    console.log("Came here");
    res.send("Hi There!");
})


app.listen(3000,()=>{
    console.log("listening -> auth -> 3000");
})