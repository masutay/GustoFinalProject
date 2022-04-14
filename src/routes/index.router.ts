import { Router } from "express";
import authRouter from "./auth.router";
import movieRouter from "./movie.router";
import pageRouter from "./pageRouter";
import celebsRouter from "./celebs.router";


const routes: Router = Router();

routes.use('/', authRouter);
routes.use('/', pageRouter);
routes.use('/', movieRouter);
routes.use('/', celebsRouter);

export default routes;