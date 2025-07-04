import { Request, Response } from 'express';
import multer from 'multer';
import crypto from 'crypto';

import {
  fileStore,
  metadataStore,
  linkService,
  loggingService,
} from '../routes'; // ← from src/routes/index.ts

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// 👇 This is the key fix:
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Define expected route params
interface DownloadParams {
  fileId: string;
}

export const handleUpload = async (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileId = crypto.randomUUID();
  const expiresIn = Number(req.body.expiresInHours || 24); // default to 24h
  const uploadedAt = new Date();
  const expiresAt = new Date(uploadedAt.getTime() + expiresIn * 60 * 60 * 1000);

  await fileStore.set(fileId, {
    buffer: req.file.buffer,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    uploadedAt,
    expiresAt,
  });

  const linkId = await linkService.create(fileId, expiresAt);
  const downloadUrl = `/api/download/${linkId}`;

  await loggingService.info('File uploaded', { fileId });

  res.json({
    message: 'Upload successful',
    filename: req.file.originalname,
    size: req.file.size,
    downloadUrl,
  });
};

export const handleDownload = async (
  req: Request<DownloadParams>,
  res: Response
) => {
  const { fileId: linkId } = req.params;

  const link = await linkService.resolve(linkId);
  if (!link || link.expiresAt <= new Date()) {
    await linkService.delete(linkId); // expired
    return res.status(404).json({ error: 'Link expired or invalid' });
  }

  const file = await fileStore.get(link.fileId);
  if (!file || file.expiresAt <= new Date()) {
    await fileStore.delete(link.fileId);
    await linkService.delete(linkId);
    return res.status(404).json({ error: 'File expired or missing' });
  }

  await fileStore.delete(link.fileId); // one-time
  await linkService.delete(linkId);

  res.setHeader('Content-Type', file.mimeType);
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${file.originalName}"`
  );
  res.send(file.buffer);
};
