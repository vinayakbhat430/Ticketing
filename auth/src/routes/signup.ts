    import express, { Request, Response } from "express";
    import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

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
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array())
        }

        const { email, password } = req.body;
        console.log('Creating a user..... ')

        throw new DatabaseConnectionError()
    }
    );

    export { route as SignUpRouter };
