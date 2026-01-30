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
  iconExports.push(`"${slug}": require("./${slug}.svg")`);
});

// Generate index.js
const indexContent = `const icons = {
  ${iconExports.join(",\n  ")}
};

module.exports = icons;
`;

fs.writeFileSync(path.join(svgDir, "index.js"), indexContent);
console.log("Generated src/svg/index.js");
