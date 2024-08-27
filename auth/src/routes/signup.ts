    import express, { Request, Response } from "express";
    import { body, validationResult } from "express-validator";

    const route = express.Router();

    route.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be Valid"),
        body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 to 20 characters"),
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send(errors.array())
        }

        const { email, password } = req.body;
        console.log('Creating a user..... ')
        res.send({})
    }
    );

    export { route as SignUpRouter };
