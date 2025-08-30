export function summarize(reportJson: any): string {
  const { html, headers, css, js } = reportJson;
  let stack = [];
  if (css?.tailwind) stack.push('Tailwind CSS');
  if (css?.bootstrap) stack.push('Bootstrap');
  if (css?.bulma) stack.push('Bulma');
  if (js?.frameworks?.length) stack = stack.concat(js.frameworks);
  if (!stack.length) stack.push('Unknown');

  return `# Site X-Ray Report\n\n` +
    `## Stack & fingerprints\n` +
    `Likely frameworks: **${stack.join(', ')}**\n\n` +
    `## How it loads\n` +
    `- HTML size: N/A\n- CSS files: ${html?.assets?.css?.length ?? 0}\n- JS files: ${html?.assets?.js?.length ?? 0}\n\n` +
    `## Page structure map\n` +
    Object.entries(html?.structure || {}).map(([k, v]) => `- ${k}: ${v}`).join('\n') + '\n\n' +
    `## Notable assets\n` +
    (html?.assets?.css?.map((a: any) => `- CSS: ${a.href}`).join('\n') || '') + '\n' +
    (html?.assets?.js?.map((a: any) => `- JS: ${a.src}`).join('\n') || '') + '\n' +
    (html?.assets?.images?.map((a: any) => `- Image: ${a.src}`).join('\n') || '') + '\n' +
    (html?.assets?.fonts?.map((a: any) => `- Font: ${a.href}`).join('\n') || '') + '\n\n' +
    `## Performance & security signals\n` +
    `- Server: ${headers?.server || 'N/A'}\n- Content-Type: ${headers?.contentType || 'N/A'}\n- Cache-Control: ${headers?.cacheControl || 'N/A'}\n- CSP: ${headers?.csp || 'N/A'}\n- HSTS: ${headers?.hsts || 'N/A'}\n- X-Frame-Options: ${headers?.xFrameOptions || 'N/A'}\n- X-Content-Type-Options: ${headers?.xContentTypeOptions || 'N/A'}\n\n` +
    `## Caveats/limits of v0\n` +
    `- Static analysis only (no JS execution)\n- Asset sizes not fetched\n- Robots.txt and SSRF guards in place`;
}
