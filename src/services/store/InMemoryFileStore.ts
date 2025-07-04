import { IFileStore, StoredFile } from './IFileStore';

export class InMemoryFileStore implements IFileStore {
  private store = new Map<string, StoredFile>();

  async get(id: string): Promise<StoredFile | undefined> {
    return this.store.get(id);
  }

  async set(id: string, file: StoredFile): Promise<void> {
    this.store.set(id, file);
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async *entries(): AsyncIterableIterator<[string, StoredFile]> {
    for (const entry of this.store.entries()) {
      yield entry;
    }
  }
}
