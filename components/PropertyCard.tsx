import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { BedIcon, BathIcon, AreaIcon, LocationMarkerIcon, SparklesIcon } from './IconComponents';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number, status: 'For Sale' | 'For Rent') => {
    if (status === 'For Rent') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(price) + '/month';
    }

    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-none dark:border dark:border-gray-700 overflow-hidden hover:shadow-xl dark:hover:border-primary-500 transition-shadow duration-300 group">
      <Link to={`/properties/${property.id}`}>
        <div className="relative">
          <img src={property.images[0]} alt={property.title} className="w-full h-56 object-cover" />
          <div className="absolute top-2 left-2 bg-primary-800 text-white text-xs font-bold px-2 py-1 rounded">
            {property.status}
          </div>
          {property.image_prompt && (
            <div className="absolute top-2 right-2 bg-accent-400/90 text-accent-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <SparklesIcon className="w-3 h-3" />
                <span>AI Generated</span>
            </div>
          )}
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white text-lg font-bold truncate">{property.title}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-2xl font-extrabold text-primary-900 dark:text-primary-200">{formatPrice(property.price, property.status)}</p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
            <LocationMarkerIcon className="w-4 h-4 mr-1"/>
            <p className="text-sm truncate">{property.location.address}, {property.location.city}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <BedIcon className="w-5 h-5 mr-1 text-primary-800 dark:text-primary-400"/>
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <BathIcon className="w-5 h-5 mr-1 text-primary-800 dark:text-primary-400"/>
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <AreaIcon className="w-5 h-5 mr-1 text-primary-800 dark:text-primary-400"/>
              <span>{property.area.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;