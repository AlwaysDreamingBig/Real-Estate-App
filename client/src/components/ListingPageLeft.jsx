import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTag, faDollarSign, faMapMarkerAlt, faMap, faAngleDown, 
  faAngleUp, faBed, faCouch, faToilet, faTree, faRestroom, 
  faUtensils, faBacon, faFire, faBlender, faWifi, faTv, 
  faLock, faSoap, faTshirt, faLaptop, faSnowflake, faSink, 
  faWheelchair, faWind 
} from '@fortawesome/free-solid-svg-icons';

const LeftColumn = ({ listing }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const typeColors = {
    rent: 'bg-green-500',
    sell: 'bg-red-500',
    collocation: 'bg-blue-500',
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const amenities = {
    unisexBathroom: { name: 'Unisex Bathroom', icon: faRestroom },
    sharedLivingRoom: { name: 'Shared Living Room', icon: faCouch },
    sharedGarden: { name: 'Shared Garden', icon: faTree },
    sharedToilet: { name: 'Shared Toilet', icon: faToilet },
    sharedKitchen: { name: 'Shared Kitchen', icon: faUtensils },
    sharedBalcony: { name: 'Shared Balcony', icon: faBacon },
    gasHeating: { name: 'Gas Heating', icon: faFire },
    sharedKitchenware: { name: 'Shared Kitchenware', icon: faBlender },
    wifi: { name: 'WiFi', icon: faWifi },
    livingRoomFurniture: { name: 'Living Room Furniture', icon: faCouch },
    bed: { name: 'Bed', icon: faBed },
    tv: { name: 'TV', icon: faTv },
    bedroomLock: { name: 'Bedroom Lock', icon: faLock },
    washingMachine: { name: 'Washing Machine', icon: faSoap },
    dryer: { name: 'Dryer', icon: faTshirt },
    closet: { name: 'Closet', icon: faLaptop },
    desk: { name: 'Desk', icon: faLaptop },
    airConditioning: { name: 'Air Conditioning', icon: faSnowflake },
    dishwasher: { name: 'Dishwasher', icon: faSink },
    accessFriendly: { name: 'Access Friendly', icon: faWheelchair },
  };

  return (
    <div className="w-full lg:w-2/3 bg-white p-4 space-y-4">
      {/* Section 1: Image Slider */}
      <div className="bg-white p-2 shadow-md">
        <ImageSlider slides={listing.imageUrls} autoSlide={false} showThumbnails={true} />
      </div>

      {/* Section 2: Listing Name and Regular Price */}
      <div className="bg-white p-2 flex items-center justify-between shadow-md">
        <h1 className="font-bold text-3xl font-serif">
          {listing.name}
        </h1>
        <div className="flex items-center text-xl">
          <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
          <span className="font-bold">
            {listing.regularPrice}
          </span>
        </div>
      </div>

      {/* Section 3: Address, Type, and Discount Price */}
      <div className="bg-white p-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg mr-2" />
            <h2 className="text-gray-300 text-normal">
              {listing.address}
            </h2>
          </div>
          <div className="flex items-center text-blue-400">
            <FontAwesomeIcon icon={faMap} className="mr-1" />
            <a href="#map" className="ml-2">See On Map</a>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className={`px-6 py-1 rounded text-white ${typeColors[listing.type]} text-sm font-semibold mr-2 flex items-center justify-center`}>
            {listing.type === 'rent' ? (
              <>
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                For Rent
              </>
            ) : listing.type === 'sell' ? (
              <>
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                For Sell
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                Collocation Property
              </>
            )}
          </span>
          {listing.discountPrice && (
            <span className="px-6 py-1 rounded bg-yellow-500 text-white text-sm font-semibold flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              {`Discount Price: ${listing.discountPrice}`}
            </span>
          )}
        </div>
      </div>

      {/* Section 4: Listing Description */}
      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Listing Description</h2>
        <p className={`text-gray-800 text-lg text-justify ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {listing.description}
        </p>
        {listing.description.length > 150 && (
          <button
            className="text-blue-500 text-sm mt-2 hover:underline focus:outline-none"
            onClick={toggleDescription}
          >
            {showFullDescription ? (
              <>
                Show Less <FontAwesomeIcon icon={faAngleUp} className="ml-1" />
              </>
            ) : (
              <>
                Show More <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Section 5: Amenities */}
      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Amenities</h2>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.keys(amenities).slice(0, 10).map((key) => (
            <div key={key} className="flex items-center text-gray-800 text-lg">
              <FontAwesomeIcon icon={amenities[key].icon} className="mr-2" />
              <span className={`${listing[key] ? '' : 'line-through'}`}>
                {amenities[key].name}
              </span>
            </div>
          ))}
        </div>
        <button
          className="text-blue-500 text-sm mt-2 hover:underline focus:outline-none"
          onClick={toggleModal}
        >
          Show All Amenities
        </button>
      </div>

      {/* Modal for showing all amenities */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-gray-800 text-2xl mb-4">All Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(amenities).map((key) => (
                <div key={key} className="flex items-center text-gray-800 text-lg">
                  <FontAwesomeIcon icon={amenities[key].icon} className="mr-2" />
                  <span className={`${listing[key] ? '' : 'line-through'}`}>
                    {amenities[key].name}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="text-blue-500 text-sm mt-4 hover:underline focus:outline-none"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Placeholder sections */}
      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Section 6</h2>
        <p className="text-gray-800 text-lg">
          This is the sixth section of the left column. You can put any content here.
        </p>
      </div>
      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Section 7</h2>
        <p className="text-gray-800 text-lg" id="map">
          This is the seventh section of the left column, where the map will appear.
        </p>
      </div>
      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Section 8</h2>
        <p className="text-gray-800 text-lg">
          This is the eighth section of the left column. You can put any content here.
        </p>
      </div>
    </div>
  );
};

export default LeftColumn;
