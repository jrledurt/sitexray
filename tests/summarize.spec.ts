import { describe, it, expect } from 'vitest';
import { summarize } from '../lib/analyze/summarize';

describe('summarize', () => {
  it('returns markdown', () => {
    const md = summarize({});
    expect(md).toContain('# Site X-Ray Report');
  });
});
