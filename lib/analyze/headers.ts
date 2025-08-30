export function analyzeHeaders(headers: Record<string, string>) {
  // Extract security, server, cache, and other signals
  return {
    server: headers['server'] || '',
    contentType: headers['content-type'] || '',
    cacheControl: headers['cache-control'] || '',
    setCookie: headers['set-cookie'] || '',
    xPoweredBy: headers['x-powered-by'] || '',
    csp: headers['content-security-policy'] || '',
    hsts: headers['strict-transport-security'] || '',
    xFrameOptions: headers['x-frame-options'] || '',
    xContentTypeOptions: headers['x-content-type-options'] || '',
  };
}
