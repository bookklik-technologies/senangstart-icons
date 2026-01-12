const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to recursively copy a directory
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('🔨 Building SenangStart Icons...\n');

// Step 1: Build SVGs
console.log('📦 Step 1: Building SVGs...');
execSync('node scripts/build-svgs.js', { stdio: 'inherit' });

// Step 2: Build CSS
console.log('\n🎨 Step 2: Building CSS...');
execSync('node scripts/build-css.js', { stdio: 'inherit' });

// Step 3: Run Generate Icon Docs
console.log('\n⚙️  Step 3: Running Generate Icon Docs...');
execSync('node scripts/build-icon-docs.js', { stdio: 'inherit' });

// Step 4: Run Webpack
console.log('\n⚙️  Step 4: Running Webpack...');
execSync('npx webpack --mode production', { stdio: 'inherit' });

console.log('\n✅ Build complete! Files copied to docs/public/');
