import { fileStore } from '../../routes';

export function startExpirationCleanup(intervalMs: number = 60_000) {
  setInterval(async () => {
    const now = new Date();

    for await (const [id, file] of fileStore.entries()) {
      if (file.expiresAt <= now) {
        await fileStore.delete(id);
        console.log(`[CLEANUP] Deleted expired file: ${id}`);
      }
    }
  }, intervalMs);
}
