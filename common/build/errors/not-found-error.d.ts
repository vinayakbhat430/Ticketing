import { CustomError } from "./custom-error-class";
import { GeneralErrors } from "./interfaces";
export declare class NotFoundError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): GeneralErrors[];
}
