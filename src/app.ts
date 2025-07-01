import express from 'express';
import path from 'path';

const app = express();

// Serve files in the public directory (e.g. index.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Your existing API routes
import router from './routes';
app.use('/api', router);

export default app;
