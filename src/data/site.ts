const serviceOfferings = [
  {
    id: 'weddings',
    category: 'Celebrations',
    title: 'Weddings',
    description:
      'A personal soundtrack and a clear event plan shaped around your people, priorities, and timeline.',
    actionLabel: 'Explore weddings',
    actionHref: '/weddings/'
  },
  {
    id: 'birthdays-private-parties',
    category: 'Celebrations',
    title: 'Birthdays & private parties',
    description:
      'Music and event pacing shaped around the occasion, the guest list, and the atmosphere you want to create.',
    actionLabel: 'Discuss a private event',
    actionHref: '/contact/'
  },
  {
    id: 'corporate-events',
    category: 'Business & community',
    title: 'Corporate events',
    description:
      'Professional DJ and MC support for company gatherings, celebrations, and other business events.',
    actionLabel: 'Discuss a corporate event',
    actionHref: '/contact/'
  },
  {
    id: 'community-family-events',
    category: 'Business & community',
    title: 'Community & family events',
    description:
      'Audience-aware music for community occasions, family gatherings, fundraisers, and all-age events.',
    actionLabel: 'Discuss a community event',
    actionHref: '/contact/'
  },
  {
    id: 'karaoke',
    category: 'Entertainment',
    title: 'Karaoke',
    description:
      'Hosted karaoke for private events and public gatherings where the guests become part of the entertainment.',
    actionLabel: 'Ask about karaoke',
    actionHref: '/contact/'
  },
  {
    id: 'nightlife-bar-events',
    category: 'Entertainment',
    title: 'Nightlife & bar events',
    description:
      'Adaptive music for bars, restaurants, nightlife events, and recurring public appearances.',
    actionLabel: 'Explore nightlife events',
    actionHref: '/events-nightlife/'
  },
  {
    id: 'themed-decade-parties',
    category: 'Entertainment',
    title: 'Themed & decade parties',
    description:
      'Focused programming for 80s nights and other theme- or era-led events that call for a distinct identity.',
    actionLabel: 'Explore themed events',
    actionHref: '/events-nightlife/'
  }
] as const;

const primaryNavigation = [
  {
    label: 'Services',
    key: 'services',
    activePaths: ['/services/', '/weddings/', '/events-nightlife/'],
    overview: {
      label: 'View all services',
      href: '/services/',
      description: 'Compare every confirmed DJ Phelix event offering in one place.'
    },
    groups: [
      {
        label: 'Celebrations',
        items: [
          {
            label: 'Weddings',
            href: '/weddings/',
            description: 'Wedding music, planning, and event-flow support.'
          },
          {
            label: 'Birthdays & private parties',
            href: '/services/#birthdays-private-parties',
            description: 'Personal celebrations with their own energy.'
          }
        ]
      },
      {
        label: 'Business & community',
        items: [
          {
            label: 'Corporate events',
            href: '/services/#corporate-events',
            description: 'Company gatherings and business celebrations.'
          },
          {
            label: 'Community & family events',
            href: '/services/#community-family-events',
            description: 'Community-focused and all-ages occasions.'
          }
        ]
      },
      {
        label: 'Entertainment',
        items: [
          {
            label: 'Karaoke',
            href: '/services/#karaoke',
            description: 'Hosted sing-along entertainment.'
          },
          {
            label: 'Nightlife & bar events',
            href: '/events-nightlife/',
            description: 'Bars, restaurants, and nightlife programming.'
          },
          {
            label: 'Themed & decade parties',
            href: '/services/#themed-decade-parties',
            description: '80s nights and other era-led concepts.'
          }
        ]
      }
    ]
  },
  { label: 'Upcoming Events', href: '/events/' },
  { label: 'About', href: '/about/' },
  {
    label: 'Media',
    key: 'media',
    activePaths: ['/playlists/', '/mixes/'],
    compact: true,
    groups: [
      {
        label: 'Listen',
        items: [
          {
            label: 'Playlists',
            href: '/playlists/',
            description: 'Browse curated Spotify collections.'
          },
          {
            label: 'Mixes',
            href: '/mixes/',
            description: 'Explore DJ Phelix mix content.'
          }
        ]
      }
    ]
  },
  { label: 'Resources', href: '/client-documents/' },
  { label: 'Contact', href: '/contact/' }
] as const;

export const site = {
  name: 'DJ Phelix',
  canonicalUrl: 'https://djphelix.com',
  description:
    'DJ Phelix is a Cape Cod DJ for weddings, private events, nightlife, and themed events.',
  basedIn: 'Cape Cod, Massachusetts',
  serviceArea: 'Cape Cod and surrounding areas',
  primaryAction: 'Check availability',
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
    formEndpoint: 'https://formsubmit.co/estinvilp3@gmail.com',
    method: 'POST' as const,
    provider: 'FormSubmit',
    successUrl: 'https://djphelix.com/inquiry-received/',
    sourceUrl: 'https://djphelix.com/contact/',
    subject: 'New DJ Phelix website booking inquiry',
    autoresponse:
      'Thank you for contacting DJ Phelix. Your inquiry was received for review. This automated message does not reserve a date, confirm availability, pricing, or services. DJ Phelix will reply using the contact details you provided.'
  },
  media: {
    approvedPhotoLinks: [] as string[],
    approvedVideoLinks: [] as string[],
    approvedMixLinks: [] as string[],
    spotifyPlaylists: [
      {
        slug: 'chill-covers',
        spotifyId: '2hIrTOMiPYsWcbONb8ifxR',
        title: 'Chill Covers',
        description:
          'A growing collection of relaxed cover versions curated by DJ Phelix.',
        primaryCategory: 'mood',
        genres: ['Covers'],
        moods: ['Chill'],
        eras: [],
        eventMoments: [],
        spotifyUrl: 'https://open.spotify.com/playlist/2hIrTOMiPYsWcbONb8ifxR',
        featured: true
      },
      {
        slug: 'uk-drill-mix',
        spotifyId: '4aouQuTVsQA5m6ljdEquA9',
        title: 'UK Drill Mix',
        description:
          'A growing collection of UK drill selections curated by DJ Phelix.',
        primaryCategory: 'genre',
        genres: ['UK Drill'],
        moods: [],
        eras: [],
        eventMoments: [],
        spotifyUrl: 'https://open.spotify.com/playlist/4aouQuTVsQA5m6ljdEquA9',
        featured: false
      },
      {
        slug: 'christian-afrobeat',
        spotifyId: '3HSiAkSrCss52LwRNtnus0',
        title: 'Christian Afrobeat',
        description:
          'A growing collection of Christian Afrobeat selections curated by DJ Phelix.',
        primaryCategory: 'genre',
        genres: ['Afrobeat', 'Christian'],
        moods: [],
        eras: [],
        eventMoments: [],
        spotifyUrl: 'https://open.spotify.com/playlist/3HSiAkSrCss52LwRNtnus0',
        featured: false
      },
      {
        slug: 'karaoke-ideas',
        spotifyId: '2AQy1vDjOF2h6NyME8uPqZ',
        title: 'Karaoke Ideas',
        description:
          'A growing collection of karaoke and sing-along ideas gathered by DJ Phelix.',
        primaryCategory: 'event',
        genres: [],
        moods: ['Sing-along'],
        eras: [],
        eventMoments: ['Karaoke'],
        spotifyUrl: 'https://open.spotify.com/playlist/2AQy1vDjOF2h6NyME8uPqZ',
        featured: false
      },
      {
        slug: '80s-90s-hip-hop',
        spotifyId: '27nrt3FaUH02UcLensApee',
        title: '80s & 90s Hip-Hop',
        description:
          'A collection of 1980s and 1990s hip-hop selections curated by DJ Phelix.',
        primaryCategory: 'era',
        genres: ['Hip-Hop'],
        moods: [],
        eras: ['1980s', '1990s'],
        eventMoments: [],
        spotifyUrl: 'https://open.spotify.com/playlist/27nrt3FaUH02UcLensApee',
        featured: false
      },
      {
        slug: 'spanish-mix',
        spotifyId: '1wwuzF8zAcqi2JduPjnRUs',
        title: 'Spanish Mix',
        description:
          'A growing collection of Spanish-language selections curated by DJ Phelix.',
        primaryCategory: 'genre',
        genres: ['Spanish-language'],
        moods: [],
        eras: [],
        eventMoments: [],
        spotifyUrl: 'https://open.spotify.com/playlist/1wwuzF8zAcqi2JduPjnRUs',
        featured: false
      }
    ]
  },
  primaryNavigation,
  serviceOfferings,
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Weddings', href: '/weddings/' },
    { label: 'Events & Nightlife', href: '/events-nightlife/' },
    { label: 'Upcoming Events', href: '/events/' },
    { label: 'About', href: '/about/' },
    { label: 'Playlists', href: '/playlists/' },
    { label: 'Mixes', href: '/mixes/' },
    { label: 'Resources', href: '/client-documents/' },
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
      href: '/services/#birthdays-private-parties',
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
    'Birthday or private party',
    'Corporate event',
    'Karaoke event',
    'Nightlife or bar event',
    'Themed or decade party',
    'Community or family event',
    'Other'
  ]
} as const;

export const hasBookingEndpoint = Boolean(site.booking.formEndpoint);
export const hasInquiryEmail = Boolean(site.contact.inquiryEmail);
