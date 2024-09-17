"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_class_1 = require("./custom-error-class");
class RequestValidationError extends custom_error_class_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = 400;
        //only because we are extending builtin class we are setting prototype
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => ({
            message: err.msg,
            field: err.type
        }));
    }
}
exports.RequestValidationError = RequestValidationError;
