const fs = require('fs');
const path = require('path');

// Paths
const iconsJsonPath = path.join(__dirname, '..', 'src', 'icons.json');
const docsIconsDir = path.join(__dirname, '..', 'docs', 'icons');
const indexPath = path.join(docsIconsDir, 'index.md');

// Read icons.json
const icons = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf8'));

// Ensure docs/icons directory exists
fs.mkdirSync(docsIconsDir, { recursive: true });

console.log(`📝 Generating documentation for ${icons.length} icons...\n`);

// Generate markdown for each icon
const iconLinks = [];

icons.forEach((icon, index) => {
    const { name, slug, src, tags } = icon;
    
    // Create SVG preview (stroke-based icon)
    const svgPreview = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${src}"></path></svg>`;
    
    // Generate markdown content
    const markdown = `---
title: ${name}
---

# ${name}

<div style="display: flex; justify-content: center; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin: 1rem 0;">
${svgPreview}
</div>

## Usage

\`\`\`html
<ss-icon name="${slug}"></ss-icon>
\`\`\`

### With custom size

\`\`\`html
<ss-icon name="${slug}" size="32"></ss-icon>
\`\`\`

### With custom color

\`\`\`html
<ss-icon name="${slug}" color="#3b82f6"></ss-icon>
\`\`\`

### With custom stroke width

\`\`\`html
<ss-icon name="${slug}" stroke="2"></ss-icon>
\`\`\`

## Icon Details

| Property | Value |
|----------|-------|
| **Name** | ${name} |
| **Slug** | \`${slug}\` |
| **Tags** | ${tags.map(t => `\`${t}\``).join(', ')} |

## SVG Path

\`\`\`
${src}
\`\`\`

## Raw SVG

\`\`\`html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="${src}"></path>
</svg>
\`\`\`

---

[← Back to Icon Library](/icons/)
`;

    // Write individual icon markdown file
    const iconFilePath = path.join(docsIconsDir, `${slug}.md`);
    fs.writeFileSync(iconFilePath, markdown);
    
    // Add to links array
    iconLinks.push({
        name,
        slug,
        tags
    });
    
    // Progress indicator
    if ((index + 1) % 50 === 0 || index === icons.length - 1) {
        console.log(`  ✓ Generated ${index + 1}/${icons.length} icon docs`);
    }
});

// Generate index.md with links to all icons
const indexMarkdown = `---
title: Icon Library
---

# Icon Library

Browse all **${icons.length}** available icons in SenangStart Icons.

## Usage

Once you find the icon you need, use it like this:

\`\`\`html
<ss-icon name="icon-name"></ss-icon>
\`\`\`

## All Icons

<div class="icon-grid">

${iconLinks.map(icon => {
    return `<a href="/icons/${icon.slug}" class="icon-card" title="${icon.tags.join(', ')}">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${icons.find(i => i.slug === icon.slug).src}"></path></svg>
  <span>${icon.name}</span>
</a>`;
}).join('\n\n')}

</div>

<style>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1) !important;
  transition: all 0.2s ease;
  text-align: center;
  aspect-ratio: 1/1;
}

.icon-card:hover {
  background: var(--vp-c-bg-soft-up);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-card svg {
  margin-bottom: 0.5rem;
  width: 3rem;
  height: 3rem;
}

.icon-card span {
  font-size: 0.8rem;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
`;

fs.writeFileSync(indexPath, indexMarkdown);

console.log(`\n✅ Icon documentation generated successfully!`);
console.log(`   - ${icons.length} individual icon pages created`);
console.log(`   - Index page updated at docs/icons/index.md`);
