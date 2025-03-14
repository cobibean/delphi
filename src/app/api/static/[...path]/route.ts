import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Get the file path from URL parameters
    const filePath = params.path.join('/');
    
    // Determine if this is a temp or assets path
    let fullPath: string;
    if (filePath.startsWith('output/')) {
      fullPath = path.join(process.cwd(), 'temp', filePath);
    } else {
      fullPath = path.join(process.cwd(), 'assets', filePath);
    }
    
    // Check if file exists
    if (!await fs.pathExists(fullPath)) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Read the file
    const fileBuffer = await fs.readFile(fullPath);
    
    // Determine content type based on extension
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.json') contentType = 'application/json';
    
    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error serving static file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 