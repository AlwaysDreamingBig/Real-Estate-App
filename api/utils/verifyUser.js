import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";

// access_token is the name we gave to the token in the authentification functions (auth.controller.js)

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Not allowed'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden: token is not valid.'));

        req.user = user;
        next();
    })
}