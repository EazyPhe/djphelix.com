import type { APIRoute } from 'astro';
import { contactQrBase64, decodeBase64 } from '../../../lib/contactAssets';

export const prerender = true;
export const GET: APIRoute = () => new Response(decodeBase64(contactQrBase64), {
  headers: {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=31536000, immutable'
  }
});
