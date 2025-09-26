import path from 'path';

export function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

export function isValidImageFile(filename: string): boolean {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  const extension = getFileExtension(filename);
  return allowedExtensions.includes(extension);
}
