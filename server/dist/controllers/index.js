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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExist = void 0;
const user_1 = require("../models/user");
const signIn_1 = require("./users/signIn");
const signUp_1 = require("./users/signUp");
const userExist = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.User.findOne({
        nickName: user.nickName
    });
    return existingUser;
});
exports.userExist = userExist;
exports.default = {
    signIn: signIn_1.signIn,
    signUp: signUp_1.signUp
};
