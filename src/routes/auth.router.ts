import { Router } from "express";
import * as passport from "passport";
import { register, login, logout } from '../controllers/authController';
import { signJWT } from "../middleware/signJWT";
import { checkLogin, checkRegister, loginValidator, registerValidator } from "../middleware/validation.middleware";

const router: Router = Router();
// LOCALE AUTH ROUTERS
router.get("/", (req, res) => {
    res.redirect('/login')
})
router.post("/register", registerValidator, checkRegister, register);
router.post("/login", loginValidator, checkLogin, login);
router.post("/logout", logout);

// GOOGLE AUTH ROUTERS   
router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get("/auth/google/redirect",
    passport.authenticate('google', { failureRedirect: '/login' }),
    signJWT
)

// FACEBOOK AUTH ROUTERS    
router.get("/auth/facebook", passport.authenticate('facebook', { scope: 'email' }))
router.get("/auth/facebook/secrets",
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    signJWT
)

const authRouter = router;
export default authRouter;