// Browser-Client für die öffentliche Trizoun-Travel-API.
// Entspricht @trizoun/sdk (Repo trizoun-travel) – ersetzen, sobald das Paket veröffentlicht ist.

export interface Tag {
  datum: string;
  frei: boolean;
}
export interface Angebot {
  verfuegbar: boolean;
  preis: number | null;
  waehrung: string | null;
}

export function createTrizoun({ key, baseUrl }: { key: string; baseUrl: string }) {
  async function get<T>(pfad: string, params: Record<string, string | number>): Promise<T> {
    const qs = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]));
    const res = await fetch(`${baseUrl}/v1/public${pfad}?${qs}`, { headers: { authorization: `Bearer ${key}` } });
    const body = (await res.json().catch(() => ({}))) as { data?: T; error?: string };
    if (!res.ok) throw new Error(body.error ?? `Anfrage fehlgeschlagen (${res.status})`);
    return body.data as T;
  }
  const s = (slug: string) => `/listings/${encodeURIComponent(slug)}`;
  return {
    verfuegbarkeit: (slug: string, von: string, bis: string) => get<Tag[]>(`${s(slug)}/availability`, { von, bis }),
    angebot: (slug: string, a: { anreise: string; abreise: string; erwachsene: number }) => get<Angebot>(`${s(slug)}/offer`, a),
    kontakt: async (
      slug: string,
      a: { vorname: string; nachname?: string; email: string; nachricht: string; anreise?: string; abreise?: string; gaeste?: number; website?: string },
    ) => {
      const res = await fetch(`${baseUrl}/v1/public${s(slug)}/kontakt`, {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify(a),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) throw new Error(body.error ?? `Anfrage fehlgeschlagen (${res.status})`);
    },
    anfrageSenden: async (
      slug: string,
      a: { email: string; anreise: string; abreise: string; erwachsene: number; sprache: string; einwilligungText: string; einwilligungUmfang: string },
    ) => {
      const res = await fetch(`${baseUrl}/v1/public${s(slug)}/anfragen`, {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({ ...a, einwilligung: true }),
        keepalive: true,
      });
      if (!res.ok) throw new Error(`Anfrage fehlgeschlagen (${res.status})`);
    },
    buchungsLink: async (slug: string, a: { anreise: string; abreise: string; erwachsene: number; sprache: string }) =>
      (await get<{ url: string }>(`${s(slug)}/booking-link`, a)).url,
  };
}
