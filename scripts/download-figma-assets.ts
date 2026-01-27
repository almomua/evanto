/**
 * Script to download Figma assets from MCP asset URLs
 * 
 * How to use:
 * 1. Use Figma MCP get_design_context to get asset URLs from your Figma design
 * 2. Add the asset URLs to the ASSETS_CONFIG below
 * 3. Run: npx tsx scripts/download-figma-assets.ts
 * 
 * Note: Figma MCP asset URLs are temporary (valid for 7 days), 
 * so download them before they expire.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - Add your Figma asset URLs here
const ASSETS_DIR = path.join(__dirname, '../public/images');
const ASSETS_CONFIG: Record<string, Record<string, string>> = {
  chat: {
    'send-icon.png': 'https://www.figma.com/api/mcp/asset/c3784c2b-5261-4ad4-9376-5df81ec0ced7',
    'chat-background.png': 'https://www.figma.com/api/mcp/asset/020370ee-40d2-415b-90e1-977ea6d08309',
  },
  // Add more asset categories here as needed
  // Example:
  // products: {
  //   'product-1.jpg': 'https://www.figma.com/api/mcp/asset/...',
  // },
};

/**
 * Download a file from a URL
 */
function downloadFile(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (!redirectUrl) {
          reject(new Error('Redirect location not found'));
          return;
        }
        return downloadFile(redirectUrl, filePath)
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
        const stats = fs.statSync(filePath);
        console.log(`  ✓ Downloaded ${filename} (${(stats.size / 1024).toFixed(2)} KB)`);
      } catch (error) {
        console.error(`  ✗ Failed to download ${filename}:`, error instanceof Error ? error.message : error);
      }
    }
  }
  
  console.log('\n✓ Asset download complete!');
}

// Run the script
downloadAssets().catch(console.error);
