import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import fs from 'fs-extra';
import path from 'path';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp'
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const layerType = formData.get('layerType') as string;
    const file = formData.get('file') as File;
    
    // Validate layer type
    if (!layerType) {
      return NextResponse.json({ error: 'Layer type is required' }, { status: 400 });
    }
    
    // Validate layer name (allow only alphanumeric and underscore)
    if (!/^[a-zA-Z0-9_]+$/.test(layerType)) {
      return NextResponse.json({ 
        error: 'Layer name must contain only letters, numbers, and underscores' 
      }, { status: 400 });
    }
    
    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File size exceeds the maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
      }, { status: 400 });
    }
    
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: `File type not allowed. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}` 
      }, { status: 400 });
    }
    
    // Sanitize filename
    const originalFilename = file.name;
    const fileExtension = path.extname(originalFilename);
    const baseName = path.basename(originalFilename, fileExtension);
    
    // Replace spaces and special characters with underscores
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedFilename = `${sanitizedBaseName}${fileExtension}`;
    
    // Create layer directory if it doesn't exist
    const layerDir = path.join(process.cwd(), 'assets', 'layers', layerType);
    await fs.ensureDir(layerDir);
    
    // Save file
    const buffer = await file.arrayBuffer();
    const filepath = path.join(layerDir, sanitizedFilename);
    
    await writeFile(filepath, Buffer.from(buffer));
    
    return NextResponse.json({
      success: true,
      message: `Uploaded ${sanitizedFilename} to ${layerType} layer`,
      trait: {
        name: sanitizedBaseName,
        file: sanitizedFilename,
        path: `/assets/layers/${layerType}/${sanitizedFilename}`
      }
    });
  } catch (error) {
    console.error('Error uploading layer:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Add OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
} 