"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const requireAuth = (req, res, next) => {
    try {
        if (!req.currentUser) {
            throw new not_authorized_error_1.NotAuthorizedError();
        }
    }
    catch (err) {
    }
    return next();
};
exports.requireAuth = requireAuth;
