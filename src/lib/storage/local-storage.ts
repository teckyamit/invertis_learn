import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Readable } from "stream";
import { StorageProvider, StoredFileResult } from "./index";

export class LocalStorageProvider implements StorageProvider {
  private baseDir: string;

  constructor() {
    this.baseDir = path.resolve(process.env.LOCAL_STORAGE_PATH || "./public/uploads");
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async save(buffer: Buffer, subDir: string, originalName: string): Promise<StoredFileResult> {
    const targetDir = path.join(this.baseDir, subDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const ext = path.extname(originalName) || ".pdf";
    const uniqueId = crypto.randomUUID();
    const storedFileName = `${uniqueId}${ext}`;
    const fullPath = path.join(targetDir, storedFileName);
    const relativePath = path.join(subDir, storedFileName).replace(/\\/g, "/");

    await fs.promises.writeFile(fullPath, buffer);

    return {
      originalFileName: originalName,
      storedFileName,
      mimeType: "application/pdf",
      sizeBytes: buffer.length,
      relativePath,
    };
  }

  async getStream(relativePath: string): Promise<Readable> {
    const fullPath = path.join(this.baseDir, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${relativePath}`);
    }
    return fs.createReadStream(fullPath);
  }

  async delete(relativePath: string): Promise<boolean> {
    const fullPath = path.join(this.baseDir, relativePath);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      return true;
    }
    return false;
  }

  getPublicUrl(relativePath: string): string {
    return `/uploads/${relativePath}`;
  }
}

export const storage = new LocalStorageProvider();
