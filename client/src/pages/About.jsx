import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faUserShield, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { bugs } from '../assets/images';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* About Us Section */}
      <section className="mb-12 text-center bg-white p-12 rounded-lg">
        <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          At RealEstateApp, we believe that finding the perfect home should be an exciting and enjoyable experience. 
          Established in [Year], our platform is designed to streamline the process of buying, selling, and renting properties. 
          Whether you’re a first-time homebuyer, an experienced investor, or looking for a rental, our comprehensive listings 
          and user-friendly tools make it easy to explore a wide range of properties. 
        </p>
        <p className="text-lg text-gray-700 mt-4">
          We understand that real estate transactions are significant life events. That’s why we are committed to providing 
          you with accurate, up-to-date information and unparalleled customer service. Our team of real estate experts, 
          developers, and support staff work tirelessly to ensure that you have the best possible experience every step of the way.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Our platform is built with the latest technology to offer features like virtual tours, instant notifications, 
          and detailed market analyses. We aim to be more than just a real estate app—we strive to be your trusted partner 
          in your real estate journey.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12 bg-white p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center">
          Our mission is to transform the way people engage with real estate. We aim to simplify the property search 
          process by providing a platform that is not only comprehensive but also accessible to everyone.
        </p>
        <p className="text-lg text-gray-700 text-center mt-4">
          We are committed to transparency and integrity, ensuring that all our listings are verified and reliable. 
          We believe in empowering our users with the information they need to make informed decisions, 
          whether they are looking to buy their first home, invest in property, or find the perfect rental.
        </p>
        <p className="text-lg text-gray-700 text-center mt-4">
          By leveraging cutting-edge technology and a deep understanding of the real estate market, 
          we aim to provide an unmatched user experience. Our goal is to make real estate accessible, 
          affordable, and enjoyable for everyone, no matter where you are in your property journey.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-sm p-6 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Verified Listings</h3>
            <p className="text-gray-600">
              We ensure that all property listings are verified and up-to-date, giving you peace of mind.
            </p>
          </div>

          <div className="max-w-sm p-6 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faUserShield} className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-4">User-Friendly Search</h3>
            <p className="text-gray-600">
              Our powerful search tools make it easy to find properties that match your criteria.
            </p>
          </div>

          <div className="max-w-sm p-6 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faHeadset} className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-4">24/7 Customer Support</h3>
            <p className="text-gray-600">
              Our support team is available around the clock to assist you with any questions or concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Repeat this block for each team member */}
          <div className="max-w-xs text-center">
            <img
              src={bugs} // Replace with actual image URLs
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Adriel NGUELI</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          {/* Add more team members here */}
        </div>
      </section>

      {/* Contact Us Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <p className="text-lg text-gray-700 text-center">
          Have any questions or feedback? Feel free to reach out to us at <a href="mailto:support@realestateapp.com" className="text-blue-600">support@realestateapp.com</a>.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
