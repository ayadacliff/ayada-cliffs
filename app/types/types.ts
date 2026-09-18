export interface Accommodation {
  id: number|string;
  name: string;
  description: string;
  image: string;
  price?: string;
  amenityBadges?: string[];
  viewType?: string;
  maxGuests?: number;
}

export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface Villa {
  id: string | number;
  name: string;
  image: string;
  price: string;
  maxGuests: number;
  bedrooms: number;
  description: string;
  features: string[];
  amenities: string[];
}

export type FormData = {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
}