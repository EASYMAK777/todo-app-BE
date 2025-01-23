import { Request, Response } from 'express';
import { config } from '../config';

export class Logger {
    private static formatMessage(message: string, data?: any): string {
        const timestamp = new Date().toISOString();
        const environment = config.server.nodeEnv;
        const logMessage = `[${timestamp}] [${environment}] ${message}`;
        return data ? `${logMessage}\n${JSON.stringify(data, null, 2)}` : logMessage;
    }

    static error(message: string, error?: any) {
        const errorMessage = this.formatMessage(message, {
            error: error?.message || error,
            stack: config.isDevelopment() ? error?.stack : undefined
        });
        console.error(errorMessage);
    }

    static apiLog(req: Request, res: Response, responseTime: number) {
        const logData = {
            timestamp: new Date().toISOString(),
            environment: config.server.nodeEnv,
            method: req.method,
            url: req.url,
            status: res.statusCode,
            responseTime: `${responseTime}ms`,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            body: config.isDevelopment() && req.method !== 'GET' ? req.body : undefined
        };

        console.log(JSON.stringify(logData));
    }
} 