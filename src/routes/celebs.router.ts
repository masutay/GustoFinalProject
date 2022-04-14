import { Router } from "express";
import { createCelebs, deleteCelebs, getMyProfileCelebs, updateCelebs } from "../controllers/celebsController";
import { createCelebsComment } from "../controllers/commentsController";
import { likeCelebs, unlikeCelebs } from "../controllers/likeControllers";
import { checkCreateMovie, createCelebsValidator } from "../middleware/validation.middleware";
import { verifyToken } from "../middleware/verifyJWT";


const router: Router = Router();
// Celebs CRUD ROUTER
router.get("/getCelebs/:id",verifyToken, getMyProfileCelebs);
router.post("/createCelebs",verifyToken,createCelebsValidator,checkCreateMovie,createCelebs);

// Celebs Update and Delete ROUTE
router.put("/updateCelebs/:id/",verifyToken,createCelebsValidator,checkCreateMovie,updateCelebs);
router.delete("/deleteCelebs/:id/",verifyToken, deleteCelebs);

// Celebs Comment ROUTE
router.post("/createCelebsComment/:src/:id",verifyToken,createCelebsComment);

// Celebs like ROUTE
router.get("/likeCelebs/:src/:id",verifyToken,likeCelebs);
router.get("/unlikeCelebs/:src/:id",verifyToken,unlikeCelebs);

const celebsRouter = router;
export default celebsRouter;