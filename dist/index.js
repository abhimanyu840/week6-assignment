"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const users = [];
app.post("/signin", middlewares_1.auth, (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).send("Invalid credentials");
    }
    res.send(`Logged in! \n Hello, ${email}! Your token is ${user.token}`);
});
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    if (users.find((user) => user.email === email)) {
        return res.status(400).send("User already exists");
    }
    const token = jsonwebtoken_1.default.sign({ email }, "secret");
    users.push({ email, password, token });
    res.send(`Account Created! \nHello, ${email}! Your token is ${token}`);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
