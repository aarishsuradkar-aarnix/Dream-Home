import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Property } from '../types';

const PropertyFilters: React.FC<{onFilterChange: (filters: any) => void}> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        type: 'any',
        price: 'any',
        bedrooms: 'any',
        city: 'any'
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilters = { ...filters, [e.target.name]: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Type</label>
                    <select id="type" name="type" onChange={handleChange} value={filters.type} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                        <option value="any">Any</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                    <select id="price" name="price" onChange={handleChange} value={filters.price} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                        <option value="any">Any</option>
                        <option value="0-10000000">Under ₹1 Cr</option>
                        <option value="10000000-20000000">₹1 Cr - ₹2 Cr</option>
                        <option value="20000000+">Over ₹2 Cr</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bedrooms</label>
                    <select id="bedrooms" name="bedrooms" onChange={handleChange} value={filters.bedrooms} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                        <option value="any">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                    <select id="city" name="city" onChange={handleChange} value={filters.city} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                        <option value="any">Any</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Pune">Pune</option>
                        <option value="Thane">Thane</option>
                        <option value="Gurugram">Gurugram</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Goa">Goa</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Noida">Noida</option>
                        <option value="Navi Mumbai">Navi Mumbai</option>
                    </select>
                </div>
            </div>
        </div>
    );
};


const BuyPage: React.FC = () => {
    const { properties, loading, error } = useProperties();
    const [filters, setFilters] = useState({});

    const filteredProperties = useMemo(() => {
        const saleProperties = properties.filter(p => p.status === 'For Sale');

        return saleProperties.filter(property => {
            const { type, price, bedrooms, city } = filters as any;
            if (type && type !== 'any' && property.type !== type) return false;
            if (bedrooms && bedrooms !== 'any' && property.bedrooms < parseInt(bedrooms)) return false;
            if (city && city !== 'any' && property.location.city !== city) return false;
            if (price && price !== 'any') {
                if (price === '0-10000000' && property.price > 10000000) return false;
                if (price === '10000000-20000000' && (property.price < 10000000 || property.price > 20000000)) return false;
                if (price === '20000000+' && property.price < 20000000) return false;
            }
            return true;
        });
    }, [properties, filters]);
    
    if (error) return <div className="text-center py-20 text-red-500">Error loading properties.</div>;

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Properties for Sale</h1>
                    <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">Find your next home from our curated list of properties.</p>
                </div>
                
                <PropertyFilters onFilterChange={setFilters} />

                {loading ? (
                    <div className="flex justify-center py-20"><LoadingSpinner /></div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{filteredProperties.length} results found.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProperties.map(property => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                        {filteredProperties.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No properties found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BuyPage;