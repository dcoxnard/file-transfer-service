import { Request, Response } from 'express';
import multer from 'multer';
import crypto from 'crypto';

import { fileStore } from '../routes'; // ← from src/routes/index.ts

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// 👇 This is the key fix:
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const handleUpload = (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileId = crypto.randomUUID();
  const expiresIn = Number(req.body.expiresInHours || 24); // Default: 24h
  const uploadedAt = new Date();
  const expiresAt = new Date(uploadedAt.getTime() + expiresIn * 60 * 60 * 1000);

  fileStore.set(fileId, {
    buffer: req.file.buffer,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    uploadedAt,
    expiresAt,
  });

  const downloadUrl = `/api/download/${fileId}`;

  res.json({
    message: 'Upload successful',
    filename: req.file.originalname,
    size: req.file.size,
    downloadUrl,
  });
};

export const handleDownload = async (req: Request, res: Response) => {
  const { fileId } = req.params;

  const stored = await fileStore.get(fileId);

  if (!stored || stored.expiresAt <= new Date()) {
    await fileStore.delete(fileId);
    return res.status(404).json({ error: 'File not found or expired' });
  }

  await fileStore.delete(fileId); // one-time download

  res.setHeader('Content-Type', stored.mimeType);
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${stored.originalName}"`
  );
  res.send(stored.buffer);
};

export default fileStore;
