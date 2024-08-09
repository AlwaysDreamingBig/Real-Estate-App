import React, { useState } from 'react';
import { createQueryString } from './utility/createQuery'; 
import ListingCard from './ListingPreview';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchListings = () => {
  const [formData, setFormData] = useState({
    limit: 10,
    startIndex: 0,
    offer: '',
    parking: '',
    searchTerm: '',
    sort: 'createdAt',
    order: 'desc',
    minPrice: '',
    maxPrice: '',
    city: '',
    country: '',
    minBathrooms: '',
    maxBathrooms: '',
    minBedrooms: '',
    maxBedrooms: '',
    minHouseShareBedrooms: '',
    maxHouseShareBedrooms: '',
    type: '',
    unisexBathroom: '',
    sharedLivingRoom: '',
    sharedGarden: '',
    sharedToilet: '',
    sharedKitchen: '',
    sharedBalcony: '',
    gasHeating: '',
    sharedKitchenware: '',
    wifi: '',
    livingRoomFurniture: '',
    bed: '',
    tv: '',
    bedroomLock: '',
    washingMachine: '',
    dryer: '',
    closet: '',
    desk: '',
    airConditioning: '',
    dishwasher: '',
    accessFriendly: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryString = createQueryString(formData);
    setLoading(true);
    setError('');

    try {

      navigate(`/results?${queryString}`);

    } catch (error) {
      setError(error.message || 'Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
        <div className=''>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && (
                <p className='text-center my-7 text-2xl'>Something went wrong!</p>
            )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700">Search Term</label>
                <input
                    type="text"
                    name="searchTerm"
                    value={formData.searchTerm}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Min Price</label>
                <input
                    type="number"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Max Price</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Min Bathrooms</label>
                <input
                    type="number"
                    name="minBathrooms"
                    value={formData.minBathrooms}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Max Bathrooms</label>
                <input
                    type="number"
                    name="maxBathrooms"
                    value={formData.maxBathrooms}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Min Bedrooms</label>
                <input
                    type="number"
                    name="minBedrooms"
                    value={formData.minBedrooms}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Max Bedrooms</label>
                <input
                    type="number"
                    name="maxBedrooms"
                    value={formData.maxBedrooms}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Min House Share Bedrooms</label>
                <input
                    type="number"
                    name="minHouseShareBedrooms"
                    value={formData.minHouseShareBedrooms}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Max House Share Bedrooms</label>
                <input
                    type="number"
                    name="maxHouseShareBedrooms"
                    value={formData.maxHouseShareBedrooms}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                    <option value="rent">Rent</option>
                    <option value="colocation">Colocation</option>
                    <option value="sell">Sell</option>
                    </select>
                </div>

                {booleanFields.map(field => (
                <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                    <option value="">Any</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                    </select>
                </div>
                ))}

            </div>

            <div className="flex justify-end">
                <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Search
                </button>
            </div>
        </form>
    </div>
  );
};

const booleanFields = [
  'unisexBathroom', 'sharedLivingRoom', 'sharedGarden', 'sharedToilet',
  'sharedKitchen', 'sharedBalcony', 'gasHeating', 'sharedKitchenware',
  'wifi', 'livingRoomFurniture', 'bed', 'tv', 'bedroomLock',
  'washingMachine', 'dryer', 'closet', 'desk', 'airConditioning',
  'dishwasher', 'accessFriendly'
];

export default SearchListings;
