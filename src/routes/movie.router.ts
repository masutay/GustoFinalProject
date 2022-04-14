import { Router } from "express";
import { createMovieComment } from "../controllers/commentsController";
import { likeMovie,unlikeMovie } from "../controllers/likeControllers";
import { createMovie, deleteMovie, getMyProfileMovie, updateMovie } from '../controllers/movieController';
import { checkCreateMovie, createMovieValidator } from "../middleware/validation.middleware";
import { verifyToken } from "../middleware/verifyJWT";


const router: Router = Router();
// Movie CRUD ROUTER
router.get("/getMovie/:id",verifyToken, getMyProfileMovie);
router.get("/getAllMovie",verifyToken);
router.post("/createMovie",verifyToken,createMovieValidator,checkCreateMovie,createMovie);

// Movie Update and Delete ROUTE
router.put("/updateMovie/:id/",verifyToken,createMovieValidator,checkCreateMovie,updateMovie);
router.delete("/deleteMovie/:id",verifyToken, deleteMovie);

// Movie Comment ROUTE
router.post("/createComment/:src/:id",verifyToken, createMovieComment);

// Movie like ROUTE
router.get("/likeMovie/:src/:id",verifyToken,likeMovie);
router.get("/unlikeMovie/:src/:id",verifyToken,unlikeMovie);

const movieRouter = router;
export default movieRouter;