import { CustomError } from "./custom-error-class";
import { GeneralErrors } from "./interfaces";
export declare class BadRequestError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): GeneralErrors[];
}
