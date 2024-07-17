import React, { useState } from 'react'
import { 
    faBed, faCouch, faToilet, faTree, faRestroom, 
    faUtensils, faBacon, faFire, faBlender, faWifi, faTv, 
    faLock, faSoap, faTshirt, faLaptop, faSnowflake, faSink, 
    faWheelchair, faWind 
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Amenities({listing}) {

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
        dryer: { name: 'Dryer', icon: faWind },
        closet: { name: 'Closet', icon: faLaptop },
        desk: { name: 'Desk', icon: faLaptop },
        airConditioning: { name: 'Air Conditioning', icon: faSnowflake },
        dishwasher: { name: 'Dishwasher', icon: faSink },
        accessFriendly: { name: 'Access Friendly', icon: faWheelchair },
    };

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

  return (
    <section>
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
    </section>
  )
}
