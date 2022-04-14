import * as dotenv from "dotenv";
import * as passport from "passport";
import * as passportFacebook from "passport-google-oauth2";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { IpassportStrategyOption } from "../interfaces/passport.strategy.interface";
import IUser from "../interfaces/user.interface";
import { CreateUserDto } from "../dtos/users.dto";

dotenv.config();
const GoogleStrategy = passportFacebook.Strategy;
const passportStrategy: passport.PassportStatic = passport;

const strategyOptions: IpassportStrategyOption = {
  clientID: process.env.CLIENT_GOOGLE_APP_ID,
  clientSecret: process.env.CLIENT_GOOGLE_SECRET,
  callbackURL: `${process.env.SERVER_API_URL}/auth/google/redirect`,
};

const verifyCallback = async (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
): Promise<any> => {
  try {
    const email = profile._json.email;
    const checkUser = await User.findOne({ email });
    if (checkUser) return done(null, checkUser);
    const user: CreateUserDto = await User.create({
      id: profile.id,
      userName: profile.email.substr(0, profile.email.indexOf("@")),
      email: profile.email,
      password: profile.email,
    }).save();
    return done(null, user);
  } catch (error) {
    throw new Error();
  }
};

export const googleStrategy = () => {
  passportStrategy.use(new GoogleStrategy(strategyOptions, verifyCallback));

  passportStrategy.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });
  passportStrategy.deserializeUser((user: IUser, done) => {
    User.findOne(user.id).then((user) => {
      done(null, user);
    });
  });
};
