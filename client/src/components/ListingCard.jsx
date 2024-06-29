import React from 'react';
import { img1 } from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

//const imgUrl = img1;
//const listingName = "Magnifique maison dans la prairie";

export default function ListingCard({imgUrl, listingName}) {
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

      <div className='flex space-x-4'>
        <FontAwesomeIcon 
          icon={faTrash} 
          className='text-red-600 cursor-pointer' 
          aria-label="Delete listing" 
        />

        <FontAwesomeIcon 
          icon={faEdit} 
          className='text-blue-600 cursor-pointer' 
          aria-label="Edit listing" 
        />

        <FontAwesomeIcon 
          icon={faEye} 
          className='text-green-600 cursor-pointer' 
          aria-label="See listing" 
        />
      </div>
    </div>
  );
}
