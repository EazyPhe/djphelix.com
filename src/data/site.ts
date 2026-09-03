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
    phone: '',
    socialLinks: [] as Array<{ label: string; href: string }>
  },
  booking: {
    formEndpoint: '',
    method: 'POST' as const
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
      }
    ]
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Weddings', href: '/weddings/' },
    { label: 'Events & Nightlife', href: '/events-nightlife/' },
    { label: 'About', href: '/about/' },
    { label: 'Playlists', href: '/playlists/' },
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
