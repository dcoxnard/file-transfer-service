import express from 'express';
import path from 'path';
import router from './routes';

const app = express();

// Serve frontend build output
const DIST_PATH = path.join(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(DIST_PATH));

// API routes
app.use('/api', router);

// Fallback: serve React index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

export default app;
