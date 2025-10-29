import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperties';
import LoadingSpinner from '../components/LoadingSpinner';
import { BedIcon, BathIcon, AreaIcon, LocationMarkerIcon } from '../components/IconComponents';
import MortgageCalculator from '../components/MortgageCalculator';

const PropertyImageGallery: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div>
            <img src={mainImage} alt={title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-4" />
            <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${title} thumbnail ${index + 1}`}
                        className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all duration-300 ${mainImage === image ? 'ring-2 ring-primary-500' : 'opacity-70 hover:opacity-100'}`}
                        onClick={() => setMainImage(image)}
                    />
                ))}
            </div>
        </div>
    );
};

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { property, loading, error } = useProperty(id);

    if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
    if (error) return <div className="text-center py-20 text-red-500">{error.message}</div>;
    if (!property) return <div className="text-center py-20">Property not found.</div>;

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
        <div className="bg-white dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{property.title}</h1>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                        <LocationMarkerIcon className="w-5 h-5 mr-1"/>
                        <span>{property.location.address}, {property.location.city}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <PropertyImageGallery images={property.images} title={property.title} />
                        
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Description</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p>
                        </div>
                        
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                             <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
                                <p className="text-3xl font-extrabold text-primary-900 dark:text-primary-200">{formatPrice(property.price, property.status)}</p>
                                <div className="mt-6 flex justify-around text-center border-t border-b border-gray-200 dark:border-gray-700 py-4">
                                    <div className="text-gray-800 dark:text-gray-200">
                                        <BedIcon className="w-6 h-6 mx-auto text-primary-800 dark:text-primary-400"/>
                                        <p className="text-sm mt-1">{property.bedrooms} Beds</p>
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-200">
                                        <BathIcon className="w-6 h-6 mx-auto text-primary-800 dark:text-primary-400"/>
                                        <p className="text-sm mt-1">{property.bathrooms} Baths</p>
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-200">
                                        <AreaIcon className="w-6 h-6 mx-auto text-primary-800 dark:text-primary-400"/>
                                        <p className="text-sm mt-1">{property.area.toLocaleString()} sqft</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                     <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">Contact Agent</h3>
                                     <form>
                                         <div className="space-y-4">
                                            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                                            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"/>
                                            <textarea placeholder="Your Message..." rows={4} className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"></textarea>
                                            <button type="submit" className="w-full bg-primary-800 text-white font-bold py-3 px-4 rounded-md hover:bg-primary-900 transition-colors">
                                                Send Inquiry
                                            </button>
                                         </div>
                                     </form>
                                </div>
                            </div>

                            {property.status === 'For Sale' && (
                                <MortgageCalculator propertyPrice={property.price} />
                            )}
                            
                            <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Location</h3>
                                 <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                    <iframe
                                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${property.location.lat},${property.location.lng}`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="property location"
                                        className="dark:grayscale dark:invert"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;