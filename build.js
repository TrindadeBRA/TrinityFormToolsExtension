#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Get target from command line argument or default to 'chrome'
const target = process.argv[2] || 'chrome';

// Determine manifest file based on target
let manifestFile, zipSuffix;
if (target === 'firefox') {
  manifestFile = 'manifest.firefox.json';
  zipSuffix = '-firefox';
} else {
  manifestFile = 'manifest.json';
  zipSuffix = '-chrome';
}

// Read manifest file
const manifestPath = path.join(__dirname, manifestFile);
if (!fs.existsSync(manifestPath)) {
  console.error(`❌ Arquivo ${manifestFile} não encontrado!`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Extract name and version
const name = manifest.name.replace(/\s+/g, ''); // Remove spaces
const version = manifest.version;

// Create zip filename
const zipName = `${name}-${version}${zipSuffix}.zip`;

console.log(`📦 Gerando ${zipName} para ${target === 'firefox' ? 'Firefox (MV2)' : 'Google Chrome (MV3)'}...`);
console.log(`   Nome: ${manifest.name}`);
console.log(`   Versão: ${version}`);
console.log(`   Manifest: ${manifestFile}`);

// Files to include in zip
const files = [
  'background.js',
  'content-script.js',
  'icon48.png',
  'icon96.png',
  'favicon.webp'
];

// Remove old zip if exists
const zipPath = path.join(__dirname, zipName);
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
  console.log(`   Removido zip antigo: ${zipName}`);
}

// Create temporary directory and copy files
const tempDir = path.join(__dirname, 'temp_build');
if (fs.existsSync(tempDir)) {
  execSync(`rm -rf "${tempDir}"`, { stdio: 'ignore' });
}
fs.mkdirSync(tempDir);

// Copy all files to temp directory
files.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(tempDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

// Copy manifest as manifest.json
fs.copyFileSync(manifestPath, path.join(tempDir, 'manifest.json'));

try {
  // Create zip from temp directory
  process.chdir(tempDir);
  execSync(`zip -r "../${zipName}" .`, { stdio: 'inherit' });
  process.chdir(__dirname);
  
  // Cleanup temp directory
  execSync(`rm -rf "${tempDir}"`, { stdio: 'ignore' });
  
  console.log(`\n✅ Zip criado com sucesso: ${zipName}`);
  if (fs.existsSync(zipPath)) {
    console.log(`   Tamanho: ${(fs.statSync(zipPath).size / 1024).toFixed(2)} KB`);
  }
} catch (error) {
  // Cleanup on error
  if (fs.existsSync(tempDir)) {
    execSync(`rm -rf "${tempDir}"`, { stdio: 'ignore' });
  }
  console.error('\n❌ Erro ao criar zip:', error.message);
  process.exit(1);
}
