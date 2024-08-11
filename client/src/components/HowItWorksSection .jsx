import React from 'react';
import { steps, uniquePoints } from '../assets/constants';


const HowItWorksSection = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            Discover how easy it is to buy, sell, or rent properties with our app.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/4 text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-extrabold mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600">
            Learn about the unique features that make our app the best choice for finding your dream property.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {uniquePoints.map((point, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/4 text-center">
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
