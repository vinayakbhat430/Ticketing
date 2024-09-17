import { ValidationError } from "express-validator";
import { GeneralErrors } from "./interfaces";
import { CustomError } from "./custom-error-class";
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): GeneralErrors[];
}
