import sharp from 'sharp';
import fs from 'fs';

async function resize() {
  const input = '../logo ifbblingo.png';
  if (fs.existsSync(input)) {
    await sharp(input).resize(192, 192).toFile('public/icon-192x192.png');
    await sharp(input).resize(512, 512).toFile('public/icon-512x512.png');
    await sharp(input).resize(180, 180).toFile('public/apple-touch-icon.png');
    console.log('Icons resized successfully.');
  } else {
    console.log('Input file not found');
  }
}

resize();
