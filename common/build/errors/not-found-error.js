"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_class_1 = require("./custom-error-class");
class NotFoundError extends custom_error_class_1.CustomError {
    constructor() {
        super("Not Found");
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not found!" }];
    }
}
exports.NotFoundError = NotFoundError;
