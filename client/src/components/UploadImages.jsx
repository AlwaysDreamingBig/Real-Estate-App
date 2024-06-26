import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export default function UploadImages({className}) {
  return (
    <div className={`bg-slate-50 border rounded-lg flex-1 p-4 ml-4 ${className}`}>
      <h2 className='font-semibold text-lg mb-3'>
        Upload Images
      </h2>

      <div className='flex flex-col mb-3'>
        {/* Placeholder for displaying the selected image */}
        <div className='flex justify-center items-center mb-7 bg-gray-200 p-2 rounded-lg'>
          <span className='text-gray-600'>Selected Image Preview</span>
        </div>

        {/* Placeholder for displaying all the uploaded images */}
        <div className='flex flex-wrap justify-center items-center mb-7 bg-gray-200 p-2 rounded-lg'>
          <span className='text-gray-600'>All Uploaded Images</span>
        </div>

        {/* Button to select images */}
        <p className='font-semibold mb-4 self-center'> 
                PS:
                <span className='font-normal text-gray-300 italic ml-2'> The first image will be the cover (Max 6).</span>
        </p>

        <div className='flex items-center self-center'>
          <input
            type="file"
            id='images'
            className='hidden self-center'
            multiple />

          <label
            htmlFor='images'
            className='cursor-pointer bg-slate-700 text-white p-2 rounded-lg self-center hover:opacity-90'>
            <FontAwesomeIcon icon={faImage} className='mr-2' />
            Upload Images
          </label>
        </div>
      </div>
    </div>
  );
}
