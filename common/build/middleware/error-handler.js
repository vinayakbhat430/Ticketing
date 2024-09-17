"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_class_1 = require("../errors/custom-error-class");
const errorHandler = (err, req, res, next) => {
    if (err instanceof custom_error_class_1.CustomError) {
        res.status(err.statusCode).send({ error: err.serializeErrors() });
    }
};
exports.errorHandler = errorHandler;
