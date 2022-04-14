import { RequestHandler } from "express";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import EmailAlreadyExistsException from "../exceptions/EmailAlreadyExistsException";
import { CreateUserDto, LoginUserDto } from "../dtos/users.dto";
import { User } from "../entity/User";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import { createToken } from "./jwtController";
import HttpException from "../exceptions/HttpException";
import UserNameAlreadyExistsException from "../exceptions/UserNameAlreadyExistsException;";

//REGISTER
//check the username and email whether existing. if its okay save user
export const register: RequestHandler = async (req, res, next) => {
  try {
     //use the data transfer object that include types of etc. the user information who wants register.
    const userData: CreateUserDto = req.body;
    const userName = await User.findOne({ userName: userData.userName });
    const user = await User.findOne({ email: userData.email });
    if (user) {
      res.status(400).render("register", {
        errorMessage: new EmailAlreadyExistsException(userData.email),
      });
    } else if (userName) {
      res.status(400).render("register", {
        errorMessage: new UserNameAlreadyExistsException(userData.userName),
      });
    } else {
      const user = await User.create({
        ...userData,
        id: uuidv4(),
      }).save()
        .then(() => {
          res.status(201).redirect("/login");
        });
    }
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
//LOGIN
//Compare user email and password that hashed by using bcrypt module for login.
// create token and save the cookie for using next user actions
export const login: RequestHandler = async (req, res) => {
  //use the data transfer object that include types of etc. the user information who wants login.
  const userData: LoginUserDto = req.body;
  const email = userData.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).render("login", {
        errorMessage: new UserNotFoundException(userData.email),
      });
    } else {
      const isSuccess = await bcrypt.compare(userData.password, user.password);
      if (isSuccess) {
        const token = createToken(user, req.headers["user-agent"]);
        res.cookie("jwt", token, { httpOnly: true }).redirect("/profileMovies");
      } else {
        res.render("login", {
          errorMessage: new HttpException(400, "Password is wrong"),
        });
      }
    }
  } catch (error) {
    throw new Error();
  }
};
//LOGIN
//Clear cookie that include jwt token
export const logout: RequestHandler = async (req, res) => {
  // clear session from db and browser application
  res.clearCookie("connect.sid", { path: "/" });
  res.clearCookie("jwt");
  res.status(200).render("login", { message: "Succesfully Logged out!" });
};
