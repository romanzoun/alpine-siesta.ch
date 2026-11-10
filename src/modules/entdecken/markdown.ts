import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/** Katalog-Markdown → HTML (Inhalt stammt aus unserem Katalog, nicht von Gästen). */
export function markdownZuHtml(roh: string): string {
  return marked.parse(roh ?? '', { async: false }) as string;
}
