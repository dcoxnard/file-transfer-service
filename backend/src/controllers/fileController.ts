import { Request, Response } from 'express';
import { fileStore } from '../services';

export const getFileMetadata = async (req: Request, res: Response) => {
  const { fileId } = req.params;
  const file = await fileStore.get(fileId);

  if (!file) return res.status(404).json({ error: 'File not found' });

  const now = new Date();
  const isExpired = file.expiresAt < now;

  return res.json({
    fileId,
    filename: file.originalName,
    size: file.buffer.byteLength,
    expiresAt: file.expiresAt,
    isExpired,
  });
};

export const downloadFile = async (req: Request, res: Response) => {
  const { fileId } = req.params;
  const file = await fileStore.get(fileId);

  if (!file) return res.status(404).json({ error: 'File not found' });
  if (file.expiresAt < new Date()) return res.status(410).json({ error: 'File expired' });

  res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
  res.setHeader('Content-Type', file.mimeType);

  res.send(file.buffer);
  await fileStore.delete(fileId); // auto-delete after 1 download
};
