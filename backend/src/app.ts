import express from 'express';
import path from 'path';
import router from './routes';

const app = express();

// Serve frontend build output
const DIST_PATH = path.join(__dirname, '..', '..', 'frontend', 'dist');

// API routes
app.use('/api', router);


export default app;
