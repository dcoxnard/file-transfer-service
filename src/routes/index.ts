import { Router } from 'express';
import {
  upload,
  handleUpload,
  handleDownload,
} from '../controllers/upload.controller';

import { InMemoryFileStore } from '../services/store/InMemoryFileStore';
import type { IFileStore } from '../services/store/IFileStore';

import { InMemoryMetadataStore } from '../services/metadata/InMemoryMetadataStore';
import type { IMetadataStore } from '../services/metadata/IMetadataStore';

export const fileStore: IFileStore = new InMemoryFileStore();
export const metadataStore: IMetadataStore = new InMemoryMetadataStore();

const router = Router();

router.post('/upload', upload.single('file'), handleUpload);
router.get('/download/:fileId', handleDownload);

export default router;
