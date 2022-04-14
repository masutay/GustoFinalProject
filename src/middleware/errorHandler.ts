import { Response, Request, NextFunction } from 'express';

// if there is any server side error calling this middleware in index.ts
export const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {

    res.status(500).render('500_internal_server_error_page', { error: error });
};