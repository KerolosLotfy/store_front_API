import { Response, Request, NextFunction } from "express";
// import Error from '../interfaces/error.interface';

export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const message = error.message || "Whoops!! something went wrong";
    res.json({ Error: message });
};
