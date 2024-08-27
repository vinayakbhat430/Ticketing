import express  from "express";

const route = express.Router();

route.get('/api/users/current-user',(req,res)=>{

});

export {route as CurrentUserRouter};