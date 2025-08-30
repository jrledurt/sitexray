import * as cheerio from 'cheerio';

export function analyzeHtml(html: string) {
  const $ = cheerio.load(html);
  const title: string = $('title').text();
  const metaDescription: string = $('meta[name="description"]').attr('content') || '';
  const canonical: string = $('link[rel="canonical"]').attr('href') || '';
  const robotsMeta: string = $('meta[name="robots"]').attr('content') || '';
  const viewport: string = $('meta[name="viewport"]').attr('content') || '';
  const charset: string = $('meta[charset]').attr('charset') || '';

  const structure: Record<string, number> = {
    header: $('header').length,
    nav: $('nav').length,
    main: $('main').length,
    article: $('article').length,
    section: $('section').length,
    aside: $('aside').length,
    footer: $('footer').length,
    forms: $('form').length,
    cards: $('[class*=card], [class*=Card]').length,
  };

  const css: { href: string; type: string }[] = [];
  $('link[rel="stylesheet"]').each((_: any, el: any) => {
    css.push({ href: $(el).attr('href') || '', type: 'css' });
  });
  const js: { src: string; type: string }[] = [];
  $('script[src]').each((_: any, el: any) => {
    js.push({ src: $(el).attr('src') || '', type: 'js' });
  });
  const images: { src: string; alt: string }[] = [];
  $('img').each((_: any, el: any) => {
    images.push({ src: $(el).attr('src') || '', alt: $(el).attr('alt') || '' });
  });
  const fonts: { href: string; type: string }[] = [];
  $('link[rel="preload"][as="font"]').each((_: any, el: any) => {
    fonts.push({ href: $(el).attr('href') || '', type: 'font' });
  });

  return {
    title,
    metaDescription,
    canonical,
    robotsMeta,
    viewport,
    charset,
    structure,
    assets: { css, js, images, fonts },
  };
}