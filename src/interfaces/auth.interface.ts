import IUser from "./user.interface";

export  default interface IDataStoredInToken {    
    user_id?: string;  
    browserInfo:string;
    userName:string;
  }
  //declaring the interface by adding userID which we use every single page
  declare global {
    namespace Express {
      export interface Request {
        userID: string;       
      }
    }
}
  
