export interface StoredFile {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  uploadedAt: Date;
  expiresAt: Date;
}

const fileStore = new Map<string, StoredFile>();

export default fileStore;
