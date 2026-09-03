export const site = {
  name: 'DJ Phelix',
  canonicalUrl: 'https://djphelix.com',
  description:
    'DJ Phelix is a Cape Cod DJ for weddings, private events, nightlife, and themed events.',
  basedIn: 'Cape Cod, Massachusetts',
  serviceArea: 'Cape Cod and surrounding areas',
  primaryAction: 'Check availability',
  // Contact values transcribed from the owner-supplied QR; official website added.
  contact: {
    inquiryEmail: 'estinvilp3@gmail.com',
    phone: '+17742681245',
    phoneDisplay: '+1 774-268-1245',
    socialLinks: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/eazy_phe/'
      },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/phelix.estinvil/'
      },
      {
        label: 'Snapchat',
        href: 'https://www.snapchat.com/@phelixthecat33'
      }
    ],
    card: {
      givenName: 'Phelix',
      familyName: 'Estinvil',
      formattedName: 'Phelix Estinvil (DJ)',
      nickname: 'DJ Phelix',
      organization: 'DJ Phelix',
      title: 'Professional DJ, MC & Event Production Specialist',
      uid: 'djphelix-contact@djphelix.com',
      note: 'Services\nProfessional DJ and MC services\nWedding DJ\nKaraoke Hosting\nAudio & Visual (AV) Setup\nEvent Lighting\nLive Band Recording\nLive Event Audio Recording\n\nEvents Served\nWeddings, private events, and corporate events.\n\nService Area\nCape Cod, the South Shore, and anywhere between Cape Cod and Boston.\n\nContact Options\nMobile: +1 774-268-1245\nEmail: estinvilp3@gmail.com\nWebsite: https://djphelix.com\nDigital Contact Card: https://dot.cards/phe\nInstagram: https://www.instagram.com/eazy_phe/\nFacebook: https://www.facebook.com/phelix.estinvil/\nSnapchat: https://www.snapchat.com/@phelixthecat33\nPayments accepted: Venmo, Cash App, and PayPal.\n\nTexting preferred. If you do not hear back within one hour, please call.\nContact me for availability, pricing, and event bookings.',
      otherLinks: [
        {
          label: 'Digital contact card',
          href: 'https://dot.cards/phe'
        },
        {
          label: 'Venmo',
          href: 'https://venmo.com/u/PhelixE'
        },
        {
          label: 'Cash App',
          href: 'https://cash.app/$PhelixE'
        },
        {
          label: 'PayPal',
          href: 'https://paypal.me/PhelixE'
        }
      ],
      photoDownload: '/contact/DJ_Phelix.vcf',
      logoDownload: '/contact/DJ_Phelix_Logo.vcf',
      photoImage: '/images/contact/dj-phelix-photo.jpg',
      logoImage: '/images/contact/dj-phelix-logo.jpg',
      websiteQr: '/images/contact/website-contact-qr.png',
      websiteQrPng: '/images/contact/website-contact-qr.png',
      landingPath: '/contact/#save-contact'
    }
  },
  booking: {
    formEndpoint: '',
    method: 'POST' as const
  },
  media: {
    approvedPhotoLinks: [] as string[],
    approvedVideoLinks: [] as string[],
    approvedMixLinks: [] as string[]
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Weddings', href: '/weddings/' },
    { label: 'Events & Nightlife', href: '/events-nightlife/' },
    { label: 'About', href: '/about/' },
    { label: 'Mixes', href: '/mixes/' },
    { label: 'Contact', href: '/contact/' }
  ],
  services: [
    {
      title: 'Weddings',
      href: '/weddings/',
      description:
        'A personal soundtrack and a clear event plan shaped around your people and your timeline.'
    },
    {
      title: 'Private events',
      href: '/events-nightlife/',
      description:
        'A flexible approach for celebrations, gatherings, and nights that need their own energy.'
    },
    {
      title: 'Nightlife & themed events',
      href: '/events-nightlife/',
      description:
        'An adaptive set for nightlife, themed celebrations, and editable offerings such as an 80s night.'
    }
  ],
  eventTypes: [
    'Wedding',
    'Private event',
    'Nightlife event',
    'Themed event',
    'Other'
  ]
} as const;

export const hasBookingEndpoint = Boolean(site.booking.formEndpoint);
export const hasInquiryEmail = Boolean(site.contact.inquiryEmail);
