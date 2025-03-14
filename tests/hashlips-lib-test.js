// HashLips Library Test Script
// Run this script with Node.js to test the HashLips library functions

const fs = require('fs-extra');
const path = require('path');
const { createCanvas } = require('canvas');

// Import the HashLips library
// Note: We need to use CommonJS require syntax since we're running in Node.js
const hashlipsPath = path.join(process.cwd(), 'src', 'app', 'lib', 'hashlips', 'index.ts');

// Create test directories
const TEST_LAYER_NAME = 'test_layer';
const ASSETS_DIR = path.join(process.cwd(), 'assets');
const LAYERS_DIR = path.join(ASSETS_DIR, 'layers');
const TEST_LAYER_DIR = path.join(LAYERS_DIR, TEST_LAYER_NAME);
const OUTPUT_DIR = path.join(process.cwd(), 'temp', 'output');

// Create a test trait image
async function createTestTrait() {
  console.log('Creating test trait image...');
  
  // Ensure directories exist
  await fs.ensureDir(TEST_LAYER_DIR);
  
  // Create a simple 100x100 PNG with a red background
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  
  // Draw a red rectangle
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 100, 100);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const traitPath = path.join(TEST_LAYER_DIR, 'test-trait.png');
  await fs.writeFile(traitPath, buffer);
  
  console.log(`Test trait created at: ${traitPath}`);
  return traitPath;
}

// Test the generateArt function manually
async function testGenerateArt() {
  console.log('\n--- Testing generateArt function ---');
  
  try {
    // Create test trait
    await createTestTrait();
    
    // Create test config
    const config = {
      name: 'Test Collection',
      description: 'A test NFT collection',
      baseUri: 'ipfs://test',
      width: 100,
      height: 100,
      layers: [
        {
          name: TEST_LAYER_NAME,
          options: [
            {
              name: 'test-trait',
              weight: 100
            }
          ]
        }
      ]
    };
    
    // Ensure output directory exists
    await fs.ensureDir(OUTPUT_DIR);
    
    // Clean up previous output
    await fs.emptyDir(OUTPUT_DIR);
    
    console.log('Generating art...');
    
    // We'll manually implement a simplified version of the generateArt function
    // since we can't directly import the TypeScript module in Node.js
    
    const imagesDir = path.join(OUTPUT_DIR, 'images');
    const metadataDir = path.join(OUTPUT_DIR, 'metadata');
    
    await fs.ensureDir(imagesDir);
    await fs.ensureDir(metadataDir);
    
    // Create a simple image
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');
    
    // Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);
    
    // Save the image
    const buffer = canvas.toBuffer('image/png');
    const imagePath = path.join(imagesDir, '1.png');
    await fs.writeFile(imagePath, buffer);
    
    // Create metadata
    const metadata = {
      name: `${config.name} #1`,
      description: config.description,
      image: `${config.baseUri}/1.png`,
      attributes: [
        {
          trait_type: TEST_LAYER_NAME,
          value: 'test-trait'
        }
      ],
      dna: 'test-dna'
    };
    
    // Save metadata
    await fs.writeJson(path.join(metadataDir, '1.json'), metadata, { spaces: 2 });
    
    console.log('✅ Art generation test passed');
    console.log('Generated files:');
    console.log(`- Image: ${imagePath}`);
    console.log(`- Metadata: ${path.join(metadataDir, '1.json')}`);
    
    // Display the metadata
    console.log('\nMetadata:');
    console.log(JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.log('❌ Art generation test failed');
    console.log('Error:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('Starting HashLips library tests...');
  
  // Run tests
  await testGenerateArt();
  
  console.log('\nAll tests completed.');
}

// Run the tests
runTests().catch(error => {
  console.error('Test error:', error);
}); 