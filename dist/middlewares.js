"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "secret");
        console.log(decoded);
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send("Unauthorized");
    }
};
exports.auth = auth;
