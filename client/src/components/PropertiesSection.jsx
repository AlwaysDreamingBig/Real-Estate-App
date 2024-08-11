import React from 'react';
import ListingCard from './ListingPreview';

const PropertiesSection = ({ listings }) => {
  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-4xl font-serif font-semibold text-black text-center mb-2">Featured Listings</h2>
      <p className="text-lg text-gray-600 text-center  mb-8">
            Let's have a look on some of our multiple Advidor's properties.
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((property, index) => (
          <div key={index}>
            <ListingCard listing={property}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesSection;
