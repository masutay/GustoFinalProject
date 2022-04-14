import { Router } from "express";
import { logout } from "../controllers/authController";
import {
  getLoginPage,
  getRegisterPage,
  movieHomePage,
  celebsHomePage,
  userProfileMovie,
  userProfileCelebss,
 editMoviePage,
 editCelebsPage,
} from "../controllers/pageController";
import { verifyToken } from "../middleware/verifyJWT";

const router: Router = Router();

router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.get("/logout", logout);
//Movie Page Router
router.get("/movieHome", verifyToken, movieHomePage);
router.get("/updateMoviePage/:id",verifyToken, editMoviePage);
router.get("/profileMovies", verifyToken, userProfileMovie);
//Celebs Page Router
router.get("/celebsHome", verifyToken,celebsHomePage);
router.get("/updateCelebsPage/:id",verifyToken, editCelebsPage);
router.get("/profileCelebs", verifyToken, userProfileCelebss);

const pageRouter = router;
export default pageRouter;
