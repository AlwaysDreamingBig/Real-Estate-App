import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDollarSign, faMapMarkerAlt, faBed, faBath, faCouch, faBuilding, faUser, faImage, faTags } from '@fortawesome/free-solid-svg-icons';
import UploadImages from '../components/UploadImages';

export default function CreateListing() {

  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  // Function to handle updating formData with uploaded image URLs
  const handleImagesUpload = (urls) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: [...prevFormData.imageUrls, ...urls],
    }));
  };

  // Function to handle removing an image URL from formData
  const removeImage = (url) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((imageUrl) => imageUrl !== url),
    }));
  };

  console.log(formData);


  return (
    <main className='bg-white min-h-screen p-8'>

                  {/** Title & buttons */}

      <div className='flex justify-between items-center bg-slate-50 px-4 border border-slate-300 rounded-lg m-4'>
        <h1 className='text-xl font-bold text-center my-4'>
          Create New Listing
        </h1>

        <div className='sm:items-center sm:my-4 sm:justify-between flex'>
          <button className='bg-red-500 text-white p-3 sm:py-2 sm:px-6 rounded-lg hover:opacity-70 mr-4 self'>
            Cancel
          </button>

          <button className='bg-green-500 text-white p-3 sm:py-2 sm:px-6 rounded-lg hover:opacity-70'>
            Add Listing
          </button>
        </div>
      </div>

                  {/** General Information */}

      <div className='mt-6 items-center flex flex-row justify-between'>

        <div className='rounded-lg flex-1 flex-col p-4'>
          <h2 className='font-semibold text-lg'>
            General Information
          </h2>

          <form className='flex flex-col gap-4 mt-4'>
            <div className='flex flex-col mb-3 bg-slate-50 p-2 justify-between py-4 rounded-lg'>
              <label 
                htmlFor='name' 
                className='mb-1'>
                    <FontAwesomeIcon icon={faHome} className='mr-2 text-gray-500' />
                    Name*
              </label>

              <input 
                type="text" 
                id='name' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
                placeholder='Enter property name' />

              <label 
                htmlFor='description' 
                className='mb-1'>
                    Description*
              </label>

              <textarea 
                id='description' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
                placeholder='Enter property description'>
              </textarea>

              <label 
                htmlFor='address' 
                className='mb-1'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2 text-gray-500' />
                    Address*
              </label>

              <input 
                type="text" 
                id='address' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
                placeholder='Enter property address' />
            </div>

            <div className='flex flex-col mb-3 bg-slate-50 p-2 justify-between py-4 rounded-lg'>
              <label 
                htmlFor='bathrooms' 
                className='mb-1'>
                    <FontAwesomeIcon icon={faBath} className='mr-2 text-gray-500' />
                    Bathrooms*
              </label>

              <input 
                type="number" 
                id='bathrooms' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
                placeholder='Enter number of bathrooms' />

              <label 
                htmlFor='bedrooms' 
                className='mb-1'>
                    <FontAwesomeIcon icon={faBed} className='mr-2 text-gray-500' />
                    Bedrooms*
              </label>

              <input 
                type="number" 
                id='bedrooms' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
                placeholder='Enter number of bedrooms' />

              <label 
                htmlFor='furnished' 
                className='mb-1'>
                    <FontAwesomeIcon icon={faCouch} className='mr-2 text-gray-500' />
                    Furnished*
              </label>

              <div className='flex items-center mb-3'>
                <label className='mr-4'>
                  <input 
                    type="radio" 
                    id='furnished' 
                    className='mr-1' />

                  <span className='ml-2'>Yes</span>
                </label>

                <label>
                  <input 
                    type="radio" 
                    id='furnished' 
                    className='mr-1' />

                  <span className='ml-2'>No</span>
                </label>
              </div>
            </div>
          </form>
        </div>

                          {/** Upload images */}

        <UploadImages onImagesUpload={handleImagesUpload} removeImageFromFormData={removeImage} />
      </div>


                         {/** Type & User ref*/}

      <div className='flex flex-col mb-3 bg-slate-50 border rounded-lg flex-1 p-4 ml-4'>
        <label 
          htmlFor='type' 
          className='mb-1'>
              <FontAwesomeIcon icon={faBuilding} className='mr-2 text-gray-500' />
              Type*
        </label>

        <select 
          id='type' 
          className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'>
              <option value='rent'>Rent</option>
              <option value='sell'>Sell</option>
              <option value='colocation'>Colocation</option>
        </select>

        <label 
          htmlFor='userRef' 
          className='mb-1'>
              <FontAwesomeIcon icon={faUser} className='mr-2 text-gray-500' />
              User Reference*
        </label>

        <input   
          type="text" 
          id='userRef' 
          className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
          placeholder='Enter user reference' />

        <label 
          htmlFor='houseShareBedrooms' 
          className='mb-1'>
              House Share Bedrooms*
        </label>

        <input 
          type="number" 
          id='houseShareBedrooms' 
          className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3' 
          placeholder='Enter number of house share bedrooms' />
      </div>


                  {/**  Category & Pricing */}

      <div className='mt-6 items-center flex flex-row justify-between bg-slate-50 border rounded-lg flex-1 p-4 ml-4'>
        <div className='bg-slate-50 border border-slate-400 rounded-lg flex-1 flex-col p-4'>
          <h2 className='font-semibold text-lg'>
            Pricing Information
          </h2>

          <form className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faDollarSign} className='mr-2 text-gray-500' />

              <input 
                type="number" 
                placeholder='Regular Price*' 
                id='regularPrice' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg flex-1' />
            </div>

            <div className='flex items-center'>
              <FontAwesomeIcon icon={faDollarSign} className='mr-2 text-gray-500' />

              <input 
                type="number" 
                placeholder='Discount Price*' 
                id='discountPrice' 
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg flex-1' />
            </div>
          </form>
        </div>

        <div className='bg-slate-50 border border-slate-400 rounded-lg flex-1 p-4 ml-4'>
          <h2 className='font-semibold text-lg'>
            Category
          </h2>

          <form className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center'>
              <input 
                type="checkbox" 
                id='parking' 
                className='mr-2' />

              <label 
                htmlFor='parking' 
                className='flex items-center'>
                    <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
                    Parking
              </label>
            </div>

            <div className='flex items-center'>
              <input 
                type="checkbox" 
                id='offer' 
                className='mr-2' />

              <label 
                htmlFor='offer' 
                className='flex items-center'>
                    <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
                    Offer
              </label>
            </div>

            <div className='flex items-center'>
              <input 
                type="checkbox" 
                id='houseShare' 
                className='mr-2' />

              <label 
                htmlFor='houseShare' 
                className='flex items-center'>
                    <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
                    House Share
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
