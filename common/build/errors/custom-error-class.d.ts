import { GeneralErrors, ICustomError } from "./interfaces";
export declare abstract class CustomError extends Error implements ICustomError {
    message: string;
    constructor(message: string);
    abstract statusCode: number;
    abstract serializeErrors(): GeneralErrors[];
}
