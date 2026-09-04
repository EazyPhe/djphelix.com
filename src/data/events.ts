export const eventFilterGroups = [
  {
    label: 'Experience',
    tags: ['Nightlife', 'Family Friendly', 'Live Music', 'Karaoke', 'Themed Event', 'Holiday', 'Community']
  },
  {
    label: 'Time',
    tags: ['Morning', 'Midday', 'Brunch', 'Evening', 'Late Night']
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

// Add verified public appearances here. Keep private bookings and unapproved venue details out of this file.
export const upcomingEvents: UpcomingEvent[] = [];
