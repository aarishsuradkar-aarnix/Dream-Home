import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProperties } from '../hooks/useProperties';

import type { Property } from '../types';
import BuySellRentSection from '../components/BuySellRentSection';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?location=${location}`);
  };

  return (
    <div className="relative bg-gray-800 h-[60vh] flex items-center justify-center text-white">
      <div className="absolute inset-0">
        <img src="https://picsum.photos/seed/hero/1600/900" alt="Modern house" className="w-full h-full object-cover opacity-40 dark:opacity-30"/>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
          Find Your Dream Home
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          We provide a complete service for the sale, purchase or rental of real estate.
        </p>
        <form onSubmit={handleSearch} className="max-w-xl mx-auto bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-2xl flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city, address, or zip code..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <button type="submit" className="bg-primary-800 text-white font-bold p-3 rounded-md hover:bg-primary-900 transition-colors w-full sm:w-auto">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

const FeaturedProperties: React.FC = () => {
    const { properties, loading } = useProperties();
    
    const featuredProperties = useMemo(() => {
        return properties.filter(p => p.featured).slice(0, 6);
    }, [properties]);

    if (loading) {
        return <div className="py-24 flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Featured Properties</h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Handpicked properties by our team.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Link to="/buy" className="inline-block bg-primary-800 text-white font-bold px-6 py-3 rounded-md hover:bg-primary-900 transition-colors">
                        View All Properties for Sale
                    </Link>
                </div>
            </div>
        </div>
    );
};

const CallToActionBanner: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-primary-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                <span className="block">Ready to sell your property?</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-primary-200">
                                List your property with us and reach thousands of potential buyers.
                            </p>
                            <Link to="/sell" className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-primary-800 hover:bg-primary-50">
                                List Your Property
                            </Link>
                        </div>
                    </div>
                    <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <img className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="https://picsum.photos/seed/cta/500/500" alt="App screenshot" />
                    </div>
                </div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <BuySellRentSection />
      <CallToActionBanner />
    </>
  );
};

export default HomePage;