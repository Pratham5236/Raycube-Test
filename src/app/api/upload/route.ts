import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { generateId } from '@/lib/utils';
import { ensureUploadDir, generateDownloadUrl, isValidImageFile } from '@/lib/server-utils';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!isValidImageFile(file.name)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only image files are allowed.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileId = generateId();
    const fileExtension = path.extname(file.name);
    const filename = `${fileId}${fileExtension}`;
    
    // Ensure upload directory exists
    const uploadDir = ensureUploadDir();
    const filePath = path.join(uploadDir, filename);
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);
    
    // Generate download URL
    const downloadUrl = generateDownloadUrl(filename);
    
    // Save to database
    const photoUpload = await database.createPhotoUpload({
      id: fileId,
      filename,
      originalName: file.name,
      uploadPath: filePath,
      downloadUrl
    });

    return NextResponse.json({
      id: photoUpload.id,
      downloadUrl: photoUpload.downloadUrl,
      filename: photoUpload.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
