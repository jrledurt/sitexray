import { z } from 'zod';

export const urlSchema = z.string().url().refine(
  (url) => {
    // Basic SSRF guard: block loopback/private IPs (stub)
    return !/localhost|127\.|0\.0\.0\.0|::1/.test(url);
  },
  { message: 'URL must not be localhost or private IP' }
);
