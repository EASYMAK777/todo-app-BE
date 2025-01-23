import express from 'express';
import cors from 'cors';
import router from './routes/task.routes';
import { errorHandler } from './middleware/error.middleware';
import { apiLogger } from './middleware/api-logger.middleware';
import { config } from './config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(apiLogger);  // API logging middleware

// Routes
app.use('/tasks', router);

// Error handling middleware (should be last)
app.use(errorHandler);

// Only listen to port if not in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(config.server.port, () => {
        console.log(`Server is running in ${config.server.nodeEnv} mode on port ${config.server.port}`);
    });
}

// Export the app for serverless
export default app;
