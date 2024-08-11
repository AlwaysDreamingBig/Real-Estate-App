import React from 'react';
import { bgHomeImg } from '../assets/images'; // Ensure this path is correct based on your project structure

const HeroSection = ({ user }) => {
  const currentUser = user?.currentUser;

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgHomeImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Tagline */}
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Find Your Dream Home
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg md:text-2xl max-w-2xl drop-shadow-md">
          Your journey to a new home begins here. Explore the best properties tailored just for you.
        </p>

        {/* Conditional Rendering of Call-to-Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Explore Properties Button */}
          <a
            href="#properties"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
          >
            Explore Properties
          </a>

          {/* Conditionally Render List Your Property or Get Started */}
          {currentUser ? (
            <a
              href="/profile"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              List Your Property
            </a>
          ) : (
            <a
              href="/sign-in"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              Get Started
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
