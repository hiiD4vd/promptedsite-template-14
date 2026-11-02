// One-time mechanical conversion of the repo-owned SVG export to JSX.
const fs = require('node:fs');
const vm = require('node:vm');
const cheerio = require('cheerio');
const source = fs.readFileSync('src/components/projectedPointsHtml.ts', 'utf8');
const expression = source.match(/export const PROJECTED_POINTS_HTML = ([\s\S]*);\s*$/)?.[1];
if (!expression) throw new Error('Projection export not found');
const html = vm.runInNewContext(expression);
const $ = cheerio.load(html, { xmlMode: true }, false);
const map = { class: 'className', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset', 'clip-path': 'clipPath', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity', 'color-interpolation-filters': 'colorInterpolationFilters', 'flood-opacity': 'floodOpacity', 'flood-color': 'floodColor', 'font-size': 'fontSize', 'font-family': 'fontFamily', 'letter-spacing': 'letterSpacing', 'text-anchor': 'textAnchor', 'xlink:href': 'xlinkHref' };
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function render(node) {
  if (node.type === 'text') return escape(node.data || '');
  if (node.type !== 'tag') return '';
  const tag = node.name;
  const attrs = Object.entries(node.attribs || {}).map(([key, value]) => {
    if (key === 'style') {
      const entries=value.split(';').filter(Boolean).map(part=>{const i=part.indexOf(':');return [part.slice(0,i).trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),part.slice(i+1).trim()]});
      return `style={{${entries.map(([k,v])=>`${JSON.stringify(k)}:${JSON.stringify(v)}`).join(',')}}}`;
    }
    return `${map[key] || key}=${JSON.stringify(value)}`;
  }).join(' ');
  const children=(node.children || []).map(render).join('');
  return children ? `<${tag} ${attrs}>${children}</${tag}>` : `<${tag} ${attrs} />`;
}
const jsx=$.root().contents().toArray().map(render).join('\n');
fs.writeFileSync('src/components/ProjectedPoints.tsx', `// Generated from the authorized SVG overlay export. Keep class names for scene projection.\nexport function ProjectedPoints() { return <>${jsx}</>; }\n`);
