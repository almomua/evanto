# Downloading Assets from Figma using MCP

This guide explains how to download assets from Figma designs using the Figma MCP (Model Context Protocol) server.

## Overview

The Figma MCP server provides access to design assets through temporary URLs. These URLs are valid for **7 days**, so you need to download the assets before they expire.

## Step-by-Step Process

### 1. Get Asset URLs from Figma

Use the Figma MCP `get_design_context` tool to extract asset URLs from your Figma design:

```
File Key: 5P5GX8p1IgucZgeltjIpBx
Node ID: 436:1444
```

The response will include asset URLs like:
```javascript
const img = "https://www.figma.com/api/mcp/asset/c3784c2b-5261-4ad4-9376-5df81ec0ced7";
const img1 = "https://www.figma.com/api/mcp/asset/020370ee-40d2-415b-90e1-977ea6d08309";
```

### 2. Add URLs to Download Script

Edit `scripts/download-figma-assets.ts` and add your asset URLs to the `ASSETS_CONFIG`:

```typescript
const ASSETS_CONFIG: Record<string, Record<string, string>> = {
  chat: {
    'send-icon.png': 'https://www.figma.com/api/mcp/asset/c3784c2b-5261-4ad4-9376-5df81ec0ced7',
    'chat-background.png': 'https://www.figma.com/api/mcp/asset/020370ee-40d2-415b-90e1-977ea6d08309',
  },
  // Add more categories as needed
  products: {
    'product-1.jpg': 'https://www.figma.com/api/mcp/asset/...',
  },
};
```

### 3. Download Assets

Run the download script:

```bash
# Using Node.js (if you have the JS version)
node scripts/download-figma-assets.js

# Using TypeScript (requires tsx)
npx tsx scripts/download-figma-assets.ts
```

The assets will be downloaded to `public/images/{category}/` directory.

### 4. Use Assets in Your Code

Import and use the assets:

```typescript
import { CHAT_ASSETS } from '@/lib/assets-chat';
import Image from 'next/image';

// In your component
<Image src={CHAT_ASSETS.sendIcon} alt="Send" width={24} height={24} />
```

## Alternative: Manual Download

If you prefer to download assets manually:

1. **Using PowerShell (Windows):**
   ```powershell
   cd frontend/public/images/chat
   Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/..." -OutFile "filename.png"
   ```

2. **Using curl (Linux/Mac):**
   ```bash
   curl -L "https://www.figma.com/api/mcp/asset/..." -o "filename.png"
   ```

3. **Using browser:**
   - Open the asset URL in your browser
   - Right-click and "Save As"

## Important Notes

- ⚠️ **Asset URLs expire after 7 days** - Download them as soon as possible
- 📁 Assets are saved to `public/images/` for Next.js static file serving
- 🔄 Re-run the script if you get new asset URLs from Figma
- 📝 Update `lib/assets-*.ts` files to reference the local paths

## File Structure

```
frontend/
├── scripts/
│   ├── download-figma-assets.ts    # TypeScript download script
│   ├── download-figma-assets.js    # JavaScript download script
│   └── README-FIGMA-ASSETS.md      # This file
├── lib/
│   └── assets-chat.ts              # Asset path references
└── public/
    └── images/
        └── chat/                    # Downloaded assets
            ├── send-icon.png
            └── chat-background.png
```

## Troubleshooting

**Issue: "Method not found" error when using fetch_mcp_resource**
- The Figma MCP server doesn't support direct resource fetching
- Use HTTP download instead (script or manual)

**Issue: Assets not loading**
- Check that files are in `public/images/` directory
- Verify the paths in your asset config files
- Ensure Next.js dev server is running

**Issue: 404 errors when downloading**
- Asset URLs may have expired (7-day limit)
- Re-run `get_design_context` to get fresh URLs
