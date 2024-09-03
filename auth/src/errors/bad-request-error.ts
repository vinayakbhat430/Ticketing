import { CustomError } from "../libs/custom-error-class";
import { GeneralErrors } from "../libs/interfaces";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message:string) {
    super(message);
    Object.setPrototypeOf(this,BadRequestError.prototype)
  }
  serializeErrors(): GeneralErrors[] {
    return [{ message: this.message }];
  }
}
