import { ILinkService, LinkData } from './ILinkService';

export class InMemoryLinkService implements ILinkService {
  private links = new Map<string, LinkData>();

  async create(fileId: string, expiresAt: Date): Promise<string> {
    const linkId = `link_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;
    const data: LinkData = {
      fileId,
      createdAt: new Date(),
      expiresAt,
    };
    this.links.set(linkId, data);
    return linkId;
  }

  async resolve(linkId: string): Promise<LinkData | undefined> {
    return this.links.get(linkId);
  }

  async delete(linkId: string): Promise<void> {
    this.links.delete(linkId);
  }

  async *entries(): AsyncIterableIterator<[string, LinkData]> {
    for (const entry of this.links.entries()) {
      yield entry;
    }
  }
}
