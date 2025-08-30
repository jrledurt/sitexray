import { NextRequest, NextResponse } from 'next/server';
import { urlSchema } from '../../../lib/analyze/ssrf';
import { checkRobotsTxt } from '../../../lib/analyze/robots';
import { fetchWithTimeout } from '../../../lib/analyze/fetchers';
import { analyzeHtml } from '../../../lib/analyze/html';
import { analyzeCss } from '../../../lib/analyze/css';
import { analyzeJs } from '../../../lib/analyze/js';
import { analyzeHeaders } from '../../../lib/analyze/headers';
import { summarize } from '../../../lib/analyze/summarize';
import { setReport } from '../../../lib/store';
import { HTML_SIZE_LIMIT, SCRIPT_LIMIT, STYLE_LIMIT } from '../../../lib/analyze/limits';

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const parse = urlSchema.safeParse(url);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.issues[0].message }, { status: 400 });
  }
  // Robots.txt check
  const robots = await checkRobotsTxt(url);
  if (!robots.allowed) {
    return NextResponse.json({ error: robots.reason || 'Blocked by robots.txt' }, { status: 403 });
  }
  // Fetch HTML
  let html = '';
  let headers: Record<string, string> = {};
  try {
    const res = await fetchWithTimeout(url, { headers: { 'User-Agent': 'Site-X-Ray/1.0' } });
    html = await res.text();
    headers = Object.fromEntries(res.headers.entries());
    if (html.length > HTML_SIZE_LIMIT) throw new Error('HTML too large');
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch HTML' }, { status: 500 });
  }
  // Analyze
  const htmlReport = analyzeHtml(html);
  const headersReport = analyzeHeaders(headers);
  // ...fetch and analyze CSS/JS assets (stub)
  const reportJson = { html: htmlReport, headers: headersReport };
  const reportMarkdown = summarize(reportJson);
  const id = setReport({ reportJson, reportMarkdown });
  return NextResponse.json({ id, reportJson, reportMarkdown });
}
