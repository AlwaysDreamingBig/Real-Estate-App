import { faBath, faBed, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { truncateDescription } from './utility/utilityFcn';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  // Get the first image URL, or use a placeholder if not available
  const imageUrl = listing.imageUrls && listing.imageUrls.length > 0
    ? listing.imageUrls[0]
    : 'https://via.placeholder.com/400x300?text=No+Image+Available';



  return (
    <Link to={`/listing/${listing._id}`} >
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 h-[500px] w-[4000px] p-4">
        <img className="w-full h-60 object-cover border-4 border-white rounded-lg" src={imageUrl} alt={listing.name} />

        <div className="px-2 py-4">
          <p className="font-bold text-base mb-2 font-serif">{listing.name}</p>
          <div className='flex flex-col'>
            <p className='font-serif text-sm font-semibold'>Description:</p>
            <p className="text-gray-700 text-xs ml-4">{truncateDescription(listing.description, 50)}</p>
          </div>

          <div className='flex flex-col'>
            <p className='font-serif text-sm font-semibold'>Address:</p>
            <p className="text-gray-700 text-xs ml-4">{listing.address}</p>
          </div>

          <div className="mt-2 flex justify-between">
            <span className="block text-gray-600 text-sm">
              <strong>Price:</strong> ${listing.regularPrice}
            </span>
            {listing.offer && (
              <span className="block text-green-600 text-sm">
                <strong>Discount Price:</strong> ${listing.discountPrice}
              </span>
            )}
          </div>
        </div>

        <div className=" pt-2 grid grid-cols-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            <FontAwesomeIcon icon={faBath} className='mr-2 text-gray-500' />
            Bathrooms: {listing.bathrooms}
          </span>

          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            <FontAwesomeIcon icon={faBed} className='mr-2 text-gray-500' />
            Bedrooms: {listing.bedrooms}
          </span>

          {listing.parking && (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">                
              <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
              Parking: Yes
            </span>
          )}

          {listing.houseShare && (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">                
                  <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
                  House Share: Yes
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
