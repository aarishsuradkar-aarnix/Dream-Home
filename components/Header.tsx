
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './IconComponents';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = "text-gray-600 dark:text-gray-300 hover:text-primary-800 dark:hover:text-primary-300 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeNavLinkClasses = "text-primary-800 bg-primary-50 dark:text-white dark:bg-primary-900/50";

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/buy", text: "Buy" },
    { to: "/rent", text: "Rent" },
    { to: "/sell", text: "Sell" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <HomeIcon className="h-8 w-8 text-primary-800" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Dream Home</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <NavLink to="/login" className="bg-primary-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-900 transition-colors">
              Login / Register
            </NavLink>
          </div>
          <div className="-mr-2 flex md:hidden">
             <div className="mr-2">
                 <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-primary-50 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-primary-800 dark:text-gray-300 hover:text-white hover:bg-primary-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
              >
                {link.text}
              </NavLink>
            ))}
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left bg-primary-800 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-900 mt-2">
              Login / Register
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;