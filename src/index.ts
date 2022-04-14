import "reflect-metadata";
import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as dotenv from 'dotenv';
import { Application } from 'express';
import { createConnection } from "typeorm";
import routes from "./routes/index.router";
import { facebookStrategy } from "./services/fb.auth"
import { googleStrategy } from "./services/google.auth"
import * as cookieParser from "cookie-parser"
import * as fileUpload from "express-fileupload"
import * as methodOverride from "method-override"
import { errorHandler } from "./middleware/errorHandler";

createConnection()
    .then(async (connection) => {
        const app: Application = express();

        app.set("view engine", "ejs");
        app.set('views', path.join(__dirname, "views"));

        dotenv.config();
       
        //---------Passportjs Strategy Middlewares--------------
        facebookStrategy();
        googleStrategy();
        //---------Middlewares--------------
        app.use(express.static("public"));
        // parsing application/json
        app.use(express.json());
        //parsing application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));
        //Helmet helps you secure your Express apps by setting various HTTP headers.
        //request logger middleware
        app.use(morgan("common"))
        //cookie-parser
        app.use(cookieParser());
          //cookie-parser
          app.use(fileUpload());
          app.use(methodOverride('_method', {methods:['POST','GET']}))
          app.use(errorHandler)
        //routes middleware
        app.use("/", routes)

        //run server port 3000    
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`server listenin on port ${PORT}`);
        });


    }).catch(error => console.log(error));
