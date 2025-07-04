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

import { InMemoryLinkService } from '../services/link/InMemoryLinkService';
import type { ILinkService } from '../services/link/ILinkService';

import { InMemoryCleanupService } from '../services/cleanup/InMemoryCleanupService';
import type { ICleanupService } from '../services/cleanup/ICleanupService';

import { ConsoleLoggingService } from '../services/logging/ConsoleLoggingService';
import type { ILoggingService } from '../services/logging/ILoggingService';

const fileStore: IFileStore = new InMemoryFileStore();
const metadataStore: IMetadataStore = new InMemoryMetadataStore();
const paymentService: IPaymentService = new InMemoryPaymentService();
const linkService: ILinkService = new InMemoryLinkService();
const cleanupService: ICleanupService = new InMemoryCleanupService(
  fileStore,
  metadataStore,
  linkService
);
const loggingService: ILoggingService = new ConsoleLoggingService();

const router = Router();

router.post('/upload', upload.single('file'), handleUpload);
router.get('/download/:fileId', handleDownload);

export {
  fileStore,
  metadataStore,
  paymentService,
  linkService,
  cleanupService,
  loggingService,
};

export default router;
