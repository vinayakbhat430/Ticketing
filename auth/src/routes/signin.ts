import express, { Request, Response } from "express";
import Jwt from 'jsonwebtoken';
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-requests";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../libs/password";
const route = express.Router();

route.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email Must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req:Request, res:Response) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid Credentials');
    }

    const userJWT = Jwt.sign({
        id: existingUser.id,
        email:existingUser.email
    }, process.env.JWT_KEY!)

    req.session ={
        jwt: userJWT
    }

    res.status(200).send(existingUser);

  }
);

export { route as SignInRouter };
