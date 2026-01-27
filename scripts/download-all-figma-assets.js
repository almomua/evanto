/**
 * Script to download all Figma assets from the Euphoria design
 * Usage: node scripts/download-all-figma-assets.js
 * 
 * This script downloads all assets from the Figma design and saves them locally.
 * The asset URLs are temporary (valid for 7 days), so download them before they expire.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const ASSETS_DIR = path.join(__dirname, '../public/images');

// All asset URLs from the Figma design
const ALL_ASSETS = {
  // Product images
  'products': {
    'product-1.png': 'https://www.figma.com/api/mcp/asset/ba83fef8-3485-4e1f-9938-3b75059344de',
    'product-2.png': 'https://www.figma.com/api/mcp/asset/4a237560-70ca-4093-b56c-75649b251353',
    'product-3.png': 'https://www.figma.com/api/mcp/asset/f4ffc684-5036-48fe-9159-83bb3e915f37',
    'product-4.png': 'https://www.figma.com/api/mcp/asset/8f749d08-d60f-451a-a946-8c6481c5bb8d',
  },
  
  // Category rectangles (Makeup Products)
  'categories/makeup': {
    'rectangle-20.png': 'https://www.figma.com/api/mcp/asset/fe9c2c94-d98a-4414-8e4f-d61c7f7610cc',
    'rectangle-21.png': 'https://www.figma.com/api/mcp/asset/3b998a53-ad1e-490b-8abe-41c3d3979ff4',
    'rectangle-22.png': 'https://www.figma.com/api/mcp/asset/bae4c05c-6789-4f54-9780-6b26997ecc1c',
    'rectangle-23.png': 'https://www.figma.com/api/mcp/asset/cee2df2c-8838-4667-965c-eddfa52b9673',
    'rectangle-24.png': 'https://www.figma.com/api/mcp/asset/a9f72087-13ab-4ad5-b50a-4057260d7e16',
    'rectangle-25.png': 'https://www.figma.com/api/mcp/asset/2c79db54-e441-4fb7-a66c-3ccf8d884549',
    'rectangle-26.png': 'https://www.figma.com/api/mcp/asset/1831aca0-1c0d-4679-80d1-d69256e7afc7',
    'rectangle-27.png': 'https://www.figma.com/api/mcp/asset/cbd08807-2b60-471c-a68a-f9cb6b962b06',
    'rectangle-28.png': 'https://www.figma.com/api/mcp/asset/a8dfb934-24b8-4dea-80c8-8c2c2ba88da6',
    'rectangle-29.png': 'https://www.figma.com/api/mcp/asset/8713b789-f643-4115-85da-b5352627bae9',
    'rectangle-30.png': 'https://www.figma.com/api/mcp/asset/d5cfada0-843b-44e0-8bf1-65fefd4cf445',
    'rectangle-31.png': 'https://www.figma.com/api/mcp/asset/3974d360-b7b8-4c96-a6ad-f1e7cc987bc4',
    'rectangle-32.png': 'https://www.figma.com/api/mcp/asset/d7bed348-9a35-4f94-944e-fbabdc28a98c',
    'rectangle-33.png': 'https://www.figma.com/api/mcp/asset/cbf7b039-2c3d-4620-836d-7f077b7f0294',
    'rectangle-34.png': 'https://www.figma.com/api/mcp/asset/882cffcb-5f4e-4927-8c7e-a8ffd89392fd',
    'rectangle-35.png': 'https://www.figma.com/api/mcp/asset/0f180459-3ad4-4f20-8534-937203f58791',
    'rectangle-36.png': 'https://www.figma.com/api/mcp/asset/90677016-0934-471d-b863-ead49e0c532c',
  },
  
  // Category rectangles (Perfume Products)
  'categories/perfume': {
    'rectangle-37.png': 'https://www.figma.com/api/mcp/asset/94c39818-0fe0-45bf-8bdc-1bdfe0ec4220',
    'rectangle-38.png': 'https://www.figma.com/api/mcp/asset/fa5983b4-9253-4892-be2b-20deffb63bd7',
    'rectangle-39.png': 'https://www.figma.com/api/mcp/asset/49076776-375b-4e27-b106-16c54cea2ef5',
  },
  
  // Hero/Banner images
  'hero': {
    'rectangle-13.png': 'https://www.figma.com/api/mcp/asset/50d95b96-2640-425a-a720-08d7089e39df',
    'unsplash-bbiu-sdck8tu.png': 'https://www.figma.com/api/mcp/asset/b7616e74-d441-4f22-8ceb-e240f756f7d4',
    'shop-hero-1-product-slide-1.png': 'https://www.figma.com/api/mcp/asset/6f4d7765-ebc8-4f86-8354-1c46837c09de',
  },
  
  // Big Saving Zone images
  'saving-zone': {
    'rectangle-74.png': 'https://www.figma.com/api/mcp/asset/ef849b55-e4e8-4df3-909c-a93ada7f2c35',
    'rectangle-75.png': 'https://www.figma.com/api/mcp/asset/7c13d61f-2d8b-42ea-baf3-789866fff61a',
    'rectangle-76.png': 'https://www.figma.com/api/mcp/asset/e5a512a3-c822-4094-a329-68aa86ff8bb6',
    'rectangle-77.png': 'https://www.figma.com/api/mcp/asset/9a5eee10-2827-4e03-8ce8-20a56f8798d1',
    'rectangle-78.png': 'https://www.figma.com/api/mcp/asset/0486689c-3701-46b6-9cf1-d478a8a16438',
    'rectangle-79.png': 'https://www.figma.com/api/mcp/asset/ecb86b97-d7ee-4805-8f24-53af0e47976c',
  },
  
  // New Arrival images
  'new-arrival': {
    'photographer-white-background.png': 'https://www.figma.com/api/mcp/asset/55d36aaa-427f-4b27-91d8-3b2364e9d438',
    'unsplash-qyc13qbgam4.png': 'https://www.figma.com/api/mcp/asset/58047b5c-cc4d-4209-be0a-f71d9bc02879',
    'unsplash-qyc13qbgam5.png': 'https://www.figma.com/api/mcp/asset/24f6c706-f444-4700-b601-34fdb8f52a5e',
    'image-1.png': 'https://www.figma.com/api/mcp/asset/5e6bd317-4154-4770-a369-5144cc7e3198',
    'image-2.png': 'https://www.figma.com/api/mcp/asset/bbdbd756-df20-4fc1-a350-5b696b965aee',
  },
  
  // Icons
  'icons': {
    'icon.png': 'https://www.figma.com/api/mcp/asset/c8712ec0-830c-48ca-bbd3-e3b9b8d604d9',
    'group-10.png': 'https://www.figma.com/api/mcp/asset/93dc5b8e-f616-4887-a627-2393798e70c2',
    'group-11.png': 'https://www.figma.com/api/mcp/asset/09bd7819-bf08-4b01-a931-f537af1fd49f',
    'group-12.png': 'https://www.figma.com/api/mcp/asset/a6f56626-a902-49fd-a56b-56bb456c59df',
    'line-5.png': 'https://www.figma.com/api/mcp/asset/8a2f145d-5412-487f-8695-01723cfc6ae1',
    'heart-icon.png': 'https://www.figma.com/api/mcp/asset/f1980d79-19a2-4a88-9036-3f353adca073',
    'search-icon.png': 'https://www.figma.com/api/mcp/asset/d48ec129-864e-4e16-b2b8-5dadea7a7c06',
    'user-icon.png': 'https://www.figma.com/api/mcp/asset/7934d1a9-ddbf-4c5b-bcba-87c859c8451f',
    'cart-icon.png': 'https://www.figma.com/api/mcp/asset/5f25a953-d4e8-4333-b62c-1ed22ecdf1b1',
    'vector-icon.png': 'https://www.figma.com/api/mcp/asset/e260d834-af0b-46a8-a33f-3afd76233048',
    'logo-group-1.png': 'https://www.figma.com/api/mcp/asset/c5e49b1d-277b-4000-8b55-9a1c2ae3c20e',
    'logo-group-2.png': 'https://www.figma.com/api/mcp/asset/d213ff03-d8a7-4a17-ac81-f65829d06a3b',
    'chatbot-icon.png': 'https://www.figma.com/api/mcp/asset/5ebd699b-4be1-4af3-8b44-96d862de5a12',
  },
  
  // Arrows and navigation
  'arrows': {
    'arrow-1.png': 'https://www.figma.com/api/mcp/asset/cfd9df65-1d7a-426c-a6b8-ba5644f611e6',
    'arrow.png': 'https://www.figma.com/api/mcp/asset/6ea0cd5d-bf7e-498a-92b5-5396affaa339',
    'arrow-2.png': 'https://www.figma.com/api/mcp/asset/8d3e8583-d922-43f7-b134-858e92ccdbb2',
    'arrow-3.png': 'https://www.figma.com/api/mcp/asset/40336440-7d90-49d1-9015-3c8654f3e182',
    'chevron-right.png': 'https://www.figma.com/api/mcp/asset/8f12da1a-3034-4474-8f0e-424ce92ba82a',
    'chevron-left.png': 'https://www.figma.com/api/mcp/asset/ff4e1ba7-7cd3-4593-8d22-6c9cfbed82b0',
    'arrow-left-filled.png': 'https://www.figma.com/api/mcp/asset/00cfa3f1-44c0-4743-bc16-0aceb5a6ab6b',
  },
};

/**
 * Download a file from a URL
 */
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

/**
 * Download all assets
 */
async function downloadAssets() {
  console.log('Starting asset download from Euphoria design...\n');
  
  let totalAssets = 0;
  let downloadedAssets = 0;
  let failedAssets = 0;
  
  // Count total assets
  for (const assets of Object.values(ALL_ASSETS)) {
    totalAssets += Object.keys(assets).length;
  }
  
  console.log(`Total assets to download: ${totalAssets}\n`);
  
  for (const [category, assets] of Object.entries(ALL_ASSETS)) {
    const categoryDir = path.join(ASSETS_DIR, category);
    
    // Create category directory if it doesn't exist
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
      console.log(`Created directory: ${categoryDir}`);
    }
    
    console.log(`\nDownloading ${category} assets...`);
    
    for (const [filename, url] of Object.entries(assets)) {
      const filePath = path.join(categoryDir, filename);
      
      // Skip if file already exists
      if (fs.existsSync(filePath)) {
        console.log(`  ⊘ Skipped ${filename} (already exists)`);
        continue;
      }
      
      try {
        console.log(`  Downloading ${filename}...`);
        await downloadFile(url, filePath);
        downloadedAssets++;
        console.log(`  ✓ Downloaded ${filename}`);
      } catch (error) {
        failedAssets++;
        console.error(`  ✗ Failed to download ${filename}:`, error.message);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Download Summary:');
  console.log(`  Total assets: ${totalAssets}`);
  console.log(`  Downloaded: ${downloadedAssets}`);
  console.log(`  Failed: ${failedAssets}`);
  console.log(`  Skipped: ${totalAssets - downloadedAssets - failedAssets}`);
  console.log('='.repeat(50));
  console.log('\n✓ Asset download complete!');
}

// Run the script
downloadAssets().catch(console.error);
