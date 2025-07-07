import express from 'express';
import path from 'path';
import apiRouter from './routes/api';


const app = express();
app.use(express.json()); // ✅ This enables JSON parsing
app.use(express.urlencoded({ extended: true }));


// Serve frontend build output
const DIST_PATH = path.join(__dirname, '..', '..', 'frontend', 'dist');

// API routes
app.use('/api', apiRouter);


export default app;
