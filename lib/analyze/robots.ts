import { parse } from 'robots-txt-parse';

export async function checkRobotsTxt(origin: string): Promise<{ allowed: boolean; reason?: string }> {
  // Fetch and parse robots.txt (stub)
  // For v0, just disallow if Disallow: / is present
  return { allowed: true };
}
