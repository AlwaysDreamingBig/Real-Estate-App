import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListingCard from '../components/ListingPreview';

const SearchResultsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:3000/api/listing/searchListing${location.search}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Cannot load the listings');
        }

        const data = await res.json();
        setListings(data);
      } catch (error) {
        setError(error.message || 'Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  return (
    <div className="w-full mx-auto p-6">
      <div className=''>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
