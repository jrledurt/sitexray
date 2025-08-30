
  let ruleCount: number = 0;
  let selectorCount: number = 0;
  let tailwind: boolean = false, bootstrap: boolean = false, bulma: boolean = false;
  try {
    const ast = (globalThis as any).csstree ? (globalThis as any).csstree.parse(css) : require('css-tree').parse(css);
    ((globalThis as any).csstree ? (globalThis as any).csstree : require('css-tree')).walk(ast, {
      visit: 'Rule',
      enter(node: any) {
        ruleCount++;
        if (node.prelude && node.prelude.type === 'SelectorList') {
          const sel = ((globalThis as any).csstree ? (globalThis as any).csstree : require('css-tree')).generate(node.prelude);
          if (/tw-|tailwind/i.test(sel)) tailwind = true;
          if (/\bcontainer\b|\brow\b|col-\d|btn|alert|card|navbar/.test(sel)) bootstrap = true;
          if (/bulma|is-\w+/.test(sel)) bulma = true;
        }
      },
    });
    ((globalThis as any).csstree ? (globalThis as any).csstree : require('css-tree')).walk(ast, {
      visit: 'Selector',
      enter() { selectorCount++; },
    });
  } catch (e) {}
  return { ruleCount, selectorCount, tailwind, bootstrap, bulma };
}
