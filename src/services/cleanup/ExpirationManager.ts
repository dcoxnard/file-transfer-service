import fileStore from '../store/InMemoryFileStore'; // path relative to services/cleanup

export function startExpirationCleanup(intervalMs: number = 60_000) {
  setInterval(() => {
    const now = new Date();

    for (const [id, file] of fileStore.entries()) {
      if (file.expiresAt <= now) {
        fileStore.delete(id);
        console.log(`[CLEANUP] Deleted expired file: ${id}`);
      }
    }
  }, intervalMs);
}
