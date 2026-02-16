const fs = require('fs');
const path = require('path');

// Read the exported logo data
const dataPath = '/Users/amit/.cursor/projects/Users-amit-yulife-website-v1/agent-tools/f8da40c1-8cf1-4aba-b775-3491720956c3.txt';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Create directory if it doesn't exist
const outputDir = path.join(__dirname, 'public/images/trust-logos-new');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save each logo
data.result.exports.forEach((logo) => {
  if (logo.base64) {
    const filename = logo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '.png';
    const buffer = Buffer.from(logo.base64, 'base64');
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved: ${filename} (${logo.width}x${logo.height})`);
  }
});

console.log('\n✅ All logos saved successfully!');
