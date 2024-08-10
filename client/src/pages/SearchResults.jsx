import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListingCard from '../components/ListingPreview';

const SearchResultsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1); // Manage current page
  const [totalPages, setTotalPages] = useState(1); // Manage total pages
  const limit = 12; // Set your default page size here

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      try {
        // Calculate the startIndex based on the current page
        const startIndex = (currentPage - 1) * limit;

        const res = await fetch(`http://localhost:3000/api/listing/searchListing${location.search}&limit=${limit}&startIndex=${startIndex}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Cannot load the listings');
        }

        const data = await res.json();
        setListings(data.listings);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage); // This might not be necessary if server returns the correct page
      } catch (error) {
        setError(error.message || 'Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search, currentPage]); // Added currentPage as a dependency

  const handlePagePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>

      <div className="pagination mt-6 flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={handlePagePrevious}
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={handlePageNext}
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResultsPage;
