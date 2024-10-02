"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Created"] = "Created";
    OrderStatus["Cancelled"] = "Cancelled";
    OrderStatus["AwaitingPayment"] = "AwaitingPayment";
    OrderStatus["Completed"] = "Completed";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
