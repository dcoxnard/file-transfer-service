import { Request, Response } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const fileStore = new Map<string, Buffer>();

// 👇 This is the key fix:
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const handleUpload = (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileId = crypto.randomUUID();
  fileStore.set(fileId, req.file.buffer);

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
  const file = fileStore.get(fileId);

  if (!file) {
    return res.status(404).json({ error: 'File not found or expired' });
  }

  fileStore.delete(fileId);

  res.setHeader('Content-Disposition', `attachment; filename="file.bin"`);
  res.send(file);
};
