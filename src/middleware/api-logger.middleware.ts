import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Log after response is sent
    res.on('finish', () => {
        const responseTime = Date.now() - start;
        Logger.apiLog(req, res, responseTime);
    });

    next();
}; 