import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { LocationMarkerIcon } from './IconComponents';

interface PropertyMapProps {
  properties: Property[];
}

// Function to normalize coordinates to a 0-100 scale for positioning
const getPosition = (lat: number, lng: number) => {
  // Bounding box for India, with some padding
  const minLat = 8;
  const maxLat = 37;
  const minLng = 68;
  const maxLng = 97;

  const top = ((maxLat - lat) / (maxLat - minLat)) * 100;
  const left = ((lng - minLng) / (maxLng - minLng)) * 100;
  
  // Clamp values to prevent markers from going off-map
  return {
    top: `${Math.max(0, Math.min(100, top))}%`,
    left: `${Math.max(0, Math.min(100, left))}%`,
  };
};

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  const formatPrice = (price: number, status: 'For Sale' | 'For Rent') => {
    if (status === 'For Rent') {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price) + '/mo';
    }
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="relative w-full h-[70vh] bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img
        src="https://source.unsplash.com/random/1600x900/?map,india"
        alt="Map background"
        className="w-full h-full object-cover dark:grayscale dark:opacity-70"
      />
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

      {properties.map((property) => {
        const { top, left } = getPosition(property.location.lat, property.location.lng);
        return (
          <div key={property.id} style={{ top, left }} className="absolute transform -translate-x-1/2 -translate-y-1/2">
            <button
              onMouseEnter={() => setActiveProperty(property)}
              onMouseLeave={() => setActiveProperty(null)}
              onClick={() => setActiveProperty(property)}
              className="relative focus:outline-none"
            >
              <LocationMarkerIcon className="w-8 h-8 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:scale-125" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+2px)] text-primary-800 font-bold text-lg">•</span>
            </button>
            {activeProperty?.id === property.id && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-10 animate-fade-in-up"
                onMouseEnter={() => setActiveProperty(property)}
                onMouseLeave={() => setActiveProperty(null)}
              >
                <Link to={`/properties/${property.id}`} className="block">
                  <img src={property.images[0]} alt={property.title} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 truncate">{property.title}</h3>
                    <p className="text-primary-900 dark:text-primary-300 font-extrabold mt-1">{formatPrice(property.price, property.status)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{property.location.address}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PropertyMap;