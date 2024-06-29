import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';

const ListingsContainer = ({ currentUser }) => {
  const [listings, setListings] = useState([]);
  const [showAll, setShowAll] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:3000/api/user/listings/${currentUser._id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await res.json();
        setListings(data);
      } catch (error) {
        setError(error.message || 'Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser._id]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  let displayedListings = showAll ? listings : listings.slice(0, 2);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col space-y-4 ">
        <label htmlFor="Listings">
            My Listings
        </label>
      {displayedListings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        displayedListings.map((listing) => (
          <ListingCard key={listing._id} imgUrl={listing.imageUrls[0]} listingName={listing.name} />
        ))
      )}

      <button onClick={toggleShowAll} className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
        {showAll ? 'Show Less' : 'Show All'}
      </button>
    </div>
  );
};

export default ListingsContainer;
