
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, DollarSignIcon, KeyIcon } from './IconComponents';

const BuySellRentSection: React.FC = () => {
    const sections = [
        {
          title: "Buy a Property",
          icon: <HomeIcon className="w-10 h-10 text-primary-800" />,
          description: "Explore verified listings, compare prices, and find your dream home with expert guidance.",
          buttonText: "Browse Homes",
          link: "/buy"
        },
        {
          title: "Sell a Property",
          icon: <DollarSignIcon className="w-10 h-10 text-green-600" />,
          description: "List your property, connect with serious buyers, and sell at the best price quickly and easily.",
          buttonText: "Start Selling",
          link: "/sell"
        },
        {
          title: "Rent a Property",
          icon: <KeyIcon className="w-10 h-10 text-amber-500" />,
          description: "Find rental homes and apartments that fit your lifestyle and budget — stress-free.",
          buttonText: "Find Rentals",
          link: "/rent"
        },
    ];

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Buy, Sell, or Rent Your Dream Property
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Whether you're searching for your next home, looking to sell fast, or renting with ease — we make property deals simple, secure, and transparent.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {sections.map((item) => (
                    <div
                        key={item.title}
                        className="p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 flex flex-col items-center text-center"
                    >
                        <div className="mb-4">{item.icon}</div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">{item.description}</p>
                        <Link to={item.link} className="inline-block mt-auto bg-primary-800 text-white font-bold px-6 py-3 rounded-md hover:bg-primary-900 transition-colors">
                            {item.buttonText}
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BuySellRentSection;