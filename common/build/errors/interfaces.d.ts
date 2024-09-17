export interface GeneralErrors {
    message: string;
    field?: string;
}
export interface ICustomError {
    statusCode: number;
    serializeErrors(): GeneralErrors[];
}
export interface UserAttrs {
    email: string;
    password: string;
}
