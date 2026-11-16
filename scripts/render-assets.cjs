const fs = require('node:fs');
const path = require('node:path');
const { Resvg } = require(process.env.BOOSTSSH_RESVG_MODULE || '@resvg/resvg-js');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'store', 'assets');
const options = {font: {defaultFontFamily:'Segoe UI',loadSystemFonts:true}};
function render(svg, filename) {
  fs.writeFileSync(path.join(output, filename), new Resvg(svg, options).render().asPng());
}
render(fs.readFileSync(path.join(root,'assets','icon.svg'),'utf8'),'icon-512.png');
render(fs.readFileSync(path.join(root,'assets','feature.svg'),'utf8'),'feature-graphic.png');
for (const [source, title, name] of [
  ['phone-backup.png','Your connections. Encrypted in your Drive.','screenshot-backup.png'],
  ['phone-sharing.png','Shared connections. Separate personal data.','screenshot-sharing.png'],
]) {
  const bytes=fs.readFileSync(path.join(output,source)).toString('base64');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="1920" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="#f3f6f6"/><text x="540" y="81" text-anchor="middle" font-family="Segoe UI" font-weight="700" font-size="38" fill="#263238">${title}</text><image x="108" y="128" width="864" height="1728" xlink:href="data:image/png;base64,${bytes}"/></svg>`;
  render(svg,name);
}
