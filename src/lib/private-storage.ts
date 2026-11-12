import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { randomUUID } from "crypto";

export function storageRoot() {
  const root = path.resolve(process.env.PRIVATE_STORAGE_PATH || "./storage/uploads");
  const publicRoot = path.resolve("public");
  const relative = path.relative(publicRoot, root);
  if (!relative.startsWith("..") && !path.isAbsolute(relative)) throw new Error("Private storage must be outside public");
  return root;
}
export function allowedStorageRoots(): string[] {
  const privateRoot = storageRoot();
  const publicUploads = path.resolve("./public/uploads");
  return [privateRoot, publicUploads];
}

export function resolveStoragePath(storedPath: string) {
  const relative = storedPath.replace(/\\/g, "/").replace(/^uploads\//, "");
  if (!relative || relative.split("/").some(p => !p || p === "." || p === "..") || path.isAbsolute(relative)) throw new Error("Invalid storage path");
  const root = storageRoot();
  const result = path.resolve(root, relative);

  // Fallback to public/uploads if file is physically stored there
  const publicUploads = path.resolve("./public/uploads");
  const fallbackResult = path.resolve(publicUploads, relative);
  if (!existsSync(result) && existsSync(fallbackResult)) {
    if (fallbackResult.startsWith(publicUploads + path.sep)) {
      return fallbackResult;
    }
  }

  if (!result.startsWith(root + path.sep)) throw new Error("Invalid storage path");
  return result;
}
export async function savePdf(buffer: Buffer) {
  const storedFileName = `${randomUUID()}.pdf`;
  const storagePath = `uploads/pyq/${storedFileName}`;
  const filePath = resolveStoragePath(storagePath);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buffer, { flag: "wx" });
  return { storedFileName, storagePath };
}
export async function removeStoredFile(storagePath: string) { await fs.unlink(resolveStoragePath(storagePath)); }
