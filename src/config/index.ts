import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
    url: string;
}

interface ServerConfig {
    port: number;
    nodeEnv: string;
    apiPrefix: string;
}

interface LogConfig {
    level: string;
    dir: string;
}

class Config {
    public database: DatabaseConfig;
    public server: ServerConfig;
    public log: LogConfig;

    constructor() {
        this.database = {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306', 10),
            user: process.env.DB_USER || 'admin',
            password: process.env.DB_PASSWORD || 'root',
            name: process.env.DB_NAME || 'todo_db',
            get url() {
                return `mysql://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
            }
        };

        this.server = {
            port: parseInt(process.env.PORT || '3000', 10),
            nodeEnv: process.env.NODE_ENV || 'development',
            apiPrefix: process.env.API_PREFIX || '/api'
        };

        this.log = {
            level: process.env.LOG_LEVEL || 'info',
            dir: process.env.LOG_DIR || 'logs'
        };
    }

    public isDevelopment(): boolean {
        return this.server.nodeEnv === 'development';
    }

    public isProduction(): boolean {
        return this.server.nodeEnv === 'production';
    }

    public getLogPath(filename: string): string {
        return path.join(process.cwd(), this.log.dir, filename);
    }
}

export const config = new Config(); 