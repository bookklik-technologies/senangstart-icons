const fs = require('fs');
const path = require('path');

// Paths
const iconsJsonPath = path.join(__dirname, '..', 'src', 'icons.json');
const publicDir = path.join(__dirname, '..', 'docs', 'public');
const outputFile = path.join(publicDir, 'llms.txt');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Read data
const icons = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Ensure output directory exists
fs.mkdirSync(publicDir, { recursive: true });

console.log(`📝 Generating llms.txt for ${icons.length} icons...\n`);

// Content sections
const header = `# ${pkg.name}

${pkg.description}

Version: ${pkg.version}
License: ${pkg.license}
`;

const usage = `## Usage

### Web Components

1. Include the script:
   \`\`\`html
   <script src="https://unpkg.com/${pkg.name}/dist/senangstart-icon.min.js"></script>
   \`\`\`

2. Use the component:
   \`\`\`html
   <ss-icon icon="icon-slug"></ss-icon>
   <!-- Optional: thickness="1.5" -->
   <ss-icon icon="icon-slug" thickness="2"></ss-icon>
   \`\`\`

### CSS Icons

1. Include the CSS:
   \`\`\`html
   <link rel="stylesheet" href="https://unpkg.com/${pkg.name}/dist/senangstart-icon.css">
   \`\`\`

2. Use the class:
   \`\`\`html
   <i class="ss ss-icon-slug"></i>
   \`\`\`
`;

const iconsList = `## Available Icons (${icons.length})

Format: Icon Name (\`slug\`) - Tags

${icons.map(icon => `- ${icon.name} (\`${icon.slug}\`) - ${icon.tags.join(', ')}`).join('\n')}
`;

// Combine content
const content = [header, usage, iconsList].join('\n');

// Write file
fs.writeFileSync(outputFile, content);

console.log(`✅ Generated docs/public/llms.txt (${content.length} bytes)`);
