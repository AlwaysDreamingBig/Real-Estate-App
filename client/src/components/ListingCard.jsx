import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ListingCard = ({ imgUrl, listingName, listingID, onDelete }) => {
  const handleDelete = async () => {
    onDelete(listingID); // Call onDelete function with listingID
  };

  return (
    <div className='flex flex-row items-center border border-slate-200 p-2'>
      <div className='border border-slate-500 rounded-lg '>
        <img 
          src={imgUrl} 
          alt="Main image" 
          width={100}
          height={100}
          className='rounded-lg' 
        />
      </div>

      <div className='flex-grow text-center'>
        <label htmlFor="name" className='text-lg font-semibold'>
          {listingName}
        </label>
      </div>

      <div className='flex items-center space-x-4'>
        <FontAwesomeIcon 
          icon={faTrash} 
          className='text-red-600 cursor-pointer mr-3' 
          aria-label="Delete listing"
          onClick={handleDelete} // Call handleDelete when delete icon is clicked
        />

        <Link to={`/update-listing/${listingID}`}>
          <FontAwesomeIcon 
            icon={faEdit} 
            className='text-blue-600 cursor-pointer mr-2' 
            aria-label="Edit listing"
          />
        </Link> 

        <FontAwesomeIcon 
          icon={faEye} 
          className='text-green-600 cursor-pointer' 
          aria-label="See listing"
        />
      </div>
    </div>
  );
};

export default ListingCard;
