
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Connecting People with Homes
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
            Our mission is to make the process of buying, selling, and renting homes easier and more transparent for everyone involved.
          </p>
        </div>
        <div className="mt-20">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                        <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                            <img className="absolute inset-0 h-full w-full object-cover" src="https://picsum.photos/seed/team/600/800" alt="" />
                            <div className="absolute inset-0 bg-primary-800 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-800 via-primary-800 opacity-90"></div>
                            <div className="relative px-8">
                                <blockquote className="mt-8">
                                    <div className="relative text-lg font-medium text-white md:flex-grow">
                                        <p>
                                            "We believe that finding a home should be a joyful experience. Our team is dedicated to providing exceptional service and leveraging technology to simplify the journey."
                                        </p>
                                    </div>
                                    <footer className="mt-4">
                                        <p className="text-base font-semibold text-primary-200">Jane Doe, CEO at Dream Home</p>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                    <div className="pt-12 sm:pt-16 lg:pt-20">
                        <h3 className="text-3xl text-gray-900 dark:text-white font-extrabold tracking-tight sm:text-4xl">Our Commitment</h3>
                        <div className="mt-6 text-gray-500 dark:text-gray-400 space-y-6">
                            <p className="text-lg">
                                At Dream Home, we are committed to integrity, professionalism, and client satisfaction. We understand that a home is more than just a place to live; it's where memories are made.
                            </p>
                            <p className="text-base leading-7">
                                Our team of experienced real estate professionals is here to guide you every step of the way, providing expert advice and personalized service. Whether you're a first-time buyer or a seasoned investor, we're here to help you achieve your real estate goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;