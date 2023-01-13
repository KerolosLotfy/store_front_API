import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET;

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // to get token from cookies
        const token: string = await req.cookies.Token;
        if (token) {
            const verifyToken = jwt.verify(token, tokenSecret as string);
            const decode = jwt.decode(token as string);
            if (verifyToken && req.params.id == (decode as JwtPayload).id) {
                next();
            } else {
                res.json("invalid Athenticate");
            }
        } else {
            res.json("Sorry : Your Unathenticate please login ");
        }
    } catch (err) {
        // throw new Error(`Sorry Your Unathenticate  => ${err}`);
        res.json(`invalid signature ${err}`);
    }
};

export default authenticate;
