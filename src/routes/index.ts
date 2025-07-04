import { Router } from 'express';
import {
  upload,
  handleUpload,
  handleDownload,
} from '../controllers/upload.controller';
import { InMemoryFileStore } from '../services/store/InMemoryFileStore';
import type { IFileStore } from '../services/store/IFileStore';

export const fileStore: IFileStore = new InMemoryFileStore();

const router = Router();

router.post('/upload', upload.single('file'), handleUpload);
router.get('/download/:fileId', handleDownload);

export default router;
