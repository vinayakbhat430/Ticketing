import express  from "express";
import Jwt  from "jsonwebtoken";
import { CurrentUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const route = express.Router();

route.get('/api/users/current-user', CurrentUser, requireAuth ,(req,res)=>{
    res.send({currentUser: req.currentUser || null})
});

export {route as CurrentUserRouter};