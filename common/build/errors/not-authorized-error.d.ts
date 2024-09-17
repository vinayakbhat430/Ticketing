import { CustomError } from "./custom-error-class";
import { GeneralErrors } from "./interfaces";
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): GeneralErrors[];
}
