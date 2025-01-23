import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        Logger.error(`${error.statusCode} - ${error.message}`, error);
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    // Log unexpected errors
    Logger.error('Unexpected Error', error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}; 