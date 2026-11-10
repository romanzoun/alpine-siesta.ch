import type { APIRoute } from 'astro';
import { site } from '../../../config';
import { fetchBild, KatalogFehler } from '../../../modules/entdecken/api';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  if (!site.module.entdecken) return new Response(null, { status: 404 });
  const slug = params.slug;
  if (!slug) return new Response(null, { status: 404 });
  try {
    const { body, mime } = await fetchBild(slug);
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    if (err instanceof KatalogFehler) return new Response(null, { status: err.status === 404 ? 404 : 502 });
    throw err;
  }
};
