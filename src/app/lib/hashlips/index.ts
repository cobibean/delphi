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
      
      const traits: Trait[] = layerConfig.options.map(option => {
        // Ensure we use a filesystem path, not a URL
        const traitPath = path.join(layerPath, `${option.name}.png`);
        
        return {
          name: option.name,
          weight: option.weight,
          path: traitPath // Use filesystem path instead of URL
        };
      });
      
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
      try {
        if (await fs.pathExists(trait.path)) {
          const image = await loadImage(trait.path);
          ctx.drawImage(image, 0, 0, width, height);
        } else {
          console.warn(`Trait file not found: ${trait.path}`);
        }
      } catch (error) {
        console.error(`Error loading trait image ${trait.path}:`, error);
        // Continue without this trait if there's an error
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
      attributes: selectedTraits.map((trait, index) => ({
        trait_type: layers[index].name,
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

// Helper function to clean up temporary files
export async function cleanupTempFiles(outputDir: string): Promise<void> {
  try {
    if (await fs.pathExists(outputDir)) {
      await fs.emptyDir(outputDir);
      console.log(`Cleaned up temporary files in ${outputDir}`);
    }
  } catch (error) {
    console.error('Error cleaning up temporary files:', error);
  }
} 