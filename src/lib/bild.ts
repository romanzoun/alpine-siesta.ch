import type { ImageMetadata } from 'astro';

// schema.org-Bild: die ausgelieferte Datei, mit Masse und Bildunterschrift.
export function bildSchema(bild: ImageMetadata, alt: string, basis: string | URL) {
  return {
    '@type': 'ImageObject' as const,
    url: new URL(bild.src, basis).href,
    caption: alt,
    width: bild.width,
    height: bild.height,
  };
}
