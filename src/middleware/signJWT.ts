import * as express from "express";
import { createToken } from "../controllers/jwtController";
import IUser from "../interfaces/user.interface";

export const signJWT: express.RequestHandler = (req, res,next) => {
    const user = req.user as IUser;
    const token = createToken(user, req.headers["user-agent"])
    res.status(200).cookie('jwt', token, {
        httpOnly: true,
        maxAge: 600 * 60 *60
    }).redirect("/profileMovies")
}

