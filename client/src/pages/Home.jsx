import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeroSection from '../components/HeroSection';
import PropertiesSection from '../components/PropertiesSection';
import HowItWorksSection from '../components/HowItWorksSection ';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(generateRandomStartIndex()); // Initialize with a random startIndex
  const limit = 12; // Set your default page size here

  const user = useSelector((state) => state.user); // Assuming you're using Redux to manage state

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      setStartIndex(generateRandomStartIndex());

      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/searchListing?limit=${limit}&startIndex=${startIndex}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!res.ok) {
          throw new Error('Cannot load the listings');
        }

        const data = await res.json();
        setListings(data.listings);
      } catch (error) {
        setError(error.message || 'Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [startIndex]); // Dependency array includes startIndex to refetch listings when it changes

  return (
    <div className='bg-white'>
      <section>
        <HeroSection user={user} />
      </section>

      <section id="properties" className="mt-20">
        <PropertiesSection listings={listings} loading={loading} error={error} />
      </section>

      <section className="mt-20">
        <HowItWorksSection />
      </section>
    </div>
  );
};

// Function to generate a random startIndex
const generateRandomStartIndex = () => {
  return Math.floor(Math.random() * 10 + 5); // Example: Random startIndex between 0 and 99
};

export default HomePage;
