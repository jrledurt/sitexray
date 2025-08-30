import { describe, it, expect } from 'vitest';
import { analyzeHtml } from '../lib/analyze/html';

describe('analyzeHtml', () => {
  it('extracts title and meta', () => {
    const html = `<!DOCTYPE html><html><head><title>Test</title><meta name="description" content="desc"></head><body></body></html>`;
    const result = analyzeHtml(html);
    expect(result.title).toBe('Test');
    expect(result.metaDescription).toBe('desc');
  });
});
