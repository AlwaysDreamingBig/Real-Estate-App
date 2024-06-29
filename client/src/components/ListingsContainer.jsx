import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';

const ListingsContainer = ({ currentUser }) => {
  const [listings, setListings] = useState([]);
  const [showAll, setShowAll] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentUser._id]); // useEffect will re-run whenever currentUser._id changes

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3000/api/user/listings/${currentUser._id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Cannot load your listings, please re-signIn');
      }

      const data = await res.json();
      setListings(data);
    } catch (error) {
      setError(error.message || 'Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const onDelete = async (listingID) => {
    try {
      const res = await fetch(`http://localhost:3000/api/listing/delete/${listingID}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        // Remove the deleted listing from state
        setListings(listings.filter(listing => listing._id !== listingID));
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  let displayedListings = showAll ? listings : listings.slice(0, 2);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="Listings">My Listings</label>
      {displayedListings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        displayedListings.map((listing) => (
          <ListingCard
            key={listing._id}
            imgUrl={listing.imageUrls[0]}
            listingName={listing.name}
            listingID={listing._id}
            onDelete={onDelete} // Pass onDelete function to ListingCard
          />
        ))
      )}

      <button onClick={toggleShowAll} className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
        {showAll ? 'Show Less' : 'Show All'}
      </button>
    </div>
  );
};

export default ListingsContainer;
