// Fliesstext-Bilder im Reiseführer: srcset für die schmale Spalte (max. 34rem).
// Läuft vor Astros Bild-Markierung, damit getImage die Breiten übernimmt.

type Knoten = { properties?: Record<string, unknown> };

export function markdownBildGroessen() {
  return {
    name: 'bild-groessen',
    element: {
      filter: ['img'],
      visit(node: Knoten, ctx: { setProperty: (knoten: Knoten, key: string, wert: unknown) => void }) {
        const src = node.properties?.src;
        if (typeof src !== 'string' || src.startsWith('/') || /^https?:/i.test(src)) return;
        if (!node.properties?.widths) ctx.setProperty(node, 'widths', [480, 800, 1200]);
        if (!node.properties?.sizes) ctx.setProperty(node, 'sizes', '(min-width: 52rem) 34rem, 100vw');
      },
    },
  };
}
