import type { ICleanupService } from './ICleanupService';
import type { IFileStore } from '../store/IFileStore';
import type { IMetadataStore } from '../metadata/IMetadataStore';
import type { ILinkService } from '../link/ILinkService';

export class InMemoryCleanupService implements ICleanupService {
  constructor(
    private readonly fileStore: IFileStore,
    private readonly metadataStore: IMetadataStore,
    private readonly linkService: ILinkService
  ) {}

  start(intervalMs: number = 60_000): void {
    setInterval(async () => {
      const now = new Date();

      for await (const [id, file] of this.fileStore.entries()) {
        if (file.expiresAt <= now) {
          await this.fileStore.delete(id);
          console.log(`[CLEANUP] Deleted expired file: ${id}`);
        }
      }

      for await (const [id, meta] of this.metadataStore.entries()) {
        if (meta.expiresAt <= now) {
          await this.metadataStore.delete(id);
          console.log(`[CLEANUP] Deleted expired metadata: ${id}`);
        }
      }

      for await (const [id, link] of this.linkService.entries()) {
        if (link.expiresAt <= now) {
          await this.linkService.delete(id);
          console.log(`[CLEANUP] Deleted expired link: ${id}`);
        }
      }
    }, intervalMs);
  }
}
