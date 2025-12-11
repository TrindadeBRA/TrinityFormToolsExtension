#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Read manifest.json
const manifestPath = path.join(__dirname, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Extract name and version
const name = manifest.name.replace(/\s+/g, ''); // Remove spaces
const version = manifest.version;

// Create zip filename
const zipName = `${name}-${version}.zip`;

console.log(`📦 Gerando ${zipName}...`);
console.log(`   Nome: ${manifest.name}`);
console.log(`   Versão: ${version}`);

// Files to include in zip
const files = [
  'manifest.json',
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

// Build zip command
const filesString = files.join(' ');
const excludePatterns = [
  '"*.md"',
  '"*.git*"',
  '"Guides/*"',
  '"*.zip"',
  '"*.tmp"',
  '"*.log"',
  '"node_modules/*"',
  '"build.js"',
  '"package.json"',
  '"package-lock.json"',
  '"yarn.lock"'
].join(' ');

const zipCommand = `zip -r "${zipName}" ${filesString} -x ${excludePatterns}`;

try {
  // Change to project directory and execute zip command
  process.chdir(__dirname);
  execSync(zipCommand, { stdio: 'inherit' });
  console.log(`\n✅ Zip criado com sucesso: ${zipName}`);
  console.log(`   Tamanho: ${(fs.statSync(zipPath).size / 1024).toFixed(2)} KB`);
} catch (error) {
  console.error('\n❌ Erro ao criar zip:', error.message);
  process.exit(1);
}
