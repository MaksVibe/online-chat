"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_handler_1 = require("../handlers/response.handler");
const controllers_1 = __importDefault(require("../controllers"));
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    try {
        (0, response_handler_1.ok)(res, 'Server is running...');
    }
    catch (error) {
        next(error);
    }
});
router.use('/signup', controllers_1.default.signUp);
router.use('/signin', controllers_1.default.signIn);
// router.use('/upload', controllers.signIn);
exports.default = router;
