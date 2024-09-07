import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decoded = jwt.verify(token, "secret") ;
        console.log(decoded);
        //@ts-ignore
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized");
    }
}
