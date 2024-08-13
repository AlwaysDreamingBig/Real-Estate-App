import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faMapMarkerAlt, faBed, faBath, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ListingCard = ({ imgUrl, listingName, listingID, onDelete, listingAddress, listingPrice, listingBeds, listingBaths }) => {
  const handleDelete = async () => {
    onDelete(listingID); // Call onDelete function with listingID
  };

  return (
    <div className="flex h-44 border rounded-lg overflow-hidden relative">
      {/* First Level Div 1 */}
      <div className="w-2/5 bg-blue-200 p-4 flex items-center justify-center">
        <img 
          src={imgUrl} 
          alt="Main image" 
          className="rounded-lg h-full object-cover"
        />
      </div>

      {/* First Level Div 2 */}
      <div className="flex-1 flex flex-col relative">
        {/* Second Level Div 1 */}
        <div className="bg-green-200 p-4 flex items-center justify-between h-1/3 relative">
          <div className="flex items-center">
            <label htmlFor="name" className="font-semibold text-base">
              {listingName}
            </label>
          </div>

          <div className="absolute top-0 right-3 flex items-center">
            <FontAwesomeIcon 
              icon={faTrash} 
              className="text-red-600 cursor-pointer text-xs mr-2" 
              aria-label="Delete listing"
              onClick={handleDelete} // Call handleDelete when delete icon is clicked
            />
            
            <Link to={`/update-listing/${listingID}`}>
              <FontAwesomeIcon 
                icon={faEdit} 
                className="text-blue-600 cursor-pointer text-xs mr-2 mb-1" 
                aria-label="Edit listing"
              />
            </Link>
            
            <Link to={`/listing/${listingID}`}>
              <FontAwesomeIcon 
                icon={faEye} 
                className="text-green-600 cursor-pointer text-xs" 
                aria-label="See listing"
              />
            </Link>
          </div>
        </div>

        {/* Second Level Div 2 */}
        <div className="bg-yellow-200 p-4 flex flex-col justify-between h-2/3">
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faMapMarkerAlt} 
              className="text-gray-600 text-xs mr-2" 
              aria-label="Address"
            />
            <p className="font-normal text-base"> {listingAddress} </p>
          </div>
          
          <div className="flex justify-between font-normal text-base">
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={faBed} 
                className="text-gray-600 text-xs mr-2" 
                aria-label="Beds"
              />
              <span> {listingBeds} Beds</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={faBath} 
                className="text-gray-600 text-xs mr-2" 
                aria-label="Baths"
              />
              <span> {listingBaths} Baths</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <p className="font-semibold text-base text-blue-600"> ${listingPrice} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
