import * as dotenv from "dotenv";
import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from "../dtos/users.dto";
import { User } from "../entity/User";
import { IpassportStrategyOption } from "../interfaces/passport.strategy.interface";
import IUser from "../interfaces/user.interface";


dotenv.config();
const FacebookStrategy = passportFacebook.Strategy;
const passportStrategy: passport.PassportStatic = passport;

const strategyOptions: IpassportStrategyOption = {
  clientID: process.env.CLIENT_FACEBOOK_APP_ID,
  clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
  callbackURL: `${process.env.SERVER_FB_API_URL}/auth/facebook/secrets`,
  profileFields: ["id", "displayName", "email", "photos"],
};

const verifyCallback = async (accessToken: any, refreshToken: any, profile: any, done: any): Promise<any> => {
  try {
    const userProfile = profile._json
    const email = userProfile.email
    const checkUser = await User.findOne({email});
    if (checkUser) return done(null, checkUser);
    const hashPassword = await bcrypt.hash(userProfile.email, 10)
    const user: CreateUserDto = await User.create({
      id: userProfile.id,    
      email: userProfile.email,
      userName: userProfile.email.substr(0, userProfile.email.indexOf('@')),
      password: hashPassword
    }).save();
    return done(null, user);

  } catch (error) {
    throw new Error()
  }
};

export const facebookStrategy = () => {
  passportStrategy.use(new FacebookStrategy(strategyOptions, verifyCallback));

  passportStrategy.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });
  passportStrategy.deserializeUser((user: IUser, done) => {
    User.findOne(user.id).then((user) => {
      done(null, user);
    })
  });
}


