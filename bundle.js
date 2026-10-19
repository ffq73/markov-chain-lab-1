// bundle.js: Combines index_template.html with all data and scripts into self-contained index.html
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'index_template.html');
const outputPath = path.join(__dirname, 'index.html');

const scriptFiles = [
  'data/section1_1.js',
  'data/section1_2.js',
  'data/section1_3.js',
  'data/section1_4.js',
  'data/section1_5.js',
  'data/index.js',
  'data/masterclass.js',
  'js/graph.js',
  'js/simulations.js',
  'js/app.js'
];

let template = fs.readFileSync(templatePath, 'utf8');

let bundleScriptContent = '\n  <!-- Inlined All-in-One Data & Engines (Zero Dependency) -->\n';
for (const file of scriptFiles) {
  const filePath = path.join(__dirname, file);
  const content = fs.readFileSync(filePath, 'utf8');
  bundleScriptContent += `\n  <script>\n// File: ${file}\n${content}\n  </script>\n`;
}

const targetMarker = '  <!-- Quick Nav Script -->';
if (!template.includes(targetMarker)) {
  console.error('Target marker not found in index_template.html');
  process.exit(1);
}

const bundledHtml = template.replace(targetMarker, bundleScriptContent + '\n' + targetMarker);
fs.writeFileSync(outputPath, bundledHtml, 'utf8');
console.log(`Successfully bundled ${scriptFiles.length} scripts into ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
