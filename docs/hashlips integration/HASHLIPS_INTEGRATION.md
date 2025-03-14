# HashLips Art Engine Integration Guide for Delphi Marketplace

This guide explains how to integrate the HashLips Art Engine with your Delphi React NFT marketplace (built with Thirdweb v5 SDK).

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Backend Integration](#backend-integration)
4. [Frontend Integration](#frontend-integration)
5. [Thirdweb NFT Contract Integration](#thirdweb-nft-contract-integration)
6. [Deployment Considerations](#deployment-considerations)

## Overview

HashLips Art Engine is a JavaScript-based tool for creating generative art NFT collections by combining different trait layers with configurable rarity settings. By integrating it with your Delphi NFT marketplace, you can offer users the ability to:

1. Generate custom NFT collections directly from your marketplace
2. Preview generated NFTs before minting
3. Upload the generated assets to IPFS through Thirdweb
4. Deploy NFT smart contracts using Thirdweb's contract options
5. Mint the generated NFTs to the blockchain

## System Architecture

The integration requires a simplified architecture compared to the Python version:

```
┌───────────────────────────────────────────────┐
│                                               │
│  React Frontend (Delphi) with HashLips Logic  │
│                                               │
└─────────────────┬─────────────────────────────┘
                  │
                  ▼
┌───────────────────────────────────────────────┐
│                                               │
│  Next.js API Routes (Asset Management)        │
│                                               │
└───────────────────────────────────────────────┘
```

This architecture offers several advantages:
- Unified JavaScript ecosystem
- No cross-language communication needed
- No separate Express server required
- Direct integration of HashLips into your codebase

## Backend Integration

### 1. Set Up Next.js API Routes

Create the following API routes to handle server-side operations:

```typescript
// src/app/api/generate-nft/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { generateArt } from '@/lib/hashlips';

export async function POST(request: NextRequest) {
  try {
    const { config, amount = 1, seed = null } = await request.json();
    
    // Set up temporary directories for output
    const outputDir = path.join(process.cwd(), 'temp', 'output');
    await fs.ensureDir(outputDir);
    
    // Generate art using HashLips
    const results = await generateArt({
      config,
      outputDir,
      amount,
      seed
    });
    
    return NextResponse.json({
      success: true,
      results,
      count: results.length
    });
  } catch (error) {
    console.error('Error generating NFTs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

```typescript
// src/app/api/layers/route.ts
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
        return {
          name: layer,
          traits: files.map(file => ({
            name: path.parse(file).name,
            file
          }))
        };
      }
      return null;
    }));
    
    return NextResponse.json({ 
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
```

```typescript
// src/app/api/upload-layer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import fs from 'fs-extra';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const layerType = formData.get('layerType') as string;
    const file = formData.get('file') as File;
    
    if (!layerType) {
      return NextResponse.json({ error: 'Layer type is required' }, { status: 400 });
    }
    
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }
    
    // Create layer directory if it doesn't exist
    const layerDir = path.join(process.cwd(), 'assets', 'layers', layerType);
    await fs.ensureDir(layerDir);
    
    // Save file
    const buffer = await file.arrayBuffer();
    const filename = file.name;
    const filepath = path.join(layerDir, filename);
    
    await writeFile(filepath, Buffer.from(buffer));
    
    return NextResponse.json({
      success: true,
      message: `Uploaded ${filename} to ${layerType} layer`
    });
  } catch (error) {
    console.error('Error uploading layer:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

```typescript
// src/app/api/create-layer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { layerName } = await request.json();
    
    if (!layerName) {
      return NextResponse.json({ error: 'Layer name is required' }, { status: 400 });
    }
    
    // Validate layer name (allow only alphanumeric and underscore)
    if (!/^[a-zA-Z0-9_]+$/.test(layerName)) {
      return NextResponse.json({ error: 'Layer name must contain only letters, numbers, and underscores' }, { status: 400 });
    }
    
    // Create directory
    const layerDir = path.join(process.cwd(), 'assets', 'layers', layerName);
    
    // Check if the directory already exists
    if (await fs.pathExists(layerDir)) {
      return NextResponse.json({ error: 'Layer already exists' }, { status: 400 });
    }
    
    await fs.ensureDir(layerDir);
    
    return NextResponse.json({
      success: true,
      message: `Created new layer: ${layerName}`,
      layerName
    });
  } catch (error) {
    console.error('Error creating layer:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

### 2. Create HashLips Library Wrapper

Create a wrapper for HashLips to make it easier to use in your application:

```typescript
// src/lib/hashlips/index.ts
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs-extra';
import path from 'path';
import { sha1 } from 'crypto-hash';

interface Trait {
  name: string;
  weight: number;
  path: string;
}

interface Layer {
  name: string;
  traits: Trait[];
}

interface GenerateConfig {
  name: string;
  description: string;
  baseUri: string;
  width: number;
  height: number;
  layers: {
    name: string;
    options: {
      name: string;
      weight: number;
    }[];
  }[];
}

interface GenerateOptions {
  config: GenerateConfig;
  outputDir: string;
  amount: number;
  seed?: number | null;
}

interface GeneratedNFT {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  dna: string;
}

export async function generateArt({
  config,
  outputDir,
  amount,
  seed = null
}: GenerateOptions): Promise<GeneratedNFT[]> {
  const { width = 512, height = 512 } = config;
  const imagesDir = path.join(outputDir, 'images');
  const metadataDir = path.join(outputDir, 'metadata');
  
  await fs.ensureDir(imagesDir);
  await fs.ensureDir(metadataDir);
  
  const layersDir = path.join(process.cwd(), 'assets', 'layers');
  
  // Load all layers and traits
  const layers: Layer[] = await Promise.all(
    config.layers.map(async (layerConfig) => {
      const layerPath = path.join(layersDir, layerConfig.name);
      await fs.ensureDir(layerPath);
      
      const traits: Trait[] = layerConfig.options.map(option => ({
        name: option.name,
        weight: option.weight,
        path: path.join(layerPath, `${option.name}.png`)
      }));
      
      return {
        name: layerConfig.name,
        traits
      };
    })
  );
  
  // Generate NFTs
  const results: GeneratedNFT[] = [];
  const existingDNAs = new Set<string>();
  
  for (let i = 0; i < amount; i++) {
    // Select traits based on weights
    const selectedTraits = layers.map(layer => {
      const totalWeight = layer.traits.reduce((acc, trait) => acc + trait.weight, 0);
      let random = Math.random() * totalWeight;
      
      for (const trait of layer.traits) {
        random -= trait.weight;
        if (random <= 0) return trait;
      }
      
      return layer.traits[0]; // Fallback
    });
    
    // Generate DNA for the combination
    const dna = await generateDNA(selectedTraits);
    
    // Check for duplicates
    if (existingDNAs.has(dna)) {
      i--; // Try again
      continue;
    }
    
    existingDNAs.add(dna);
    
    // Create canvas and draw layers
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw each selected trait
    for (const trait of selectedTraits) {
      if (await fs.pathExists(trait.path)) {
        const image = await loadImage(trait.path);
        ctx.drawImage(image, 0, 0, width, height);
      }
    }
    
    // Save the image
    const imageFileName = `${i + 1}.png`;
    const imagePath = path.join(imagesDir, imageFileName);
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(imagePath, buffer);
    
    // Create metadata
    const metadata: GeneratedNFT = {
      name: `${config.name} #${i + 1}`,
      description: config.description,
      image: `${config.baseUri}/${imageFileName}`,
      attributes: selectedTraits.map(trait => ({
        trait_type: trait.name,
        value: trait.name
      })),
      dna
    };
    
    // Save metadata
    await fs.writeJson(path.join(metadataDir, `${i + 1}.json`), metadata, { spaces: 2 });
    
    results.push(metadata);
  }
  
  return results;
}

async function generateDNA(traits: Trait[]): Promise<string> {
  const dnaStr = traits.map(t => t.name).join('-');
  return await sha1(dnaStr);
}
```

### 3. Set Up Asset Storage

Create a directory structure for storing layers and generations:

```
/assets
  /layers
    /background
    /body
    /eyes
    /mouth
    /accessories
/temp
  /output
    /images
    /metadata
```

## Frontend Integration

Now, integrate the HashLips generator into the frontend application:

### 1. Create NFT Generator Page

[Previous code for NFT Generator page was included here but was cut off]

### 2. Create Contract Deployment Page

[Previous code for Contract Deployment page was included here but was cut off]

## Thirdweb NFT Contract Integration

[This section was cut off in the previous response]

## Deployment Considerations

[This section was cut off in the previous response] 