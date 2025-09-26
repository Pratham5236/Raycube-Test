import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { generateId } from '@/lib/utils';
import { isValidImageFile } from '@/lib/server-utils';
import { put } from '@vercel/blob';

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
    const fileExtension = file.name.split('.').pop();
    const filename = `${fileId}.${fileExtension}`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });
    
    // Save to database
    const photoUpload = await database.createPhotoUpload({
      id: fileId,
      filename,
      originalName: file.name,
      uploadPath: blob.url, // Store the blob URL instead of local path
      downloadUrl: blob.downloadUrl
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
