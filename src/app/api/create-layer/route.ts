import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { layerName } = await request.json();
    
    // Validate layer name
    if (!layerName) {
      return NextResponse.json({ error: 'Layer name is required' }, { status: 400 });
    }
    
    // Validate layer name (allow only alphanumeric and underscore)
    if (!/^[a-zA-Z0-9_]+$/.test(layerName)) {
      return NextResponse.json({ 
        error: 'Layer name must contain only letters, numbers, and underscores' 
      }, { status: 400 });
    }
    
    // Create directory
    const layerDir = path.join(process.cwd(), 'assets', 'layers', layerName);
    
    // Check if the directory already exists
    if (await fs.pathExists(layerDir)) {
      return NextResponse.json({ 
        error: 'Layer already exists' 
      }, { status: 400 });
    }
    
    await fs.ensureDir(layerDir);
    
    return NextResponse.json({
      success: true,
      message: `Created new layer: ${layerName}`,
      layer: {
        name: layerName,
        traits: []
      }
    });
  } catch (error) {
    console.error('Error creating layer:', error);
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