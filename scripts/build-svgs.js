const fs = require("fs");
const path = require("path");

const iconsPath = path.resolve(__dirname, "../src/icons.json");
const svgDir = path.resolve(__dirname, "../src/svg");

// Read icons.json
const icons = JSON.parse(fs.readFileSync(iconsPath, "utf8"));

// Ensure svg directory exists
if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}
const iconExports = [];

icons.forEach((icon) => {
  const { slug, src, viewBox, fill, stroke, strokeWidth } = icon;

  // Default values
  const vBox = viewBox || "0 0 24 24";
  const fl = fill || "none";
  const strk = stroke || "currentColor";
  const strkWidth = strokeWidth || "2";

  // Create SVG content
  const svgContent = `<svg viewBox="${vBox}" fill="${fl}" stroke="${strk}" stroke-width="${strkWidth}" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <g><path d="${src}" /></g>
</svg>`;

  // Write SVG file
  const svgFilePath = path.join(svgDir, `${slug}.svg`);
  fs.writeFileSync(svgFilePath, svgContent);
  console.log(`Generated ${slug}.svg`);

  // Add to exports
  const varName = `icon_${slug.replace(/-/g, "_")}`;
  iconExports.push({ varName, slug });
});

// Generate index.js
const imports = iconExports
  .map(({ varName, slug }) => `import ${varName} from "./${slug}.svg";`)
  .join("\n");

const exportsObj = iconExports
  .map(({ varName, slug }) => `  "${slug}": ${varName}`)
  .join(",\n");

const indexContent = `${imports}

const icons = {
${exportsObj}
};

export default icons;
`;

fs.writeFileSync(path.join(svgDir, "index.js"), indexContent);
console.log("Generated src/svg/index.js");

// Remove only obsolete files from the generated SVG directory after generation succeeds.
const expectedFiles = new Set(icons.map(icon => icon.slug + ".svg"));
for (const entry of fs.readdirSync(svgDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".svg") && !expectedFiles.has(entry.name)) {
    fs.unlinkSync(path.join(svgDir, entry.name));
    console.log("Removed obsolete generated SVG: " + entry.name);
  }
}
