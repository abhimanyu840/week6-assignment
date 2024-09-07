import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./middlewares";

const app = express();

app.use(express.json());

interface User {
    email: string;
    password: string;
    token: string;
}

const users: User[] = [];

app.post("/signin", auth, (req: any, res: any) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).send("Invalid credentials");
    }
    res.send(`Logged in! \n Hello, ${email}! Your token is ${user.token}`);
});


app.post("/signup", (req: any, res: any) => {
    const { email, password } = req.body;

    if (users.find((user) => user.email === email)) {
        return res.status(400).send("User already exists");
    }
    const token = jwt.sign({ email }, "secret");
    users.push({ email, password, token });
    res.send(`Account Created! \nHello, ${email}! Your token is ${token}`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
