"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_error_class_1 = require("./custom-error-class");
class DatabaseConnectionError extends custom_error_class_1.CustomError {
    constructor() {
        super('Error Connecting to Database');
        this.statusCode = 500;
        this.reason = "Error Connecting to Database";
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
