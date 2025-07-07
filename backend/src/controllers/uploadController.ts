import { Request, Response } from 'express';
import crypto from 'crypto';
import { fileStore } from '../services';

export const handleUpload = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const fileId = crypto.randomUUID();
  const uploadedAt = new Date();
  const expiresAt = new Date(Date.now() + 24 * 3600 * 1000); // 24 hours

  await fileStore.set(fileId, {
    buffer: file.buffer,
    originalName: file.originalname,
    mimeType: file.mimetype,
    uploadedAt,
    expiresAt,
  });

  const downloadUrl = `/api/file/${fileId}/download?token=mock-token`;

  return res.json({ fileId, expiresAt, downloadUrl });
};