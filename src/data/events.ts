export const eventFilterGroups = [
  {
    label: 'Experience',
    tags: ['Nightlife', 'Family Friendly', 'Live Music', 'Karaoke', 'Themed Event', 'Holiday', 'Community']
  },
  {
    label: 'Time',
    tags: ['Morning', 'Midday', 'Brunch', 'Afternoon', 'Evening', 'Late Night']
  },
  {
    label: 'Audience',
    tags: ['All Ages', '21+']
  },
  {
    label: 'Setting',
    tags: ['Outdoor', 'Indoor', 'Restaurant / Bar']
  },
  {
    label: 'Access',
    tags: ['Free', 'Ticketed']
  }
] as const;

export type EventTag = (typeof eventFilterGroups)[number]['tags'][number];

export interface UpcomingEvent {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue?: string;
  location: string;
  description?: string;
  image?: string;
  infoUrl?: string;
  tags: EventTag[];
}

const sailingCowDates = [
  '2026-09-05',
  '2026-09-06',
  '2026-09-12',
  '2026-09-13',
  '2026-09-19',
  '2026-09-20',
  '2026-09-26',
  '2026-09-27',
  '2026-10-03',
  '2026-10-04',
  '2026-10-10',
  '2026-10-11'
] as const;

const sailingCowEvents: UpcomingEvent[] = sailingCowDates.map((date) => ({
  slug: `sailing-cow-${date}`,
  title: 'DJ Phelix at The Sailing Cow',
  date,
  startTime: '14:00',
  endTime: '17:00',
  venue: 'The Sailing Cow',
  location: '170 Old Wharf Rd, Dennis Port, MA 02639',
  description: 'Afternoon DJ set. All are welcome.',
  infoUrl: 'https://www.sailingcow.com/',
  tags: ['Afternoon', 'All Ages', 'Restaurant / Bar']
}));

// Add verified public appearances here. Keep private bookings and unapproved venue details out of this file.
export const upcomingEvents: UpcomingEvent[] = [...sailingCowEvents];
