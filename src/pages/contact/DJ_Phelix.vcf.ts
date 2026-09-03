import type { APIRoute } from 'astro';
import { contactPhotoBase64 } from '../../lib/contactAssets';
import { site } from '../../data/site';
import { buildVCard } from '../../lib/vcard';

export const prerender = true;
export const GET: APIRoute = () => new Response(
  buildVCard(site.contact, site.canonicalUrl, contactPhotoBase64, site.contact.card.photoDownload),
  {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="DJ_Phelix.vcf"'
    }
  }
);
