"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_error_class_1 = require("./custom-error-class");
class NotAuthorizedError extends custom_error_class_1.CustomError {
    constructor() {
        super('Not Authorized');
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Not Authorized' }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
