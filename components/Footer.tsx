
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './IconComponents';

const Footer: React.FC = () => {
    const socialLinks = [
        { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
        { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
        { name: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' },
    ];
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <NavLink to="/" className="flex items-center gap-2 mb-4">
                            <HomeIcon className="h-8 w-8 text-primary-800" />
                            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Dream Home</span>
                        </NavLink>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Find your dream home with us. We make the process simple and enjoyable.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-4">
                            <li><NavLink to="/buy" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">Buy</NavLink></li>
                            <li><NavLink to="/rent" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">Rent</NavLink></li>
                            <li><NavLink to="/sell" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">Sell</NavLink></li>
                            <li><NavLink to="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">About Us</NavLink></li>
                            <li><NavLink to="/contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">Contact</NavLink></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">Privacy Policy</a></li>
                            <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-800 dark:hover:text-primary-300">Terms of Service</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Connect</h3>
                        <div className="flex mt-4 space-x-6">
                            {socialLinks.map(link => (
                                <a key={link.name} href="#" className="text-gray-400 dark:text-gray-500 hover:text-primary-800 dark:hover:text-primary-300">
                                    <span className="sr-only">{link.name}</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d={link.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-base text-gray-400 dark:text-gray-500 text-center">&copy; {new Date().getFullYear()} Dream Home. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;