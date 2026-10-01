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

// Compatibility notes live in the generator so rebuilding preserves them.
const usageNotes = {
  "phone-x-mark": {
    "en": "Legacy name: this drawing depicts an incoming call, not a rejection. The existing name and artwork remain available for compatibility. Prefer [phone-incoming](./phone-incoming) for incoming calls or [phone-reject](./phone-reject) for a handset with an X.",
    "ms": "Nama legasi: lukisan ini menunjukkan panggilan masuk, bukan penolakan. Nama dan lukisan sedia ada dikekalkan untuk keserasian. Gunakan [phone-incoming](./phone-incoming) untuk panggilan masuk atau [phone-reject](./phone-reject) untuk gagang telefon dengan tanda X."
  },
  "arrow-right-on-rectangle": {
    "en": "Legacy name: the arrow points left into the door. Prefer [sign-in](./sign-in) for this action. The legacy name and drawing are preserved for compatibility.",
    "ms": "Nama legasi: anak panah menghala ke kiri, masuk ke pintu. Gunakan [sign-in](./sign-in) untuk tindakan ini. Nama dan lukisan legasi dikekalkan untuk keserasian."
  },
  "arrow-left-on-rectangle": {
    "en": "Legacy name: the arrow points right out of the door. Prefer [sign-out](./sign-out) for this action. The legacy name and drawing are preserved for compatibility.",
    "ms": "Nama legasi: anak panah menghala ke kanan, keluar dari pintu. Gunakan [sign-out](./sign-out) untuk tindakan ini. Nama dan lukisan legasi dikekalkan untuk keserasian."
  },
  "phone-incoming": {
    "en": "Preferred name for the incoming-call drawing also available under the legacy name [phone-x-mark](./phone-x-mark). For rejecting a call, use [phone-reject](./phone-reject).",
    "ms": "Nama yang disyorkan untuk lukisan panggilan masuk yang turut tersedia dengan nama legasi [phone-x-mark](./phone-x-mark). Untuk menolak panggilan, gunakan [phone-reject](./phone-reject)."
  },
  "phone-reject": {
    "en": "A handset with an X for rejecting or declining a call. For an incoming-call arrow, use [phone-incoming](./phone-incoming).",
    "ms": "Gagang telefon dengan tanda X untuk menolak panggilan. Untuk anak panah panggilan masuk, gunakan [phone-incoming](./phone-incoming)."
  },
  "sign-in": {
    "en": "Preferred name for an arrow entering the door. Shares its drawing with the legacy name [arrow-right-on-rectangle](./arrow-right-on-rectangle).",
    "ms": "Nama yang disyorkan untuk anak panah yang masuk ke pintu. Berkongsi lukisan dengan nama legasi [arrow-right-on-rectangle](./arrow-right-on-rectangle)."
  },
  "sign-out": {
    "en": "Preferred name for an arrow leaving the door. Shares its drawing with the legacy name [arrow-left-on-rectangle](./arrow-left-on-rectangle).",
    "ms": "Nama yang disyorkan untuk anak panah yang keluar dari pintu. Berkongsi lukisan dengan nama legasi [arrow-left-on-rectangle](./arrow-left-on-rectangle)."
  }
};

// Ensure docs/icons directories exist
fs.mkdirSync(docsIconsDir, { recursive: true });
fs.mkdirSync(docsIconsDirMs, { recursive: true });

console.log(`📝 Generating documentation for ${icons.length} icons...\n`);

// Generate markdown for each icon
const iconLinks = [];

icons.forEach((icon, index) => {
    const { name, slug, src, tags } = icon;
    
    // Create SVG preview (stroke-based icon)
    const svgPreview = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${src}"></path></svg>`;
    
    // Generate English markdown content
    const markdownEn = `---
title: ${name}
---

# ${name}
${usageNotes[slug] ? "\n> " + usageNotes[slug].en + "\n" : ""}
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

### Node.js

\`\`\`javascript
const icons = require('@bookklik/senangstart-icons/icons');
const svg = icons['${slug}'];
console.log(svg);
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
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
${usageNotes[slug] ? "\n> " + usageNotes[slug].ms + "\n" : ""}
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

### Node.js

\`\`\`javascript
const icons = require('@bookklik/senangstart-icons/icons');
const svg = icons['${slug}'];
console.log(svg);
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
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
<ss-icon icon="home"></ss-icon>
\`\`\`

## All Icons

<div class="icon-grid">

${iconLinks.map(icon => {
    return `<a href="./${icon.slug}" class="icon-card" title="${icon.tags.join(', ')}">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${icons.find(i => i.slug === icon.slug).src}"></path></svg>
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
<ss-icon icon="home"></ss-icon>
\`\`\`

## Semua Ikon

<div class="icon-grid">

${iconLinks.map(icon => {
    return `<a href="./${icon.slug}" class="icon-card" title="${icon.tags.join(', ')}">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${icons.find(i => i.slug === icon.slug).src}"></path></svg>
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
