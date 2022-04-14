import * as  jwt from "jsonwebtoken";
import IUser from '../interfaces/user.interface';
import IDataStoredInToken from "../interfaces/auth.interface";
import * as dotenv from "dotenv"

dotenv.config()
//create jwt token and add user id and browser name in. 
export const createToken = (user: IUser, browserInfo: string):string=> {
  try {
    const expiresIn:number = 600 * 60 ; // an hour
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const dataStoredInToken: IDataStoredInToken = {
      user_id: user.id,
      browserInfo: browserInfo,
      userName: user.userName,
    };
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn })
    return token
  } catch (error) {
    throw new Error
  }
 
}

