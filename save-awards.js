const fs = require('fs');
const path = require('path');

// Award base64 data (we'll get this from Figma)
const awards = [
  { name: 'best-financial-wellbeing-provider', base64: '' },
  { name: '5-star-insurance-technology', base64: '' },
  { name: 'best-places-to-work', base64: '' },
  { name: 'best-places-to-work-sifted', base64: '' },
  { name: 'certified-b-corporation', base64: '' }
];

// This script will be populated by the Figma tool
console.log('Ready to save award images');
