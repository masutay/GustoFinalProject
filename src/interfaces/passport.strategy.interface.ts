export interface IpassportStrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    profileFields?: string[];
    enableProof?: boolean
    passReqToCallback?: boolean
}





