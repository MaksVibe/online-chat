"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const response_handler_1 = require("handlers/response.handler");
const user_1 = require("models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const controllers_1 = require("controllers");
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const exist = yield (0, controllers_1.userExist)(user);
        if (!exist)
            return (0, response_handler_1.notfound)(res, `The user ${user.nickName} doesn't exist`);
        const existingUser = yield user_1.User.findOne({
            nickName: user.nickName
        });
        existingUser &&
            bcrypt_1.default.compare(user.password, existingUser.password, function (err, isMatch) {
                if (err) {
                    return next(err);
                }
                else if (!isMatch) {
                    return (0, response_handler_1.badrequest)(res, 'Incorrect password');
                }
                else {
                    return res.status(201).send({
                        message: 'User logged in',
                        nickName: user.nickName
                    });
                }
            });
    }
    catch (err) {
        if (err instanceof Error) {
            (0, response_handler_1.error)(res);
        }
        return next(err);
    }
});
exports.signIn = signIn;
