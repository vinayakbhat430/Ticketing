import express, { Request, Response } from "express";

import  Jwt  from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-requests";

const route = express.Router();

//#Misake: Not using / in begining of the route which made me to spend lots of time to understand why i am not able to reach to the route
route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be Valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });

    await user.save();


    //generate JWT
    const userJWT = Jwt.sign({
        email: user.email,
        id: user.id
    },process.env.JWT_KEY!)
    //store it in session 
    req.session = {
        jwt: userJWT
    };




    res.status(201).send({user})
  }
);

export { route as SignUpRouter };
