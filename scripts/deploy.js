#!/usr/bin/env node

/**
 * Deploy script for GitHub Pages
 * Builds the portfolio and Storybook, then combines them for deployment
 * Portfolio is served at: /
 * Storybook is served at: /storybook/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIST_DIR = path.join(__dirname, '..', 'dist');
const STORYBOOK_DIR = path.join(__dirname, '..', 'storybook-static');
const STORYBOOK_DEST = path.join(DIST_DIR, 'storybook');

console.log('Starting deployment build...\n');

try {
  // Step 1: Clean previous builds
  console.log('Cleaning previous builds...');
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  if (fs.existsSync(STORYBOOK_DIR)) {
    fs.rmSync(STORYBOOK_DIR, { recursive: true });
  }
  console.log('Clean complete\n');

  // Step 2: Build portfolio
  console.log('Building portfolio...');
  execSync('yarn build', { stdio: 'inherit' });
  console.log('Portfolio build complete\n');

  // Step 3: Build Storybook
  console.log('Building Storybook...');
  execSync('yarn build-storybook', { stdio: 'inherit' });
  console.log('Storybook build complete\n');

  // Step 4: Copy Storybook into dist
  console.log('Combining portfolio and Storybook...');
  if (!fs.existsSync(STORYBOOK_DIR)) {
    throw new Error('Storybook build output not found at ' + STORYBOOK_DIR);
  }
  fs.cpSync(STORYBOOK_DIR, STORYBOOK_DEST, { recursive: true });
  console.log('Combined successfully\n');

  // Step 5: Success message
  console.log('Deployment build complete!\n');
  console.log('Build output directory: dist/');
  console.log(
    'Portfolio will be at: https://yourusername.github.io/portfolio-os/'
  );
  console.log(
    'Storybook will be at: https://yourusername.github.io/portfolio-os/storybook/\n'
  );
  console.log('Next steps:');
  console.log('1. Run: yarn deploy:gh-pages');
  console.log('2. Or push the dist/ folder to the gh-pages branch manually\n');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
