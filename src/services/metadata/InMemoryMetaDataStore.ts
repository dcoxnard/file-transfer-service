import { IMetadataStore, FileMetadata } from './IMetadataStore';

export class InMemoryMetadataStore implements IMetadataStore {
  private store = new Map<string, FileMetadata>();

  async get(id: string): Promise<FileMetadata | undefined> {
    return this.store.get(id);
  }

  async set(metadata: FileMetadata): Promise<void> {
    this.store.set(metadata.id, metadata);
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async *entries(): AsyncIterableIterator<[string, FileMetadata]> {
    for (const entry of this.store.entries()) {
      yield entry;
    }
  }
}
