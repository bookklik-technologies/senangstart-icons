const fs = require('fs');
const path = require('path');

// Paths
const iconsJsonPath = path.join(__dirname, '..', 'src', 'icons.json');
const docsIconsDir = path.join(__dirname, '..', 'docs', 'icons');
const docsIconsDirMs = path.join(__dirname, '..', 'docs', 'ms', 'icons');
const indexPath = path.join(docsIconsDir, 'index.md');
const indexPathMs = path.join(docsIconsDirMs, 'index.md');

// Read icons.json
const icons = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf8'));

// Ensure docs/icons directories exist
fs.mkdirSync(docsIconsDir, { recursive: true });
fs.mkdirSync(docsIconsDirMs, { recursive: true });

console.log(`📝 Generating documentation for ${icons.length} icons...\n`);

// Generate markdown for each icon
const iconLinks = [];

icons.forEach((icon, index) => {
    const { name, slug, src, tags } = icon;
    
    // Create SVG preview (stroke-based icon)
    const svgPreview = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${src}"></path></svg>`;
    
    // Generate English markdown content
    const markdownEn = `---
title: ${name}
---

# ${name}

<div style="display: flex; justify-content: center; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin: 1rem 0;">
${svgPreview}
</div>

## Usage

### With Web Components

\`\`\`html
<ss-icon icon="${slug}"></ss-icon>
\`\`\`

### With icon tag

\`\`\`html
<i class="ss ss-${slug}"></i>    
\`\`\`

### With custom stroke width / thickness

\`\`\`html
<ss-icon icon="${slug}" thickness="1.2"></ss-icon>
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

    // Generate Malay markdown content
    const markdownMs = `---
title: ${name}
---

# ${name}

<div style="display: flex; justify-content: center; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin: 1rem 0;">
${svgPreview}
</div>

## Penggunaan

### Dengan Komponen Web

\`\`\`html
<ss-icon icon="${slug}"></ss-icon>
\`\`\`

### Dengan tag ikon

\`\`\`html
<i class="ss ss-${slug}"></i>    
\`\`\`

### Dengan ketebalan garisan tersuai

\`\`\`html
<ss-icon icon="${slug}" thickness="1.2"></ss-icon>
\`\`\`

## Butiran Ikon

| Ciri | Nilai |
|------|-------|
| **Nama** | ${name} |
| **Slug** | \`${slug}\` |
| **Tag** | ${tags.map(t => `\`${t}\``).join(', ')} |

## Laluan SVG

\`\`\`
${src}
\`\`\`

## SVG Mentah

\`\`\`html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="${src}"></path>
</svg>
\`\`\`

---

[← Kembali ke Pustaka Ikon](/ms/icons/)
`;

    // Write individual icon markdown files (English)
    const iconFilePath = path.join(docsIconsDir, `${slug}.md`);
    fs.writeFileSync(iconFilePath, markdownEn);
    
    // Write individual icon markdown files (Malay)
    const iconFilePathMs = path.join(docsIconsDirMs, `${slug}.md`);
    fs.writeFileSync(iconFilePathMs, markdownMs);
    
    // Add to links array
    iconLinks.push({
        name,
        slug,
        tags
    });
    
    // Progress indicator
    if ((index + 1) % 50 === 0 || index === icons.length - 1) {
        console.log(`  ✓ Generated ${index + 1}/${icons.length} icon docs (EN + MS)`);
    }
});

// Generate English index.md with links to all icons
const indexMarkdownEn = `---
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
    return `<a href="./${icon.slug}" class="icon-card" title="${icon.tags.join(', ')}">
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

// Generate Malay index.md with links to all icons
const indexMarkdownMs = `---
title: Pustaka Ikon
---

# Pustaka Ikon

Layari semua **${icons.length}** ikon yang tersedia dalam SenangStart Icons.

## Penggunaan

Setelah anda menemui ikon yang diperlukan, gunakannya seperti ini:

\`\`\`html
<ss-icon name="nama-ikon"></ss-icon>
\`\`\`

## Semua Ikon

<div class="icon-grid">

${iconLinks.map(icon => {
    return `<a href="./${icon.slug}" class="icon-card" title="${icon.tags.join(', ')}">
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

fs.writeFileSync(indexPath, indexMarkdownEn);
fs.writeFileSync(indexPathMs, indexMarkdownMs);

console.log(`\n✅ Icon documentation generated successfully!`);
console.log(`   - ${icons.length} English icon pages created`);
console.log(`   - ${icons.length} Malay icon pages created`);
console.log(`   - English index at docs/icons/index.md`);
console.log(`   - Malay index at docs/ms/icons/index.md`);
