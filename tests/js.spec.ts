import { describe, it, expect } from 'vitest';
import { analyzeJs } from '../lib/analyze/js';

describe('analyzeJs', () => {
  it('parses JS without error', () => {
    const js = 'function foo() { return 42; }';
    const result = analyzeJs(js);
    expect(result.frameworks).toBeDefined();
  });
});
