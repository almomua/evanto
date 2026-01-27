/**
 * Script to download Figma assets from MCP asset URLs
 * Usage: node scripts/download-figma-assets.js
 * 
 * This script downloads assets from Figma MCP asset URLs and saves them locally.
 * The asset URLs are temporary (valid for 7 days), so download them before they expire.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const ASSETS_DIR = path.join(__dirname, '../public/images');
const ASSETS_CONFIG = {
  chat: {
    'send-icon.png': 'https://www.figma.com/api/mcp/asset/c3784c2b-5261-4ad4-9376-5df81ec0ced7',
    'chat-background.png': 'https://www.figma.com/api/mcp/asset/020370ee-40d2-415b-90e1-977ea6d08309',
  },
  // Add more asset categories here as needed
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
        fs.unlinkSync(filePath);
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
  console.log('Starting asset download...\n');
  
  for (const [category, assets] of Object.entries(ASSETS_CONFIG)) {
    const categoryDir = path.join(ASSETS_DIR, category);
    
    // Create category directory if it doesn't exist
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
      console.log(`Created directory: ${categoryDir}`);
    }
    
    console.log(`\nDownloading ${category} assets...`);
    
    for (const [filename, url] of Object.entries(assets)) {
      const filePath = path.join(categoryDir, filename);
      
      try {
        console.log(`  Downloading ${filename}...`);
        await downloadFile(url, filePath);
        console.log(`  ✓ Downloaded ${filename}`);
      } catch (error) {
        console.error(`  ✗ Failed to download ${filename}:`, error.message);
      }
    }
  }
  
  console.log('\n✓ Asset download complete!');
}

// Run the script
downloadAssets().catch(console.error);
