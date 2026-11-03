import { Readable } from "stream";

export interface StoredFileResult {
  originalFileName: string;
  storedFileName: string;
  mimeType: string;
  sizeBytes: number;
  relativePath: string;
}

export interface StorageProvider {
  save(buffer: Buffer, subDir: string, originalName: string): Promise<StoredFileResult>;
  getStream(relativePath: string): Promise<Readable>;
  delete(relativePath: string): Promise<boolean>;
  getPublicUrl(relativePath: string): string;
}
