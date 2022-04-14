import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import AuthTokenMissingException from "../exceptions/AuthTokenMissingException";

export const verifyToken: RequestHandler = (req, res, next) => {
  try {
    //assign the token value which saved in cookie to token variable
    const token = req.cookies.jwt;
    if (!token) {
      res.redirect("/login");
    } else {
      //decode the token to reach user and browser information which we save in controllers.
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        //Check user.id and if the user is coming from the same browser.
        if (decoded.user_id &&decoded.browserInfo === req.headers["user-agent"]) {
          req.userID = decoded.user_id;       
          next();
        } else {
          res.redirect("/login");
        }
      });
    }
  } catch (error) {
    throw new AuthTokenMissingException();
  }
};
