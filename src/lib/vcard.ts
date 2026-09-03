/** vCard 3.0 with an embedded JPEG, CRLF endings and UTF-8-safe line folding. */
interface ContactLink {
  readonly label: string;
  readonly href: string;
}

export interface VCardContact {
  readonly inquiryEmail: string;
  readonly phone: string;
  readonly socialLinks: readonly ContactLink[];
  readonly card: {
    readonly givenName: string;
    readonly familyName: string;
    readonly formattedName: string;
    readonly nickname: string;
    readonly organization: string;
    readonly title: string;
    readonly uid: string;
    readonly note: string;
    readonly otherLinks: readonly ContactLink[];
  };
}

const escapeText = (value: string): string => value
  .replace(/\\/g, '\\\\')
  .replace(/\r\n|\r|\n/g, '\\n')
  .replace(/;/g, '\\;')
  .replace(/,/g, '\\,');

/** Each physical line is at most 75 octets, including the continuation space. */
export function foldLine(value: string): string {
  const encoder = new TextEncoder();
  let line = '';
  let width = 0;
  const lines: string[] = [];
  for (const character of value) {
    const size = encoder.encode(character).length;
    if (width + size > 75) {
      lines.push(line);
      line = ' ';
      width = 1;
    }
    line += character;
    width += size;
  }
  lines.push(line);
  return lines.join('\r\n');
}

function safeWebUrl(value: string): string {
  if (/[\r\n]/.test(value)) throw new Error('A contact URL contains a line break.');
  const parsed = new URL(value);
  if (!['https:', 'http:'].includes(parsed.protocol)) {
    throw new Error('Contact website links must use HTTP or HTTPS.');
  }
  return value;
}

export function buildVCard(
  contact: VCardContact,
  website: string,
  jpegBase64: string,
  sourcePath = '/contact/DJ_Phelix.vcf'
): string {
  const image = jpegBase64.replace(/\s/g, '');
  if (!image || image.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(image)) {
    throw new Error('The embedded contact image is not valid base64.');
  }
  if (!/^\+?[\d ()-]+$/.test(contact.phone)) throw new Error('Invalid contact phone.');
  const card = contact.card;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeText(card.familyName)};${escapeText(card.givenName)};;;`,
    `FN:${escapeText(card.formattedName)}`,
    `NICKNAME:${escapeText(card.nickname)}`,
    `ORG:${escapeText(card.organization)}`,
    `TITLE:${escapeText(card.title)}`,
    `TEL;TYPE=CELL,VOICE:${contact.phone}`,
    `EMAIL;TYPE=INTERNET,PREF:${escapeText(contact.inquiryEmail)}`,
    `URL;TYPE=WORK:${safeWebUrl(website)}`,
    `UID:${escapeText(card.uid)}`,
    `SOURCE:${safeWebUrl(new URL(sourcePath, website).href)}`
  ];
  const extraLinks = [...contact.card.otherLinks, ...contact.socialLinks];
  for (const [index, link] of extraLinks.entries()) {
    const group = `item${index + 1}`;
    lines.push(`${group}.URL:${safeWebUrl(link.href)}`);
    lines.push(`${group}.X-ABLabel:${escapeText(link.label)}`);
  }
  lines.push(`NOTE:${escapeText(card.note)}`);
  lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${image}`);
  lines.push('END:VCARD');
  return `${lines.map(foldLine).join('\r\n')}\r\n`;
}
