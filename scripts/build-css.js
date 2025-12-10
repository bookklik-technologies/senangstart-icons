const fs = require("fs");
const path = require("path");

const iconsPath = path.resolve(__dirname, "../src/icons.json");
const outputPath = path.resolve(__dirname, "../src/icons.css");

// Read icons.json
const icons = JSON.parse(fs.readFileSync(iconsPath, "utf8"));

// URL-encode SVG for data URI
function encodeSvg(svg) {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/\s+/g, " ")
    .trim();
}

// Generate SVG string from icon data
function generateSvg(icon) {
  const { src, viewBox, fill, stroke, strokeWidth } = icon;

  // Default values
  const vBox = viewBox || "0 0 24 24";
  const fl = fill || "none";
  const strk = stroke || "currentColor";
  const strkWidth = strokeWidth || "2";

  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${vBox}' fill='${fl}' stroke='${strk}' stroke-width='${strkWidth}' stroke-linecap='round' stroke-linejoin='round'><path d='${src}'/></svg>`;
}

// Base CSS styles
const baseCss = `/* Senangstart Icons - CSS Only */
/* Auto-generated - Do not edit manually */

.ss {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  background-color: currentColor;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.ss svg {
  display: none;
}

`;

// Generate icon CSS classes
let iconCss = "";

icons.forEach((icon) => {
  const { slug } = icon;
  const svg = generateSvg(icon);
  const encodedSvg = encodeSvg(svg);
  const dataUri = `url("data:image/svg+xml,${encodedSvg}")`;

  iconCss += `.ss-${slug} {
  -webkit-mask-image: ${dataUri};
  mask-image: ${dataUri};
}

`;
});

// Write CSS file
const fullCss = baseCss + iconCss;
fs.writeFileSync(outputPath, fullCss);

console.log(`Generated icons.css with ${icons.length} icons`);
