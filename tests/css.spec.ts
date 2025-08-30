import { describe, it, expect } from 'vitest';
import { analyzeCss } from '../lib/analyze/css';

describe('analyzeCss', () => {
  it('counts rules and selectors', () => {
    const css = 'h1 { color: red; } .foo, .bar { color: blue; }';
    const result = analyzeCss(css);
    expect(result.ruleCount).toBeGreaterThan(0);
    expect(result.selectorCount).toBeGreaterThan(0);
  });
});
