import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { generateArt, cleanupTempFiles } from '@/app/lib/hashlips';

export async function POST(request: NextRequest) {
  try {
    const { config, amount = 1, seed = null } = await request.json();
    
    if (!config) {
      return NextResponse.json(
        { error: 'Configuration is required' },
        { status: 400 }
      );
    }
    
    // Validate config
    if (!config.name || !config.description || !config.baseUri) {
      return NextResponse.json(
        { error: 'Name, description, and baseUri are required in the configuration' },
        { status: 400 }
      );
    }
    
    if (!config.layers || !Array.isArray(config.layers) || config.layers.length === 0) {
      return NextResponse.json(
        { error: 'At least one layer is required in the configuration' },
        { status: 400 }
      );
    }
    
    // Set up temporary directories for output
    const outputDir = path.join(process.cwd(), 'temp', 'output');
    await fs.ensureDir(outputDir);
    
    // Clean up previous generation if exists
    await cleanupTempFiles(outputDir);
    
    // Generate art using HashLips
    const results = await generateArt({
      config,
      outputDir,
      amount,
      seed
    });
    
    // Create public URLs for the images
    const publicResults = results.map(nft => {
      // Extract filename from the image path
      const imageName = path.basename(nft.image);
      
      // Create a temporary public URL for the image
      // Using baseUri from config or fallback to a local path
      const publicImageUrl = nft.image.startsWith('ipfs://') 
        ? nft.image 
        : `/temp/output/images/${imageName}`;
      
      return {
        ...nft,
        image: publicImageUrl
      };
    });
    
    return NextResponse.json({
      success: true,
      results: publicResults,
      count: publicResults.length
    });
  } catch (error) {
    console.error('Error generating NFTs:', error);
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