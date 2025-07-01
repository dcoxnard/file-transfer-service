import { Router } from 'express';
import {
  upload,
  handleUpload,
  handleDownload,
} from '../controllers/upload.controller';

const router = Router();

router.post('/upload', upload.single('file'), handleUpload);
router.get('/download/:fileId', handleDownload);

export default router;
