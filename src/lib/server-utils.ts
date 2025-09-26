import path from 'path';
import fs from 'fs';

export function ensureUploadDir(): string {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
}

export function generateDownloadUrl(filename: string): string {
  return `/api/download/${filename}`;
}

export function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

export function isValidImageFile(filename: string): boolean {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  const extension = getFileExtension(filename);
  return allowedExtensions.includes(extension);
}
