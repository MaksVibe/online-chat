"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notfound = exports.created = exports.ok = exports.badrequest = exports.error = void 0;
const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);
const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: 'Oops! Something worng!'
});
exports.error = error;
const badrequest = (res, message) => responseWithData(res, 400, { message });
exports.badrequest = badrequest;
const ok = (res, data) => responseWithData(res, 200, data);
exports.ok = ok;
const created = (res, data) => responseWithData(res, 201, data);
exports.created = created;
const notfound = (res, message) => responseWithData(res, 404, { message });
exports.notfound = notfound;
