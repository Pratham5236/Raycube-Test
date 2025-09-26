import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    if (!youtubeRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // For now, we'll return a direct download link using a free YouTube downloader service
    // In a production environment, you'd want to use a proper YouTube downloader library
    const downloadUrl = `https://www.y2mate.com/en/search/${encodeURIComponent(url)}`;
    
    return NextResponse.json({
      success: true,
      downloadUrl,
      message: 'Please visit the download page to get your video'
    });
  } catch (error) {
    console.error('YouTube download error:', error);
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    );
  }
}
