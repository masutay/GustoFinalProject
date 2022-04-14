import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";

//select inputs name and validate according to conditions for register form
export const registerValidator = [  
  check("userName", "User name must be at least 3 characters long.")
    .notEmpty()
    .isLength({ min: 3 }),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please insert a valid email address!"),
  check("password", "Password must be at least 5 characters long.")
    .notEmpty()
    .isLength({ min: 5 }),
];

//assign  validations these are determinening above to errors variable and save to res.locals as an array and then render register page
export const checkRegister: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.locals.errors = errors.array();
    res.render("register", { errors: errors.array() });
  } else next();
};

//select inputs name and validate according to conditions for login forms
export const loginValidator = [
  check("email", "Email is required.").trim().notEmpty(),
  check("password", "Password is required").trim().notEmpty(),
];

//assign  validations these are determinening above to errors variable and save to res.locals as an array and then render login page
export const checkLogin: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.locals.errors = errors.array();

    res.render("login", { errors: errors.array() });
  } else next();
};


export const createMovieValidator = [
  check("movieName", "Movie Name cant be empty").trim().notEmpty(),
  check("description", "Description must be at least 10 characters long.").trim().notEmpty()
  .isLength({ min: 5 }),
];

export const createCelebsValidator = [
  check("celebsName", "Celebs Name cant be empty").trim().notEmpty(),
  check("description", "Description must be at least 10 characters long.").trim().notEmpty()
  .isLength({ min: 5 }),
];


//assign  validations these are determinening above to errors variable and save to res.locals as an array and then render add movie page
export const checkCreateMovie: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.locals.errors = errors.array();   
    res.status(400).render("createContentErrors",{ errors: errors.array() });
  } else next();
};