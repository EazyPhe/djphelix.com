import type { APIRoute } from 'astro';
import { contactLogoBase64 } from '../../lib/contactAssets';
import { site } from '../../data/site';
import { buildVCard } from '../../lib/vcard';

export const prerender = true;
export const GET: APIRoute = () => new Response(
  buildVCard(site.contact, site.canonicalUrl, contactLogoBase64, site.contact.card.logoDownload),
  {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="DJ_Phelix_Logo.vcf"'
    }
  }
);
