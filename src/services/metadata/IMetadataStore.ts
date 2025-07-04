export interface FileMetadata {
  readonly id: string;
  readonly originalName: string;
  readonly mimeType: string;
  readonly size: number;
  readonly uploadedAt: Date;
  readonly expiresAt: Date;
}

export interface IMetadataStore {
  get(id: string): Promise<FileMetadata | undefined>;
  set(metadata: FileMetadata): Promise<void>;
  delete(id: string): Promise<void>;
  entries(): AsyncIterableIterator<[string, FileMetadata]>;
}
