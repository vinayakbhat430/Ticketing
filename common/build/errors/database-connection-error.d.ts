import { CustomError } from "./custom-error-class";
import { GeneralErrors } from "./interfaces";
export declare class DatabaseConnectionError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): GeneralErrors[];
}
