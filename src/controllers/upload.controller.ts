import { Request, Response } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

interface StoredFile {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}

const fileStore = new Map<string, StoredFile>();

// 👇 This is the key fix:
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const handleUpload = (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileId = crypto.randomUUID();
  fileStore.set(fileId, {
    buffer: req.file.buffer,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
  });

  const downloadUrl = `/api/download/${fileId}`;

  res.json({
    message: 'Upload successful',
    filename: req.file.originalname,
    size: req.file.size,
    downloadUrl,
  });
};

export const handleDownload = (req: Request, res: Response) => {
  const { fileId } = req.params;
  const stored = fileStore.get(fileId);

  if (!stored) {
    return res.status(404).json({ error: 'File not found or expired' });
  }

  fileStore.delete(fileId); // one-time download

  res.setHeader('Content-Type', stored.mimeType);
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${stored.originalName}"`
  );
  res.send(stored.buffer);
};
