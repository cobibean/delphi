import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const layersDir = path.join(process.cwd(), 'assets', 'layers');
    await fs.ensureDir(layersDir);
    
    const layers = await fs.readdir(layersDir);
    
    const layerDetails = await Promise.all(layers.map(async (layer) => {
      const layerPath = path.join(layersDir, layer);
      const stats = await fs.stat(layerPath);
      
      if (stats.isDirectory()) {
        const files = await fs.readdir(layerPath);
        
        // Filter for image files only
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
        });
        
        return {
          name: layer,
          traits: imageFiles.map(file => ({
            name: path.parse(file).name,
            file,
            path: `/assets/layers/${layer}/${file}`
          }))
        };
      }
      return null;
    }));
    
    return NextResponse.json({ 
      success: true,
      layers: layerDetails.filter(Boolean)
    });
  } catch (error) {
    console.error('Error fetching layers:', error);
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