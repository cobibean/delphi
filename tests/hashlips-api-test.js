// HashLips API Test Script
// Run this script with Node.js to test the HashLips API endpoints

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

// Base URL for API endpoints
const BASE_URL = 'http://localhost:3000/api';

// Test data
const TEST_LAYER_NAME = 'test_layer';
const TEST_IMAGE_PATH = path.join(__dirname, 'test-image.png');

// Create a test image if it doesn't exist
function createTestImage() {
  if (!fs.existsSync(TEST_IMAGE_PATH)) {
    console.log('Creating test image...');
    
    // Create a simple 100x100 PNG with a red background
    const { createCanvas } = require('canvas');
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');
    
    // Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);
    
    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(TEST_IMAGE_PATH, buffer);
    
    console.log('Test image created successfully.');
  }
}

// Test create-layer endpoint
async function testCreateLayer() {
  console.log('\n--- Testing create-layer endpoint ---');
  
  try {
    // Delete the test layer if it exists
    const layersDir = path.join(process.cwd(), 'assets', 'layers');
    const testLayerDir = path.join(layersDir, TEST_LAYER_NAME);
    
    if (fs.existsSync(testLayerDir)) {
      fs.rmSync(testLayerDir, { recursive: true, force: true });
      console.log(`Deleted existing test layer: ${TEST_LAYER_NAME}`);
    }
    
    // Create the test layer
    const response = await fetch(`${BASE_URL}/create-layer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        layerName: TEST_LAYER_NAME,
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ create-layer endpoint test passed');
      console.log('Response:', data);
    } else {
      console.log('❌ create-layer endpoint test failed');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.log('❌ create-layer endpoint test failed');
    console.log('Error:', error.message);
  }
}

// Test upload-layer endpoint
async function testUploadLayer() {
  console.log('\n--- Testing upload-layer endpoint ---');
  
  try {
    // Create test image
    createTestImage();
    
    // Create form data
    const formData = new FormData();
    formData.append('layerType', TEST_LAYER_NAME);
    formData.append('file', fs.createReadStream(TEST_IMAGE_PATH));
    
    // Upload the test image
    const response = await fetch(`${BASE_URL}/upload-layer`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ upload-layer endpoint test passed');
      console.log('Response:', data);
    } else {
      console.log('❌ upload-layer endpoint test failed');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.log('❌ upload-layer endpoint test failed');
    console.log('Error:', error.message);
  }
}

// Test layers endpoint
async function testLayers() {
  console.log('\n--- Testing layers endpoint ---');
  
  try {
    const response = await fetch(`${BASE_URL}/layers`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ layers endpoint test passed');
      console.log('Response:', data);
    } else {
      console.log('❌ layers endpoint test failed');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.log('❌ layers endpoint test failed');
    console.log('Error:', error.message);
  }
}

// Test generate-nft endpoint
async function testGenerateNFT() {
  console.log('\n--- Testing generate-nft endpoint ---');
  
  try {
    // Generate NFT configuration
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
              name: 'test-image',
              weight: 100
            }
          ]
        }
      ]
    };
    
    // Generate NFT
    const response = await fetch(`${BASE_URL}/generate-nft`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config,
        amount: 1
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ generate-nft endpoint test passed');
      console.log('Response:', data);
    } else {
      console.log('❌ generate-nft endpoint test failed');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.log('❌ generate-nft endpoint test failed');
    console.log('Error:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('Starting HashLips API tests...');
  
  // Run tests in sequence
  await testCreateLayer();
  await testUploadLayer();
  await testLayers();
  await testGenerateNFT();
  
  console.log('\nAll tests completed.');
}

// Run the tests
runTests().catch(error => {
  console.error('Test error:', error);
}); 