
export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
  type: 'Apartment' | 'House' | 'Villa';
  status: 'For Sale' | 'For Rent';
  bedrooms: number;
  bathrooms: number;
  area: number; 
  description: string;
  amenities: string[];
  images: string[];
  agent: {
    name: string;
    avatar: string;
  };
  featured: boolean;
  approved: boolean;
  createdAt: string;
  image_prompt?: string;
}