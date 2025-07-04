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

import { InMemoryPaymentService } from '../services/payment/InMemoryPaymentService';
import type { IPaymentService } from '../services/payment/IPaymentService';

export const fileStore: IFileStore = new InMemoryFileStore();
export const metadataStore: IMetadataStore = new InMemoryMetadataStore();
export const paymentService: IPaymentService = new InMemoryPaymentService();

const router = Router();

router.post('/upload', upload.single('file'), handleUpload);
router.get('/download/:fileId', handleDownload);

export default router;
