export interface StoredFile {
  readonly buffer: Buffer;
  readonly originalName: string;
  readonly mimeType: string;
  readonly uploadedAt: Date;
  readonly expiresAt: Date;
}

export interface IFileStore {
  get(id: string): Promise<StoredFile | undefined>;
  set(id: string, file: StoredFile): Promise<void>;
  delete(id: string): Promise<void>;
  entries(): AsyncIterableIterator<[string, StoredFile]>;
}
