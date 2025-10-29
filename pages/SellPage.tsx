
import React from 'react';
import ImageGenerator from '../components/ImageGenerator';

const SellPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://picsum.photos/seed/sell/1920/1080" alt="House keys on a table" className="w-full h-full object-cover object-center" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Sell Your Property with Confidence</h2>
          <p className="mt-4 text-xl text-gray-300">
            Leverage our expertise and network to sell your home faster and for the best possible price.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                  <h2 className="text-base text-primary-800 dark:text-primary-400 font-semibold tracking-wide uppercase">Our Advantages</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                      Why Sell with Dream Home?
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                      We provide a seamless and rewarding selling experience from start to finish.
                  </p>
              </div>

              <div className="mt-10">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                      <div className="relative">
                          <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Expert Agents</p>
                          </dt>
                          <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                              Our professional agents are local market experts who will guide you through pricing, staging, and negotiations.
                          </dd>
                      </div>
                      <div className="relative">
                          <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Strategic Marketing</p>
                          </dt>
                          <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                              We use a multi-channel marketing approach, including online listings, social media, and professional photography to attract qualified buyers.
                          </dd>
                      </div>
                      <div className="relative">
                          <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Seamless Process</p>
                          </dt>
                          <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                              From listing to closing, we handle the paperwork and complexities, ensuring a smooth and stress-free transaction for you.
                          </dd>
                      </div>
                      <div className="relative">
                          <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Maximum Value</p>
                          </dt>
                          <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                              Our goal is to secure the highest possible price for your property through skilled negotiation and market analysis.
                          </dd>
                      </div>
                  </dl>
              </div>
          </div>
      </div>
      
      <ImageGenerator />
    </div>
  );
};

export default SellPage;