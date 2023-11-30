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
exports.signUp = void 0;
const controllers_1 = require("controllers");
const user_1 = require("models/user");
const response_handler_1 = require("../../handlers/response.handler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const exist = yield (0, controllers_1.userExist)(user);
        if (exist)
            return (0, response_handler_1.badrequest)(res, `The user ${user.nickName} already exist`);
        bcrypt_1.default.genSalt(saltRounds, function (saltError, salt) {
            if (saltError) {
                throw saltError;
            }
            else {
                return bcrypt_1.default.hash(user.password, salt, (hashError, hash) => __awaiter(this, void 0, void 0, function* () {
                    if (hashError) {
                        throw hashError;
                    }
                    else {
                        yield user_1.User.create({
                            nickName: user.nickName,
                            password: hash
                        });
                    }
                }));
            }
        });
        return (0, response_handler_1.created)(res, {
            nickName: user.nickName,
            message: `User ${user.nickName} created successfully`
        });
    }
    catch (err) {
        if (err instanceof Error) {
            (0, response_handler_1.error)(res);
        }
        return next(err);
    }
});
exports.signUp = signUp;
