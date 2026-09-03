import type { APIRoute } from 'astro';
import { contactPhotoBase64, decodeBase64 } from '../../../lib/contactAssets';

export const prerender = true;
export const GET: APIRoute = () => new Response(decodeBase64(contactPhotoBase64), {
  headers: {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'public, max-age=31536000, immutable'
  }
});
