export interface LinkData {
  readonly fileId: string;
  readonly createdAt: Date;
  readonly expiresAt: Date;
}

export interface ILinkService {
  create(fileId: string, expiresAt: Date): Promise<string>; // returns link ID
  resolve(linkId: string): Promise<LinkData | undefined>;
  delete(linkId: string): Promise<void>;
  entries(): AsyncIterableIterator<[string, LinkData]>;
}
