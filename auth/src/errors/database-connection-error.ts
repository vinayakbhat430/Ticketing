import { CustomError } from "../libs/custom-error-class";
import { GeneralErrors, ICustomError } from "../libs/interfaces";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error Connecting to Database";

  constructor() {
    super('Error Connecting to Database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors():GeneralErrors[] {
    return [{ message: this.reason }];
  }
}
