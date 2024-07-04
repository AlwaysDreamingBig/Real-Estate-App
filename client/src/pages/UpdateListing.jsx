import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDollarSign, faMapMarkerAlt, faBed, faBath, faCouch, faBuilding, faUser, faImage, faTags } from '@fortawesome/free-solid-svg-icons';
import UploadImages from '../components/UploadImages_Update';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export default function UpdateListing() {

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'rent',
    offer: false,
    imageUrls: [],
    userRef: currentUser._id,
    userName: currentUser.username,
    houseShare: false,
    houseShareBedrooms: 0,
  });

  useEffect(() => {
    fetchData();
  }, [params.listingID]); // useEffect will re-run whenever the listing ID changes

  const fetchData = async () => {

    try {
      const res = await fetch(`http://localhost:3000/api/listing/getListing/${params.listingID}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Cannot load the listing!');
      }

      const data = await res.json();
      console.log("data is :",data)
      setFormData(data);

    } catch (error) {
      console.log(error);
    } 
  };


  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : type === 'radio' ? value === 'true' : value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`http://localhost:3000/api/listing/update/${params.listingID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Listing updated successfully:', data);

        setSuccess(true);

        // Wait for 2 seconds before navigating
        setTimeout(() => {
          navigate(`/listing/${data._id}`); // Navigate to '/' after 2 seconds
        }, 1000);

      } else {
        const errorData = await res.json();
        setError(errorData.message); // Assuming server sends error message in JSON response
        console.error('Error creating listing:', errorData);
        // Optionally, show an error message
      }


    } catch (error) {
      console.error('Error creating listing:', error);
      setError('Something went wrong. Please try again.'); // Generic error message
      // Optionally, show an error message
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);
  console.log(currentUser.id);

  return (
    <main className='bg-white min-h-screen p-8'>
      {/** Title & buttons */}
      <div className='flex justify-between items-center bg-slate-50 px-4 border border-slate-300 rounded-lg m-4'>
        <h1 className='text-xl font-bold text-center my-4'>
          Update Listing
        </h1>

        <div className='sm:items-center sm:my-4 sm:justify-between flex'>
          <button className='bg-red-500 text-white p-3 sm:py-2 sm:px-6 rounded-lg hover:opacity-70 mr-4 self'>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`bg-green-500 text-white p-3 sm:py-2 sm:px-6 rounded-lg hover:opacity-70 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating Listing...' : 'Update Listing'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4 mx-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg mb-4 mx-4 flex items-center">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
          Listing updated successfully! Redirecting...
        </div>
      )}

      {loading && !success && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-lg mb-4 mx-4 flex items-center">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
          Creating listing...
        </div>
      )}

      {/** General Information */}
      <div className='mt-6 items-center flex flex-row justify-between'>
        <div className='rounded-lg flex-1 flex-col p-4'>
          <h2 className='font-semibold text-lg'>
            General Information
          </h2>

          <form className='flex flex-col gap-4 mt-4'>
            <div className='flex flex-col mb-3 bg-slate-50 p-2 justify-between py-4 rounded-lg'>
              <label htmlFor='name' className='mb-1'>
                <FontAwesomeIcon icon={faHome} className='mr-2 text-gray-500' />
                Name*
              </label>
              <input
                type="text"
                id='name'
                onChange={handleChange}
                value={formData.name}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
                placeholder='Enter property name'
              />

              <label htmlFor='description' className='mb-1'>
                Description*
              </label>
              <textarea
                id='description'
                onChange={handleChange}
                value={formData.description}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
                placeholder='Enter property description'
              >
              </textarea>

              <label htmlFor='address' className='mb-1'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2 text-gray-500' />
                Address*
              </label>
              <input
                type="text"
                id='address'
                onChange={handleChange}
                value={formData.address}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
                placeholder='Enter property address'
              />
            </div>

            <div className='flex flex-col mb-3 bg-slate-50 p-2 justify-between py-4 rounded-lg'>
              <label htmlFor='bathrooms' className='mb-1'>
                <FontAwesomeIcon icon={faBath} className='mr-2 text-gray-500' />
                Bathrooms*
              </label>
              <input
                type="number"
                id='bathrooms'
                onChange={handleChange}
                value={formData.bathrooms}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
                placeholder='Enter number of bathrooms'
              />

              <label htmlFor='bedrooms' className='mb-1'>
                <FontAwesomeIcon icon={faBed} className='mr-2 text-gray-500' />
                Bedrooms*
              </label>
              <input
                type="number"
                id='bedrooms'
                onChange={handleChange}
                value={formData.bedrooms}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
                placeholder='Enter number of bedrooms'
              />

              <label htmlFor='furnished' className='mb-1'>
                <FontAwesomeIcon icon={faCouch} className='mr-2 text-gray-500' />
                Furnished*
              </label>
              <div className='flex items-center mb-3'>
                <label className='mr-4'>
                  <input
                    type="radio"
                    id='furnished'
                    name='furnished'
                    value={true}
                    onChange={handleChange}
                    checked={formData.furnished === true}
                    className='mr-1'
                  />
                  <span className='ml-2'>Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    id='furnished'
                    name='furnished'
                    value={false}
                    onChange={handleChange}
                    checked={formData.furnished === false}
                    className='mr-1'
                  />
                  <span className='ml-2'>No</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/** Upload images */}
        <UploadImages initialImages={formData.imageUrls} onImagesUpload={handleImagesUpload} removeImageFromFormData={removeImage} />
      </div>

      {/** Type & User ref */}
      <div className='flex flex-col mb-3 bg-slate-50 border rounded-lg flex-1 p-4 ml-4'>
        <label htmlFor='type' className='mb-1'>
          <FontAwesomeIcon icon={faBuilding} className='mr-2 text-gray-500' />
          Type*
        </label>
        <select
          id='type'
          onChange={handleChange}
          value={formData.type}
          className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
        >
          <option value='rent'>Rent</option>
          <option value='sell'>Sell</option>
          <option value='colocation'>Colocation</option>
        </select>

        <label htmlFor='userName' className='mb-1'>
          <FontAwesomeIcon icon={faUser} className='mr-2 text-gray-500' />
          Username*
        </label>
        <input
          type="text"
          id='userName'
          onChange={handleChange}
          value={currentUser.username}
          disabled
          className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
          placeholder='Enter username'
        />

        <label htmlFor='houseShareBedrooms' className='mb-1'>
          House Share Bedrooms*
        </label>
        <input
          type="number"
          id='houseShareBedrooms'
          onChange={handleChange}
          value={formData.houseShareBedrooms}
          className='border border-gray-400 bg-gray-100 p-2 rounded-lg mb-3'
          placeholder='Enter number of house share bedrooms'
        />
      </div>

      {/** Category & Pricing */}
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
                onChange={handleChange}
                value={formData.regularPrice}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg flex-1'
              />
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faDollarSign} className='mr-2 text-gray-500' />
              <input
                type="number"
                placeholder='Discount Price*'
                id='discountPrice'
                onChange={handleChange}
                value={formData.discountPrice}
                className='border border-gray-400 bg-gray-100 p-2 rounded-lg flex-1'
              />
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
                onChange={handleChange}
                checked={formData.parking}
                className='mr-2'
              />
              <label htmlFor='parking' className='flex items-center'>
                <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
                Parking
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type="checkbox"
                id='offer'
                onChange={handleChange}
                checked={formData.offer}
                className='mr-2'
              />
              <label htmlFor='offer' className='flex items-center'>
                <FontAwesomeIcon icon={faTags} className='mr-2 text-gray-500' />
                Offer
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type="checkbox"
                id='houseShare'
                onChange={handleChange}
                checked={formData.houseShare}
                className='mr-2'
              />
              <label htmlFor='houseShare' className='flex items-center'>
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
