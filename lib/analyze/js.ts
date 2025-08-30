
  const frameworks: string[] = [];
  try {
    ((globalThis as any).acorn ? (globalThis as any).acorn : require('acorn')).parse(js, { ecmaVersion: 'latest' });
    if (/React|Next\.js|__NEXT_DATA__/.test(js)) frameworks.push('React/Next.js');
    if (/Vue|__VUE__/.test(js)) frameworks.push('Vue');
    if (/Svelte/.test(js)) frameworks.push('Svelte');
    if (/Angular|ng\b/.test(js)) frameworks.push('Angular');
    if (/Vite/.test(js)) frameworks.push('Vite');
    if (/Webpack/.test(js)) frameworks.push('Webpack');
  } catch (e) {}
  return { frameworks };
}
